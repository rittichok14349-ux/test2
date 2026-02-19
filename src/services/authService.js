import axios from "axios";

const API_URL = "http://localhost:4000/api/auth"; // backend

export const loginUser = async (username, password) => {
  const res = await axios.post(`${API_URL}/login`, {
    username,
    password,
  });
  return res.data;
};
