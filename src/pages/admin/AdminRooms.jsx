import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbaradmin from "../../components/admin/Navberadmin";

function AdminRooms() {

  // -----------------------------
  // state สำหรับเก็บข้อมูลห้องทั้งหมดจาก backend
  // rooms จะเป็น array เช่น [{id:1, roomNo:"A101", roomType:"Male", price:3000}]
  // -----------------------------
  const [rooms, setRooms] = useState([]);

  // ใช้สำหรับเปลี่ยนหน้า
  const navigate = useNavigate();

  // -----------------------------
  // useEffect ทำงานเมื่อ component ถูกโหลดครั้งแรก
  // เรียกฟังก์ชัน fetchRooms เพื่อดึงข้อมูลห้อง
  // -----------------------------
  useEffect(() => {
    fetchRooms();
  }, []);

  // -----------------------------
  // ฟังก์ชันดึงข้อมูลห้องจาก Backend API
  // -----------------------------
  const fetchRooms = async () => {
    try {
      // เรียก API จาก backend เช่น http://localhost:3000/rooms
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/rooms`);

      // เรียงข้อมูลตาม id จากน้อยไปมาก
      const sortedRooms = res.data.sort((a, b) => a.id - b.id);

      // เก็บข้อมูลลง state rooms
      setRooms(sortedRooms);

    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูลห้อง:", error);
    }
  };

  // -----------------------------
  // ฟังก์ชันลบห้องตาม id
  // -----------------------------
  const handleDelete = async (id) => {

    // แสดงกล่องยืนยันก่อนลบ
    if (!window.confirm("ต้องการลบห้องนี้หรือไม่?")) return;

    try {
      // เรียก API ลบห้อง
      await axios.delete(`${import.meta.env.VITE_API_URL}/rooms/${id}`);

      alert("ลบห้องเรียบร้อย");

      // โหลดข้อมูลใหม่หลังจากลบ
      fetchRooms();

    } catch (error) {
      console.error("ลบห้องไม่สำเร็จ:", error);
    }
  };

  return ( <><Navbaradmin />
    <div className="p-6">
        
      <h1 className="text-2xl font-bold mb-4">รายการห้องทั้งหมด (Admin)</h1>

      {/* ถ้าไม่มีข้อมูลห้อง */}
      {rooms.length === 0 ? (
        <p>ยังไม่มีข้อมูลห้อง</p>
      ) : (
        <table className="w-full border">

          {/* ---------- หัวตาราง ---------- */}
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">รูป</th>
              <th className="border p-2">รหัสห้อง</th>
              <th className="border p-2">ประเภทห้อง</th>
              <th className="border p-2">ราคา</th>
              <th className="border p-2">จัดการ</th>
            </tr>
          </thead>

          {/* ---------- ตัวข้อมูล ---------- */}
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>

                {/* แสดง id ห้อง */}
                <td className="border p-2 text-center">{room.id}</td>

                {/* แสดงรูปห้อง */}
                <td className="border p-2">
                    <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/${room.image}`}
                    className="w-24 h-16 object-cover"
                  />
                </td>

                {/* ✅ แสดงรหัสห้องจาก field roomNo */}
                <td className="border p-2">{room.roomNo}</td>

                {/* ✅ แสดงประเภทห้องจาก field roomType */}
                <td className="border p-2">{room.roomType}</td>

                {/* แสดงราคา */}
                <td className="border p-2">{room.price}</td>

                {/* ปุ่มจัดการ */}
                <td className="border p-2 space-x-2">

                  {/* ปุ่มดูรายละเอียด */}
                  <button
                    onClick={() =>
                      navigate(`/admin/rooms/${room.id}`, { state: room })
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    ดูรายละเอียด
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/admin/rooms/edit/${room.id}`, { state: room })
                    }
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    แก้ไขห้อง
                  </button>

                  {/* ปุ่มลบ */}
                  <button
                    onClick={() => handleDelete(room.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    ลบ
                  </button>

                </td>
              </tr>
            ))}
          </tbody>

        </table>
      )}
    </div>
    </>
  );
}

export default AdminRooms;