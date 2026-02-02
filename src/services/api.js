import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const getPlayers = async (page = 1) => {
  const res = await API.get(`/players?page=${page}`);
  return res.data; // 👈 poora object
};
