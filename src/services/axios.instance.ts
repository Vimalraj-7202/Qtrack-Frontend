import axios from "axios";

const baseURL = import.meta.env.VITE_REACT_CLIENT_URL;
const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const msg = error.response?.data?.error;
    if (status === 401 && msg === "Invalid token") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

// ====== Helper functions ======
export const apiPost = (url: string, data?: any, config?: any) =>
  api.post(url, data, config);

export const apiGet = (url: string, config?: any) =>
  api.get(url, config);

export const apiPut = (url: string, data?: any, config?: any) =>
  api.put(url, data, config);

export const apiDelete = (url: string, config?: any) =>
  api.delete(url, config);

export default api;
