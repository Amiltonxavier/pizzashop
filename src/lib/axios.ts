import { env } from "@/env";
import axios from "axios";

export const api = axios.create({
  baseURL: env.VITE_APP_URL,
  withCredentials: true,
});

if (env.VITE_ENABLE_API_DEPAY) {
  api.interceptors.response.use(async (config) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return config;
  });
}
