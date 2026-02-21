import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbaradmin from "../../components/admin/Navberadmin";

function DetailRoomAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);


  // โหลดข้อมูลห้องจาก backend
  useEffect(() => {
    fetchRoomById();
  }, []);

  const fetchRoomById = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/rooms/${id}`);
      setRoom(res.data);
    } catch (error) {
      alert("ไม่พบข้อมูลห้อง");
    } finally {
      setLoading(false);
    }

  };
    const statusMap = {
  AVAILABLE: "ว่าง",
  FULL: "เต็ม",
};

  if (loading) {
    return <p className="text-center mt-10">กำลังโหลดข้อมูล...</p>;
  }

  if (!room) {
    return <p className="text-center mt-10">ไม่พบข้อมูลห้อง</p>;
  }

  return (
    <>
      <Navbaradmin />

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            🏠 รายละเอียดห้อง
          </h2>

          {/* รูปภาพ */}
          <div className="flex justify-center mb-6">
           
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/${room.image}`}
              alt="room"
              className="w-72 h-44 object-cover rounded-lg shadow"
            />
          </div>

          {/* ข้อมูล */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-gray-500">รหัสห้อง</label>
              <p className="font-semibold">{room.roomNo}</p>
            </div>

            <div>
              <label className="text-sm text-gray-500">ประเภทห้อง</label>
              <p className="font-semibold">{room.roomType}</p>
            </div>

            <div>
              <label className="text-sm text-gray-500">ราคา</label>
              <p className="font-semibold">{room.price} บาท</p>
            </div>

            <div>
              <label className="text-sm text-gray-500">ชั้น</label>
              <p className="font-semibold">{room.floor}</p>
            </div>

            <div>
              <label className="text-sm text-gray-500">สถานะ</label>
              <span
                className={`ml-2 inline-block px-4 py-1 rounded-full text-sm font-medium ${
                  room.status === "AVAILABLE"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              > {statusMap[room.status] || room.status}
                
              </span>
            </div>

            <div>
              <label className="text-sm text-gray-500"> อาคาร ที่</label>
              <p className="font-semibold">{room.dormId}</p>
            </div>
          </div>

          {/* รายละเอียด */}
          <div className="mt-6">
            <label className="text-sm text-gray-500">รายละเอียดห้อง</label>
            <p className="mt-2 bg-gray-50 p-4 rounded-lg">
              {room.description || "ไม่มีรายละเอียด"}
            </p>
          </div>

          {/* ปุ่ม */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
            >
              🔙 กลับ
            </button>

            <button
              onClick={() => navigate(`/admin/rooms/edit/${room.id}`)}
              className="flex-1 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              ✏️ แก้ไขข้อมูล
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default DetailRoomAdmin;