import axios from "axios";
import useAuth from "../auth/store";

const baseUrl = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:8081/api/v1",
  withCredentials: true,
});

//Interceptors For Request
baseUrl.interceptors.request.use((config) => {
  const accessToken = useAuth.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

let isRefreshing=false;
let pending=[];

function queueRequest(cb){
 pending.push(cb);
}

function resloveQueue(newToken){
 pending.forEach(cb=>cb(newToken));
 pending=[];
}

//Interceptors Response To Check Token Is Expired Or Not
baseUrl.interceptors.response.use(
  (response) => response,
  async (error) => {
  
    const isExpired=error.response.status === 401;
    const original=error.config;
    if(!isExpired || original._retry){
      return Promise.reject(error);
    }

    original._retry=true;

    if(isRefreshing){
      return new Promise((resolve,reject)=>[
        queueRequest((newToken)=>{
          if(!newToken) return reject();

          original.headers.Authorization=`Bearer ${newToken}`;
          resolve(baseUrl(original))
        })
      ])
    }

    isRefreshing=true;

    try {
      //useAuth.getState().changeLocalLoginData(newToken,loginUserData.user,true,false);
      const loginUserData= await refreshToken();
      const newToken=loginUserData.accessToken;

      if(!newToken) throw new Error("No Access Token Received");
      useAuth.getState().changeLocalLoginData(newToken,loginUserData.user,true);

      resloveQueue(newToken);

      original.headers.Authorization=`Bearer ${newToken}`;

      return  baseUrl(original);

    } catch (error) {
      resloveQueue(null);
      useAuth.getState().logout();

      return Promise.reject(error);

    }finally{
        isRefreshing=false;
    }


  },
);

export async function addTemplate(data) {
  const res = await baseUrl.post("/user/code", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
}

export async function getTemplates() {
  const res = await baseUrl.get("/user/snippest", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
}

export async function getCurrentUser(email) {
  const res = await baseUrl.get(`/user/email/${email}`);
  return res.data;
}

//Refresh Token
export async function refreshToken(){
 const response=await baseUrl.post("/auth/refresh");
 return response.data;
}
