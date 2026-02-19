import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FemaleRoom() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  // mock data (ใช้ก่อน รอ backend)
  const mockRooms = [
    {
      id: 1,
      code: "F201",
      type: "ห้องคู่ (หญิง)",
      price: 3500,
      image: "/image/room3.jpg",
      detail: "ห้องพัดลม มีเตียง 2 เตียง ห้องน้ำในตัว"
    },
    {
      id: 2,
      code: "F202",
      type: "ห้องคู่ (หญิง)",
      price: 4500,
      image: "/image/room4.jpg",
      detail: "ห้องแอร์ มี WiFi และตู้เย็น"
    },
    {
      id: 3,
      code: "F203",
      type: "ห้องคู่ (หญิง)",
      price: 4000,
      image: "/image/room5.jpg",
      detail: "ห้องแอร์ มีโต๊ะอ่านหนังสือ"
    }
  ];

  useEffect(() => {
    // 🔹 ตอนนี้ยังไม่ต่อ backend ใช้ mock data ไปก่อน
    setRooms(mockRooms);

    // 🔹 เมื่อมี Backend แล้ว เปลี่ยนเป็นแบบนี้:
    /*
    fetch("http://localhost:3000/api/rooms/female")
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(err => console.error(err));
    */
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">ห้องพักแบบคู่ (หญิง)</h2>

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
              <p className="text-green-600 font-semibold">฿{room.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FemaleRoom;
