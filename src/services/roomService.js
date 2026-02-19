import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/rooms`;

export const createRoom = async (formData) => {
  const res = await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
