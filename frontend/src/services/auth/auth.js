import axios from "axios";

const baseUrl = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:8081/api/v1/auth",
  headers:{
    "Content-Type": "application/json"
  }
});

export function getUserId() {
  return baseUrl.get("/users/1");
}

// Signup API Call
export async function signUp(data) {
  console.log(data);
  const res = await baseUrl.post("/register", data);
  return res.data;
}
