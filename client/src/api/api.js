import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3200/api",
});

// If you add JWT later
// API.interceptors.request.use((req) => {
//   req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
//   return req;
// });

export default API;
