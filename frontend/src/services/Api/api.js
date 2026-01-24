import axios from "axios";

const baseUrl = axios.create({
  baseURL: "http://localhost:8081",
});

export function getUserId() {
  return baseUrl.get("/users/1");
}

// Signup API Call
export async function signUp(data) {
  console.log(data);
  
  const res = await baseUrl.post("/api/v1/auth/register", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
}
