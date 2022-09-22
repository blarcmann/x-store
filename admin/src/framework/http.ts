import axios from "axios";

const http = axios.create({
  baseURL: 'http://localhost:5002/api',
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const token = localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiaWQiOiI2MmFkZjNhZWY2ZWIyMWExOGI5ZDczYjAiLCJpYXQiOjE2NjM4NDg2NDEsImV4cCI6MTY2NDEwNzg0MX0.1zVHzIXLKVc47Nk_44IGGF9WMg-qupsVAxGlO6V8mGg';
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
