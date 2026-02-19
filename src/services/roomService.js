import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/rooms`;

export const createRoom = async (roomNo, roomType, price, floor) => {
  const res = await axios.post(`${API_URL}/rooms`, {
    roomNo: roomNo,
    roomType: roomType,
    price: price,
    floor: floor,
    description: "",
    status: "AVAILABLE",
    dormId: ""
  });
  return res.data;
};
