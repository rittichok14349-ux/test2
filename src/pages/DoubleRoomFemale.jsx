import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function RoomList() {
  const { type } = useParams(); // male / female
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/rooms?roomType=${type}`)
      .then(res => setRooms(res.data))
      .catch(err => console.log(err));
  }, [type]);

  return (
    <div className="container">
      <h2>ห้องคู่{type === "male" ? "ชาย" : "หญิง"}</h2>

      <div className="grid">
        {rooms.map(room => (
          <div 
            key={room.id} 
            className="card"
            onClick={() => navigate(`/room/${room.id}`)}
          >
            <img src={room.image} alt="room" />
            <h3>ห้อง {room.roomNo}</h3>
            <p>ราคา {room.price} บาท</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomList;
