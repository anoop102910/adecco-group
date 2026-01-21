import axios from "axios";

const token = localStorage.getItem("token");
export const api = axios.create({
  baseURL: "http://localhost:5001",
  headers: {
    Authorization: `Bearer ${token}`,
    withCredentials: true,
  },
});
