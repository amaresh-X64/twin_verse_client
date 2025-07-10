import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/api/" });

API.interceptors.request.use(config => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

API.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Token has expired
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/token/refresh/")
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return API(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) throw new Error("Missing refresh token");

        const response = await axios.post("http://localhost:8000/api/token/refresh/", {
          refresh: refreshToken
        });

        const newAccessToken = response.data.access;
        localStorage.setItem("access_token", newAccessToken);

        API.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        // Logout fallback
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default API;
