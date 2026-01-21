import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";

export const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
};
