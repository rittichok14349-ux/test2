import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });
  return res.data;
};
