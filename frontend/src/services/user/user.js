import axios from "axios";
import useAuth from "../auth/store";

const baseUrl = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:8081/api/v1/user",
  withCredentials: true
});

export async function addTemplate(data) {
  const res = await baseUrl.post("/code", data, {
      headers:{
        "Content-Type": "application/json"
      },
      
  });
  return res.data;
}

baseUrl.interceptors.request.use((config)=>{

  const accessToken=useAuth.getState().accessToken

  if(accessToken){
   config.headers.Authorization=`Bearer ${accessToken}`;
  }

  return config;
})

export async function getTemplates() {
  const res = await baseUrl.get("/snippest", {
      headers:{
        "Content-Type": "application/json"
      },
    });
  return res.data;
  }

  export async function getCurrentUser(email){
    const res=await baseUrl.get(`/email/${email}`);
    return res.data;
  }
