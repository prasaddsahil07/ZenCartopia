import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  let refreshPromise = null; // Prevent multiple simultaneous refresh attempts

  // Check authentication on page load
  useEffect(() => {
    checkAuth();
  }, []);

  // Axios interceptor for token refresh
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // If a refresh is already in progress, wait for it to complete
          if (refreshPromise) {
            await refreshPromise;
            return axios(originalRequest);
          }

          // Start a new refresh process
          refreshPromise = refreshToken();
          await refreshPromise;
          refreshPromise = null;

          return axios(originalRequest);
        } catch (refreshError) {
          logout();
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  // 🔹 Check user authentication
  const checkAuth = async () => {
    setCheckingAuth(true);
    try {
      const response = await axios.get("/auth/profile"); // Fetch user details
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setCheckingAuth(false);
    }
  };

  // 🔹 Refresh Token Function
  const refreshToken = async () => {
    if (checkingAuth) return;
    setCheckingAuth(true);
    try {
      const response = await axios.post("/auth/refresh-token");
      setCheckingAuth(false);
      return response.data;
    } catch (error) {
      setUser(null);
      setCheckingAuth(false);
      throw error;
    }
  };

  // 🔹 Signup
  const signup = async ({ customer_unique_id, customer_password, customer_name , customer_id, customer_zip_code_prefix, customer_city, customer_state, customer_profile_pic, customer_role }) => {
    try {
      const response = await axios.post("/auth/register", { customer_unique_id, customer_password, customer_name , customer_id, customer_zip_code_prefix, customer_city, customer_state, customer_profile_pic, customer_role });
      setUser(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  // 🔹 Login
  const login = async (customer_unique_id, customer_password) => {
    try {
      const response = await axios.post("/auth/login", { customer_unique_id, customer_password });
      setUser(response.data);
      return "Login successful!";
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  // 🔹 Logout
  const logout = async () => {
    try {
      await axios.post("/auth/logout");
      setUser(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred during logout");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout , checkingAuth, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth };
