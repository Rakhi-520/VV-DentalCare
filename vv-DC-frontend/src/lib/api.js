import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Optional: interceptors for auth / errors
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // centralize API error handling
    console.error("API error:", err?.response?.data || err.message);
    return Promise.reject(err);
  }
);
