import axios from "axios";

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

export async function getTemplates() {
  const res = await baseUrl.get("/snippest", {
      headers:{
        "Content-Type": "application/json"
      },
    });
  return res.data;
  }
