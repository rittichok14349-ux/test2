import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarUser from "../../components/user/NavbarUser";
import NavbarAdmin from "../../components/admin/Navberadmin"; 
import SidebarUser from "../../components/user/SidebarUser";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Members = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const userRole = auth?.user?.role?.toUpperCase();

  useEffect(() => {
    if (auth === undefined) return;
    if (!auth || !auth.user) {
      navigate("/login");
      return;
    }
    fetchUsers();
  }, [auth, navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (userRole !== "ADMIN") return;
    if (window.confirm(`คุณแน่ใจหรือไม่ที่จะลบสมาชิก: ${name}?`)) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/user/${id}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setUsers(users.filter((u) => u.id !== id));
      } catch (error) {
        alert("ไม่สามารถลบได้");
      }
    }
  };

  if (loading && users.length === 0) return null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 1. Sidebar - ต้องกำหนดความกว้างคงที่ */}
      
        {userRole === "ADMIN" ? <SidebarAdmin /> : <SidebarUser />}
      

      {/* 2. Main Content Area - ต้องดัน Margin Left เท่ากับความกว้าง Sidebar */}
      <div className="flex-1 flex flex-col">
        
        {/* Navbar - ให้ลอยตัวหรือติดด้านบน */}
        
          {userRole === "ADMIN" ? <NavbarAdmin /> : <NavbarUser />}
        

        {/* Content Body */}
        <main className="p-6 lg:p-10">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-800">จัดการสมาชิก</h1>
              <p className="text-slate-500 mt-1">ข้อมูลผู้ใช้งานในระบบทั้งหมด</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">ID</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">ชื่อ-นามสกุล</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">อีเมล</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase text-center">บทบาท</th>
                      {userRole === "ADMIN" && (
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase text-right">จัดการ</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-4 text-sm font-mono text-slate-400">#{u.id}</td>
                        <td className="px-6 py-4 font-semibold text-slate-700">{u.firstName} {u.lastName}</td>
                        <td className="px-6 py-4 text-sm text-slate-500">{u.email}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border ${
                            u.role?.toUpperCase() === 'ADMIN' 
                            ? 'bg-indigo-50 text-indigo-600 border-indigo-100' 
                            : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        {userRole === "ADMIN" && (
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => handleDelete(u.id, u.firstName)}
                              className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-slate-50/50 px-6 py-3 border-t border-slate-100">
                <span className="text-xs text-slate-400 font-medium">รวมทั้งหมด {users.length} รายการ</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Members;