import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MaleRoom = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/rooms?roomType=male")
      .then((res) => {
        setRooms(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-6 bg-[#FFFBE6] min-h-screen">

      <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
        🛏️ ห้องพักแบบคู่ (ชาย)
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {rooms.slice(0, 8).map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-xl shadow hover:scale-105 transition cursor-pointer"
            onClick={() => navigate(`/room/${room.id}`)}
          >
            <img
              src={room.image}
              alt="room"
              className="w-full h-40 object-cover rounded-t-xl"
            />

            <div className="p-3 text-center">
              <h3 className="font-bold">ห้อง {room.roomNo}</h3>
              <p className="text-gray-600">{room.price} บาท/เดือน</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaleRoom;
