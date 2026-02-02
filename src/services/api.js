import axios from "axios";

const api = axios.create({
  baseURL: "https://ipl-l7tp.onrender.com/api"
});

export default api;
