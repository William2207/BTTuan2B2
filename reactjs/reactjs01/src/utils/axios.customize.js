import axios from "axios";

const instace = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

instace.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instace.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
      console.log("Unauthorized! Redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default instace;
