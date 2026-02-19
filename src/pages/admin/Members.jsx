import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbaradmin from "../../components/Navberadmin";
import { useAuth } from "../../context/AuthContext";

const Members = () => {
  const [users, setUsers] = useState([]);
  const { auth } = useAuth(); // ✅ ดึง auth (ไม่ใช่ user)

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = auth?.token;

      if (!token) {
        alert("กรุณาเข้าสู่ระบบใหม่");
        return;
      }

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users", error.response?.data || error.message);
      alert("ไม่มีสิทธิ์เข้าถึงข้อมูล (Admin เท่านั้น)");
    }
  };

  return (
    <>
      <Navbaradmin />

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">รายชื่อสมาชิกทั้งหมด</h2>

        <table className="w-full border border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">ชื่อ</th>
              <th className="border p-2">อีเมล</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">วันที่สมัคร</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="border p-2 text-center">{u.id}</td>
                <td className="border p-2">{u.name}</td>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2 text-center">{u.role}</td>
                <td className="border p-2">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Members;
