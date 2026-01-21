import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";

export const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login");
  }
  return <Outlet />;
};
