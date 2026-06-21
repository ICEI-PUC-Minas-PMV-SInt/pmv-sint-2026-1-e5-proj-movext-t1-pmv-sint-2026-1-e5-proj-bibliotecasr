import axios from "axios";
import * as SecureStore from "expo-secure-store";

const ip = "192.168.2.100";

const api = axios.create({
  baseURL: `http://${ip}:5187/api`,
  timeout: 5000,
});

api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
