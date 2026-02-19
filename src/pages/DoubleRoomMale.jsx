import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DoubleRoomMale() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  // mock data (รอ backend)
  const mockRooms = [
    {
      id: 1,
      code: "DM101",
      type: "ห้องรวม (ชาย)",
      capacity: 6,
      price: 2000,
      image: "/image/dorm1.jpg",
      detail: "ห้องพัดลม เตียง 2 ชั้น 6 เตียง ห้องน้ำรวม"
    },
    {
      id: 2,
      code: "DM102",
      type: "ห้องรวม (ชาย)",
      capacity: 8,
      price: 2500,
      image: "/image/dorm2.jpg",
      detail: "ห้องแอร์ เตียง 2 ชั้น 8 เตียง มี WiFi"
    },
    {
      id: 3,
      code: "DM103",
      type: "ห้องรวม (ชาย)",
      capacity: 10,
      price: 1800,
      image: "/image/dorm3.jpg",
      detail: "ห้องพัดลม ราคาประหยัด เหมาะสำหรับนักเรียน"
    }
  ];

  useEffect(() => {
    setRooms(mockRooms);

    // 🔹 เมื่อเชื่อม backend
    /*
    fetch("http://localhost:3000/api/rooms/male-dorm")
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(err => console.error(err));
    */
  }, []);

  return (
    <div className="p-6">
      
      <h2 className="text-xl font-bold mb-4">ห้องพักรวม (เพศชาย)</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="border rounded-lg shadow hover:scale-105 transition cursor-pointer"
            onClick={() => navigate(`/room/${room.id}`, { state: room })}
          >
            <img
              src={room.image}
              alt={room.code}
              className="w-full h-48 object-cover rounded-t-lg"
            />

            <div className="p-4">
              <h3 className="font-bold text-lg">รหัสห้อง: {room.code}</h3>
              <p>{room.type}</p>
              <p>จำนวนผู้พัก: {room.capacity} คน</p>
              <p className="text-green-600 font-semibold">฿{room.price} / เดือน</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoubleRoomMale;
