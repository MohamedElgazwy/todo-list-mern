"use client";

import { apiRequest } from "@/services/api";
import { createContext, useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load user from token
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setLoading(false);
      return;
    }

    setToken(storedToken);

    apiRequest("/api/auth/me", "GET", null, storedToken)
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // Login
  const login = async (email, password) => {
    const data = await apiRequest(
      "/api/auth/login",
      "POST",
      { email, password }
    );

    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("token", data.token);
  };

  // Register
  const register = async (name, email, password) => {
    const data = await apiRequest(
      "/api/auth/register",
      "POST",
      { name, email, password }
    );

    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("token", data.token);
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
