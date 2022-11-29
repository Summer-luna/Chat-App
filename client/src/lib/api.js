import { axiosInstance } from "./axios";

const getAllMessages = async () => {
  return await axiosInstance.get("/getAllMessages");
};

const login = async (data) => {
  return await axiosInstance.post("/login", {
    data: data,
  });
};

const signup = async (data) => {
  return await axiosInstance.post("/signup", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getCurrentUserMessages = async () => {
  return await axiosInstance.get("/getCurrentUserMessages");
};

const updateUser = async (data) => {
  return await axiosInstance.post("/updateUser", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const checkCredential = async () => {
  return await axiosInstance.get("/checkCredential");
};

const deleteUser = async () => {
  return await axiosInstance.get("/deleteUser");
};

const logout = async () => {
  return await axiosInstance.get("/logout");
};

export {
  getAllMessages,
  login,
  signup,
  getCurrentUserMessages,
  updateUser,
  checkCredential,
  deleteUser,
  logout,
};
