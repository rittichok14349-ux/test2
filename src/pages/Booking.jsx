import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarUser from "../components/user/NavbarUser";
import NavbarAdmin from "../components/admin/Navberadmin"; // ตรวจสอบชื่อไฟล์ Navber vs Navbar
import SidebarUser from "../components/user/SidebarUser";
import SidebarAdmin from "../components/admin/SidebarAdmin";

const BookingPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const [filterType, setFilterType] = useState("all");
  const [filterGender, setFilterGender] = useState("all");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    const userRole = localStorage.getItem("role");

  console.log("Current Role from Storage:", userRole); // ดูใน Console ว่าค่าออกมาเป็นอะไร
  setRole(userRole);
    if (!token) {
      navigate("/login");
      return;
    }
    try {
    const user = JSON.parse(userData); // แปลงจาก String กลับเป็น Object
    setRole(user.role); // เซ็ตค่า role จากใน object user
    console.log("Current Role from User Object:", user.role);
  } catch (e) {
    console.error("Parse user error", e);
  }

    setRole(userRole);

    fetch(`${import.meta.env.VITE_API_URL}/rooms`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("API error " + res.status);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setRooms(data);
        } else {
          setError("ข้อมูลห้องไม่ถูกต้อง");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("ไม่สามารถโหลดข้อมูลห้องได้");
        setLoading(false);
      });
  }, [navigate]);

  const filteredRooms = rooms.filter((room) => {
    const matchType = filterType === "all" || room.type === filterType;
    const matchGender = filterGender === "all" || room.gender === filterGender;
    return matchType && matchGender;
  });

  if (loading) return <div className="p-20 text-center font-medium text-gray-600">กำลังโหลดข้อมูลห้องพัก...</div>;
  if (error) return <div className="p-20 text-center text-red-500 font-medium">{error}</div>;

  return (
    // ใช้ flex เพื่อให้ Sidebar และเนื้อหาหลักอยู่ข้างกัน
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar Section */}
      {role === "ADMIN" ? <SidebarAdmin /> : <SidebarUser />}

      {/* Main Content Section */}
      <div className="flex-1 flex flex-col">
        
        {/* Navbar Section */}
        {role === "ADMIN" ? <NavbarAdmin /> : <NavbarUser />}

        {/* Content Area */}
        <div className="p-6 pt-24"> {/* pt-24 เผื่อที่ให้ Navbar ที่เป็น fixed */}
          <h1 className="text-2xl font-bold mb-6 text-gray-800">ค้นหาและจองห้องพัก</h1>

          {/* Filter Section */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-8 flex flex-wrap gap-6 items-center border border-gray-200">
            <div className="flex items-center">
              <span className="text-gray-600 mr-3 font-medium">ประเภทห้อง:</span>
              <select
                className="border border-gray-300 p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">ทั้งหมด</option>
                <option value="MALE">ห้องชาย</option>
                <option value="FEMALE">ห้องหญิง</option>
              </select>
            </div>
            <div className="text-sm text-gray-500 md:ml-auto font-medium">
              พบ {filteredRooms.length} ห้องที่ตรงเงื่อนไข
            </div>
          </div>

          {/* Room Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRooms.map((room) => (
              <div key={room.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 flex flex-col">
                <div className="h-44 bg-gray-200 flex items-center justify-center relative">
                  {room.image ? (
                    <img
                      src={`${import.meta.env.VITE_API_URL}/uploads/${room.image}`}
                      alt={`Room ${room.room_number || room.roomNo}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <i className="bi bi-image text-4xl text-gray-400"></i>
                  )}
                  <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm ${room.status === 'AVAILABLE' || room.status === 'ว่าง' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {room.status === 'AVAILABLE' || room.status === 'ว่าง' ? 'ว่าง' : 'เต็ม'}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-xl text-gray-800">ห้อง {room.room_number || room.roomNo}</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {room.type === "double" ? "ห้องคู่" : "ห้องรวม"} {room.gender === "male" ? "ชาย" : "หญิง"}
                  </p>
                  <div className="mt-auto pt-5 flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 uppercase font-semibold">ราคาต่อเดือน</span>
                      <span className="text-blue-600 font-bold text-lg">{room.price} บาท</span>
                    </div>
                    <button
                      onClick={() => navigate(`/rooms/${room.id}`)}
                      className="px-5 py-2 rounded-lg font-medium transition-all bg-blue-600 text-white hover:bg-blue-700"
                    >
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredRooms.length === 0 && (
            <div className="text-center py-24 bg-white rounded-xl border border-dashed border-gray-300 mt-10">
              <i className="bi bi-search text-5xl text-gray-300 block mb-4"></i>
              <p className="text-gray-500 text-lg">ไม่พบห้องพักที่ตรงเงื่อนไข</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;