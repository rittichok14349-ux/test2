import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar"
const rooms = [
  {
    id: 1,
    code: "M101",
    type: "ห้องคู่ (ชาย)",
    price: 3500,
    image: "/image/room1.jpg",
    detail: "ห้องพัดลม มีเตียง 2 เตียง ห้องน้ำในตัว"
  },
  {
    id: 2,
    code: "M102",
    type: "ห้องคู่ (ชาย)",
    price: 4000,
    image: "/image/room2.jpg",
    detail: "ห้องแอร์ มี WiFi และตู้เย็น"
  },
    {
    id: 2,
    code: "M102",
    type: "ห้องคู่ (ชาย)",
    price: 4000,
    image: "/image/room2.jpg",
    detail: "ห้องแอร์ มี WiFi และตู้เย็น"
  },  {
    id: 2,
    code: "M102",
    type: "ห้องคู่ (ชาย)",
    price: 4000,
    image: "/image/room2.jpg",
    detail: "ห้องแอร์ มี WiFi และตู้เย็น"
  },
    {
    id: 2,
    code: "M102",
    type: "ห้องคู่ (ชาย)",
    price: 4000,
    image: "/image/room2.jpg",
    detail: "ห้องแอร์ มี WiFi และตู้เย็น"
  },
    {
    id: 2,
    code: "M102",
    type: "ห้องคู่ (ชาย)",
    price: 4000,
    image: "/image/room2.jpg",
    detail: "ห้องแอร์ มี WiFi และตู้เย็น"
  }
];

function MaleRoom() {
  const navigate = useNavigate();

  return (
    <div className="p-9 mt-10">
      <Sidebar />
      <h2 className="text-xl font-bold mb-4">ห้องพักแบบคู่ (ชาย)</h2>

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

export default MaleRoom;
