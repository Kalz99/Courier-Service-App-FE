import axios from 'axios';

// Transient memory state for the access token JWT (insulated from XSS/localStorage)
let inMemoryToken: string | null = null;

// Bridge callbacks to keep React state and Axios interceptor in perfect sync
let updateReactTokenCallback: ((token: string | null) => void) | null = null;
let sessionExpiredCallback: (() => void) | null = null;

export const setInMemoryToken = (token: string | null) => {
  inMemoryToken = token;
};

export const registerAuthCallbacks = (
  onTokenUpdate: (token: string | null) => void,
  onSessionExpired: () => void
) => {
  updateReactTokenCallback = onTokenUpdate;
  sessionExpiredCallback = onSessionExpired;
};

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Outbound request interceptor: Inject the bearer Access Token from transient memory
API.interceptors.request.use((config) => {
  if (inMemoryToken) {
    config.headers.Authorization = `Bearer ${inMemoryToken}`;
  }
  // Crucial: Forward HttpOnly credentials (the Refresh Token cookie) behind the scenes
  config.withCredentials = true;
  return config;
});

// Queuing states to handle concurrent API calls during silent refresh cycles
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Inbound response interceptor: Silently renew token on 401 and retry original request
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If request fails due to token expiration, and wasn't already a refresh retry
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/refresh') &&
      !originalRequest.url?.includes('/auth/login') &&
      !originalRequest.url?.includes('/auth/register')
    ) {
      if (isRefreshing) {
        // Queue other concurrent requests while the renewal is pending
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return API(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Silent refresh utilizing the secure HttpOnly cookie
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const { accessToken } = response.data.data;

        // Update in-memory JWT references
        inMemoryToken = accessToken;
        if (updateReactTokenCallback) {
          updateReactTokenCallback(accessToken);
        }

        processQueue(null, accessToken);
        isRefreshing = false;

        // Re-execute initial failed request with the fresh token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;

        // Clear session on renewal failure (refresh token expired/revoked)
        if (sessionExpiredCallback) {
          sessionExpiredCallback();
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;