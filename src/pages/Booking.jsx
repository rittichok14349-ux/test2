import React, { useState, useEffect } from "react";
import NavbarUser from "../components/user/NavbarUser";
import Sidebar from "../components/Sidebar"

const BookingPage = () => {
  const [rooms, setRooms] = useState([]); // เก็บข้อมูลจากฐานข้อมูล
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State สำหรับ Filter
  const [filterType, setFilterType] = useState("all"); 
  const [filterGender, setFilterGender] = useState("all");

  // 1. ดึงข้อมูลจาก API (ข้อมูลจริง)
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/rooms`)
      .then(async (res) => {
        if (!res.ok) throw new Error("API error " + res.status);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setRooms(data);
        } else {
          setError("ข้อมูลห้องไม่ถูกต้อง");
          setRooms([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("โหลดข้อมูลไม่สำเร็จ", err);
        setError("ไม่สามารถโหลดข้อมูลห้องได้");
        setLoading(false);
      });
  }, []);

  // 2. Logic การกรองข้อมูล (ใช้ filteredRooms ในการ Render)
  const filteredRooms = rooms.filter((room) => {
    // หมายเหตุ: ตรวจสอบชื่อ key (เช่น .type, .gender) ให้ตรงกับที่ API ส่งมานะครับ
    const matchType = filterType === "all" || room.type === filterType;
    const matchGender = filterGender === "all" || room.gender === filterGender;
    return matchType && matchGender;
  });

  if (loading) return <div className="p-20 text-center font-medium text-gray-600">กำลังโหลดข้อมูลห้องพัก...</div>;
  if (error) return <div className="p-20 text-center text-red-500 font-medium">{error}</div>;

  return (
    <><NavbarUser />
    <div className="p-6 bg-gray-100 min-h-screen pt-24">
        <Sidebar />
      <h1 className="text-2xl font-bold mb-6 text-gray-800">ค้นหาและจองห้องพัก</h1>

      {/* --- Filter Section (UI สวยงาม) --- */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-8 flex flex-wrap gap-6 items-center border border-gray-200">
        <div className="flex items-center">
          <span className="text-gray-600 mr-3 font-medium">ประเภทห้อง:</span>
          <select 
            className="border border-gray-300 p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">ทั้งหมด</option>
            <option value="double">ห้องคู่</option>
            <option value="group">ห้องรวม</option>
          </select>
        </div>

        <div className="flex items-center">
          <span className="text-gray-600 mr-3 font-medium">เพศ:</span>
          <select 
            className="border border-gray-300 p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
          >
            <option value="all">ทั้งหมด</option>
            <option value="male">ชาย</option>
            <option value="female">หญิง</option>
          </select>
        </div>

        <div className="text-sm text-gray-500 md:ml-auto font-medium">
          พบ {filteredRooms.length} ห้องที่ตรงเงื่อนไข
        </div>
      </div>

      {/* --- Room Grid (UI สวยงาม) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRooms.map((room) => (
          <div key={room.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 flex flex-col">
            
            {/* Image Area */}
            <div className="h-44 bg-gray-200 flex items-center justify-center relative">
               {/* ถ้ามี URL รูปใน DB ให้ใช้ room.image_url ถ้าไม่มีใช้ icon แทน */}
               {room.image_url ? (
                 <img src={room.image_url} alt={room.room_number} className="w-full h-full object-cover" />
               ) : (
                 <i className="bi bi-image text-4xl text-gray-400"></i>
               )}
               
               {/* Status Tag */}
               <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm ${room.status === 'AVAILABLE' || room.status === 'ว่าง' ? 'bg-green-500' : 'bg-red-500'}`}>
                 {room.status === 'AVAILABLE' || room.status === 'ว่าง' ? 'ว่าง' : 'เต็ม'}
               </span>
            </div>

            {/* Content Area */}
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
                  disabled={room.status === 'FULL' || room.status === 'เต็ม'}
                  className={`px-5 py-2 rounded-lg font-medium transition-all ${
                    room.status === 'AVAILABLE' || room.status === 'ว่าง'
                    ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {room.status === 'AVAILABLE' || room.status === 'ว่าง' ? 'จองห้องพัก' : 'เต็มแล้ว'}
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
           <p className="text-gray-500 text-lg">ไม่พบห้องพักที่ตรงตามเงื่อนไขที่คุณเลือก</p>
           <button 
             onClick={() => { setFilterType('all'); setFilterGender('all'); }}
             className="mt-4 text-blue-600 hover:underline font-medium"
           >
             ล้างตัวกรองทั้งหมด
           </button>
        </div>
      )}
    </div>
    </>
  );
};

export default BookingPage;