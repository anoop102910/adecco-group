import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token") || null;
    if (token) {
      setIsAuthenticated(true);
      navigate("/");
    }
  }, []);

  const logout = () => {
    setIsAuthenticated(null);
    localStorage.removeItem("token");
  };

  const contextValue = {
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
