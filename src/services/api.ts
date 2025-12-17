import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { firebaseAuth } from "../config/firebase";

/**
 * Remove barra final da URL, se existir
 * Ex: https://api.meusite.com/
 * -> https://api.meusite.com
 */
const rawUrl = import.meta.env.VITE_API_URL.replace(/\/$/, "");

/**
 * Backend registrado com prefixo /api
 * app.register(routes, { prefix: "/api" });
 */
const BASE_URL_WITH_PREFIX = `${rawUrl}/api`;

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL_WITH_PREFIX,
  timeout: 10000,
  withCredentials: true,
});

/**
 * Interceptor para adicionar token do Firebase
 */
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
        console.error("Erro ao obter token do Firebase:", error);
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
