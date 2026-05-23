import axios from "axios";
import type {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

// Store access token in memory
let inMemoryToken: string | null = null;

// Auth state callbacks
let updateTokenCallback: ((token: string | null) => void) | null = null;
let sessionExpiredCallback: (() => void) | null = null;

interface FailedRequest {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}

interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const setInMemoryToken = (token: string | null) => {
  inMemoryToken = token;
};

export const registerAuthCallbacks = (
  onTokenUpdate: (token: string | null) => void,
  onSessionExpired: () => void
) => {
  updateTokenCallback = onTokenUpdate;
  sessionExpiredCallback = onSessionExpired;
};

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Attach access token to requests
API.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (inMemoryToken) {
    config.headers.Authorization = `Bearer ${inMemoryToken}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
};

// Handle token refresh on 401 errors
API.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequestConfig | undefined;

    if (!originalRequest || !error.response) {
      return Promise.reject(error);
    }

    const isUnauthorized = error.response.status === 401;
    const isAuthRoute = ["/auth/login", "/auth/register", "/auth/refresh"].some(
      (route) => originalRequest.url?.includes(route)
    );

    if (isUnauthorized && !originalRequest._retry && !isAuthRoute) {
      if (isRefreshing) {
        try {
          const token = await new Promise<string | null>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          if (token) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return API(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const accessToken = response.data?.data?.accessToken;
        if (!accessToken) {
          throw new Error("Access token missing");
        }

        inMemoryToken = accessToken;
        updateTokenCallback?.(accessToken);
        processQueue(null, accessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        return API(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        sessionExpiredCallback?.();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default API;