import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbaradmin from "../../components/admin/Navberadmin";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Members = () => {
  const [users, setUsers] = useState([]);
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ เช็ค role ก่อน
    if (!auth || !auth.user) {
      alert("กรุณาเข้าสู่ระบบ");
      navigate("/login");
      return;
    }

    if (auth.user.role !== "admin") {
      alert("ไม่มีสิทธิ์เข้าถึงข้อมูล (Admin เท่านั้น)");
      navigate("/");
      return;
    }


    fetchUsers();
  }, [auth]);

  const fetchUsers = async () => {
    try {
      if (!auth?.token) {
        alert("Token หาย");
        return;
      }

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      console.log("users:", res.data);
      setUsers(res.data.data);

    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
      alert(error.response?.data?.message || "ดึงข้อมูลไม่สำเร็จ");
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
                  {u.createdAt
                    ? new Date(u.createdAt).toLocaleDateString()
                    : "-"}
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