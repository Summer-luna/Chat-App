import { useUserContext } from "../context/userContext";
import { Outlet } from "react-router-dom";
import { Login } from "./login/login";

export const ProtectedRoute = () => {
  const { user } = useUserContext();

  return <>{user ? <Outlet /> : <Login />}</>;
};
