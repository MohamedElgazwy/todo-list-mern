"use client";
import { apiRequest } from "@/services/api";
import { createContext, useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";


const AuthContext = createContext();
//
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if(storedToken) {
      setToken(storedToken);
      apiRequest("/api/auth/me", "GET", null, storedToken).then(setUser).catch(() => logout());
    }
  }, []);

  const login = async (email, password) => {
    const data = await apiRequest('/api/auth/login', 'POST', { email, password,});
    setUser(data);
    setToken(data.token);
    localStorage.setItem('token', data.token);
  };

  const register = async (name, email, password) => {
    const data = await apiRequest('/api/auth/register', 'POST', { name, email, password,});
    setUser(data);
    setToken(data.token);
    localStorage.setItem('token', data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    router.push("/login");
  };

  return(
    <AuthContext.Provider value={{ user, login, register, logout, token}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);