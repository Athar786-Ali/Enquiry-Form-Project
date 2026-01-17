import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-enquiry-form-project-server.onrender.com/api",

});

// 🔐 AUTO ATTACH JWT TOKEN
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["auth-token"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🚪 AUTO LOGOUT ON TOKEN EXPIRE
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default API;
