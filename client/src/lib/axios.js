import axios from "axios";

//http://localhost:8080
// https://chat-app-full.onrender.com

export const axiosInstance = axios.create({
  baseURL: "https://chat-app-full.onrender.com",
  withCredentials: true,
});
