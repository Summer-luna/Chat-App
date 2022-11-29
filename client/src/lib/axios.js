import axios from "axios";
//https://chat-app-api-vqgz.onrender.com
//http://localhost:8080
// https://chat-app-full.onrender.com
export const axiosInstance = axios.create({
  baseURL: "https://chat-app-full.onrender.com",
  timeout: 1000,
  withCredentials: true,
});
