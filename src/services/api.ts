import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { firebaseAuth } from "../config/firebase";

const rawUrl = import.meta.env.VITE_API_URL.replace(/\/$/, "");
// sem /api
const BASE_URL_WITH_PREFIX = rawUrl;

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL_WITH_PREFIX,
  timeout: 10000,
});

api.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    const user = firebaseAuth.currentUser;

    if (user) {
      try {
        const token = await user.getIdToken();
        config.headers.set("Authorization", `Bearer ${token}`);
      } catch (error) {
        console.error("Erro ao obter token:", error);
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
