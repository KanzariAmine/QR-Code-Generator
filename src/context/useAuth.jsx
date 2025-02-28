import axios from "axios";
import React, { createContext, useContext, useState } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const authToken = localStorage.getItem("token");
  const [token, setToken] = useState(authToken);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (formData) => {
    try {
      // Send credentials to the server to get a token
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_AUTH_URL}auth/login`,
        formData,
        {
          header: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Login failed");
      }

      setToken(response.data.access_token);
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("isAuthenticated", true);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  // Logout Function
  const logout = () => {
    console.log("logout");
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
