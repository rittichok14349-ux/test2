import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

function MaleRoom() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/rooms")
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("โหลดข้อมูลไม่สำเร็จ", err);
        setLoading(false);
      });
  }, []);

  const handleClickRoom = (room) => {
    if (!user) {
      alert("กรุณาเข้าสู่ระบบก่อน");
      return;
    }

    if (user.role === "admin") {
      navigate(`/admin/room/${room.id}`, { state: room });
    } else {
      navigate(`/room/${room.id}`, { state: room });
    }
  };

  if (loading) return <p>กำลังโหลดข้อมูล...</p>;

  return (
    <div className="p-9 mt-10">
      <Sidebar />
      <h2 className="text-xl font-bold mb-4">ห้องพักแบบคู่ (ชาย)</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="border rounded-lg shadow hover:scale-105 transition cursor-pointer"
            onClick={() => handleClickRoom(room)}
          >
            <img
              src={`{import.meta.env.VITE_API_URL} uploads/${room.image}`}
              alt={room.roomNo}
              className="w-full h-48 object-cover rounded-t-lg"
            />

            <div className="p-4">
              <h3 className="font-bold text-lg">รหัสห้อง: {room.roomNo}</h3>
              <p>{room.roomType}</p>
              <p className="text-green-600 font-semibold">฿{room.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MaleRoom;
