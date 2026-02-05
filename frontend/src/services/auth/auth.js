import axios from "axios";


const baseUrl = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:8081/api/v1/auth",
  headers:{
    "Content-Type": "application/json"
  }
});




// Signup API Call
export async function signUp(data) {
  const res = await baseUrl.post("/register", data);
  return res.data;
}

// Login API Call
export async function login(data) {
  const res = await baseUrl.post("/login", data,{
    withCredentials:true
  });
  return res.data;
}


// Logout API Call
export async function logout() {
  const res = await baseUrl.post("/logout",{},{
    withCredentials:true
  });
  return res.data;
}


