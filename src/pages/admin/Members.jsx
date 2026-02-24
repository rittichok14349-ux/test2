import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbaradmin from "../../components/admin/Navberadmin";
import SidebarAdmin from "../../components/admin/SidebarAdmin"; // เพิ่ม Sidebar
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Members = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // เพิ่ม loading state
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. ถ้าข้อมูล auth ยังไม่มา (กำลังโหลดจาก localStorage) อย่าเพิ่งทำอะไร
    if (auth === undefined) return; 

    // 2. เช็คการมีอยู่ของ auth และบทบาท
    if (!auth || !auth.user) {
      alert("กรุณาเข้าสู่ระบบ");
      navigate("/login");
      return;
    }

    if (auth.user.role?.toUpperCase() !== "ADMIN") { // ใช้ toUpperCase ป้องกันตัวเล็กตัวใหญ่
      alert("ไม่มีสิทธิ์เข้าถึงข้อมูล (Admin เท่านั้น)");
      navigate("/");
      return;
    }

    fetchUsers();
  }, [auth, navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      // ตรวจสอบโครงสร้าง data ที่ส่งมาจาก API (บ่อยครั้งจะเป็น res.data หรือ res.data.data)
      const userData = Array.isArray(res.data) ? res.data : res.data.data;
      setUsers(userData || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("ดึงข้อมูลไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  if (auth === undefined || (loading && users.length === 0)) {
    return <div className="p-20 text-center">กำลังตรวจสอบสิทธิ์...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar อยู่ซ้าย */}
      <SidebarAdmin />

      <div className="flex-1 flex flex-col">
        {/* Navbar อยู่บน */}
        <Navbaradmin />

        <div className="p-6 pt-24">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">👤 รายชื่อสมาชิกทั้งหมด</h2>

          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="p-4 font-semibold text-gray-600">ID</th>
                  <th className="p-4 font-semibold text-gray-600">ชื่อ</th>
                  <th className="p-4 font-semibold text-gray-600">อีเมล</th>
                  <th className="p-4 font-semibold text-gray-600 text-center">Role</th>
                  <th className="p-4 font-semibold text-gray-600">วันที่สมัคร</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((u) => (
                    <tr key={u.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-gray-700">{u.id}</td>
                      <td className="p-4 text-gray-700 font-medium">{u.name}</td>
                      <td className="p-4 text-gray-500">{u.email}</td>
                      <td className="p-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${u.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4 text-gray-500">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString('th-TH') : "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-10 text-center text-gray-400">ไม่พบข้อมูลสมาชิก</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;