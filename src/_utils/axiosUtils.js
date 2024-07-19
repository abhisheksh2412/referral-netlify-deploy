import { config } from "@/config/config";
import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((axiosConfig) => {
  axiosConfig.baseURL = config.BASE_URL;

  return new Promise((resolve) => {
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem(config.TOKEN_KEY)
        : "";
    axiosConfig.headers.Authorization = `Bearer ${token}`;
    resolve(axiosConfig);
  });
});

export default axiosInstance;
