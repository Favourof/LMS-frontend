import axios from "axios";

const API_URL = "http://localhost:4003/api"; // Adjust if needed

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// ✅ Automatically add Authorization Token for Protected Routes
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
