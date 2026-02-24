import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbaradmin from "../../components/admin/Navberadmin";

function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/rooms`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sortedRooms = res.data.sort((a, b) => a.id - b.id);
      setRooms(sortedRooms);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูลห้อง:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("ต้องการลบห้องนี้หรือไม่?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/rooms/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("ลบห้องเรียบร้อย");
      fetchRooms();
    } catch (error) {
      console.error("ลบห้องไม่สำเร็จ:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbaradmin />
      
      <div className="max-w-7xl mx-auto p-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">จัดการห้องพัก</h1>
            <p className="text-gray-500 mt-1">รายการห้องพักทั้งหมดในระบบ (Admin Panel)</p>
          </div>
          
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {rooms.length === 0 ? (
            <div className="py-20 text-center">
              <div className="text-gray-400 mb-3">ไม่พบข้อมูลห้องพักในระบบ</div>
              <button onClick={fetchRooms} className="text-indigo-600 font-semibold">โหลดข้อมูลใหม่</button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">รูปภาพ</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">รหัสห้อง</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">ประเภท</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">ราคา (บาท)</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right uppercase tracking-wider">จัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {rooms.map((room) => (
                    <tr key={room.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-500 font-medium">#{room.id}</td>
                      <td className="px-6 py-4">
                        <img
                          src={`${import.meta.env.VITE_API_URL}/uploads/${room.image}`}
                          alt={room.roomNo}
                          className="w-20 h-12 rounded-md object-cover shadow-sm ring-1 ring-gray-200"
                        />
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-800">{room.roomNo}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                          ${room.roomType === 'Male' ? 'bg-blue-100 text-blue-700' : 
                            room.roomType === 'Female' ? 'bg-pink-100 text-pink-700' : 'bg-green-100 text-green-700'}`}>
                          {room.roomType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 font-semibold">
                        {Number(room.price).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => navigate(`/admin/rooms/${room.id}`, { state: room })}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors title='ดูรายละเอียด'"
                          >
                             ดู
                          </button>
                          <button
                            onClick={() => navigate(`/admin/rooms/edit/${room.id}`, { state: room })}
                            className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                          >
                             แก้ไข
                          </button>
                          <button
                            onClick={() => handleDelete(room.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                             ลบ
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminRooms;