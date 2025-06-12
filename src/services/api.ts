import axios from "axios";
import Constants from "expo-constants";

const api = axios.create({
  baseURL: Constants.expoConfig?.extra?.API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor para logs de requisição (útil para debug)
api.interceptors.request.use(
  (config) => {
    console.log("🚀 Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Interceptor para logs de resposta (útil para debug)
api.interceptors.response.use(
  (response) => {
    console.log("✅ Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error(
      "❌ Response Error:",
      error.response?.status,
      error.config?.url
    );
    return Promise.reject(error);
  }
);

export default api;
