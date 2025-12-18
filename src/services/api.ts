import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { firebaseAuth } from "../config/firebase";

const rawUrl = import.meta.env.VITE_API_URL.replace(/\/$/, "");
const BASE_URL_WITH_PREFIX = `${rawUrl}/api`;

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
      const token = await user.getIdToken(true); // força token atualizado
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
