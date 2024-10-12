import axios from "axios";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
console.log(backendURL);

const axiosInstance = axios.create({
  baseURL: backendURL,
  withCredentials: true,
});

export default axiosInstance;
