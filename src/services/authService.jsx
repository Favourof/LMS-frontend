import axios from "axios";

const API_URL = "https://lms-backend-xoc5.onrender.com/api/auth/"; // Adjust based on your backend port

// 🟢 Signup Use
export const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// 🟢 Login User
export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);

  return response.data;
};

// 🟢 Logout User (Clear Token)
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user");
};

// 🟢 Get Current User (from token)
export const getCurrentUser = () => {
  return localStorage.getItem("token");
};

export const checkUserRole = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return "/login"; // If no token, redirect to login
    }

    const response = await axios.get(`${API_URL}/check-user-role`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.redirectTo; // Route based on role
  } catch (error) {
    console.error("Error checking user role:", error.response?.data?.message);
    return "/login"; // Redirect to login if unauthorized
  }
};
