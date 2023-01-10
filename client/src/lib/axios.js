import axios from "axios";

//http://localhost:8080
// https://chat-app-full.onrender.com

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});
