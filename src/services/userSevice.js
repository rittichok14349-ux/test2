
// src/services/authService.js
import axios from "axios";
// ✅ เพิ่มฟังก์ชันสมัครสมาชิก (ใหม่)
export const registerUser = async (formData) => {
  // formData จะต้องถูกส่งมาจากหน้า Register.jsx ในรูปแบบ new FormData()
  const res = await axios.post(`${API_URL}/register`, formData, {
    headers: {
      "Content-Type": "multipart/form-data", // จำเป็นมากสำหรับการส่งไฟล์รูปภาพ
    },
  });
  return res.data;
};