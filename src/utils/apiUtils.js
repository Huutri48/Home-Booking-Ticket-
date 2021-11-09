import axios from "axios";

export const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxMCIsIkhldEhhblN0cmluZyI6IjAzLzAzLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY0NjI2NTYwMDAwMCIsIm5iZiI6MTYxNjc3ODAwMCwiZXhwIjoxNjQ2NDEzMjAwfQ.-kBpd2bu-Gx60Sgo7peCQ2ASUYeOSuQB3Z9NWxIyAw8";

const api = axios.create({
  baseURL: "https://movie0706.cybersoft.edu.vn/api/",
});
api.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      TokenCyberSoft: TOKEN_CYBERSOFT,
    };
    return config;
  },
  (errors) => {
    return Promise.reject(errors);
  }
);

export default api;
