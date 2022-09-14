import axios from "axios";

const http = axios.create({
  baseURL: process.env.LOCAL_BASEURL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const token = localStorage.getItem('token');
// Change request data/error here
http.interceptors.request.use(
  (config: any) => {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token ? token : ""}`,
    };
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default http;
