import axios from "axios";
import { SESSION_ID_KEY } from "../configs/auth";
import { store } from "../store";
import { setSessionExpired } from "../store/slices/client/slice";
import { showToast } from "@/hooks/useToast";
import { getErrorMessage } from "@/utils";

export const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor thêm config
apiRequest.interceptors.request.use((config) => {
  // Session login
  const loginSession = localStorage.getItem(SESSION_ID_KEY);

  if (loginSession) {
    config.headers["X-Session-ID"] = loginSession;
  }

  return config;
});

apiRequest.interceptors.response.use(
  (response) => {
    if (response.data.rc < 0) {
      showToast(getErrorMessage(response.data.msg), "error");
      return Promise.reject(response.data.msg);
    }
    return response.data;
  },
  (error) => {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      // 401: Hết phiên đăng nhập
      if (status === 401) {
        store.dispatch(setSessionExpired(true));
        return new Promise(() => {});
      }
    }

    return Promise.reject(error);
  },
);

// Abort controller
export const createAbortSignal = () => {
  const controller = new AbortController();
  return { signal: controller.signal, cancel: () => controller.abort() };
};
