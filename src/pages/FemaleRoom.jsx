import React, { useEffect, useState } from "react";
import axios from "axios";

function FemaleRoom() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/rooms")
      .then(res => {
        const femaleRooms = res.data.filter(r => r.gender === "female");
        setRooms(femaleRooms);
      });
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {rooms.map(room => (
        <div key={room.id} className="border p-3">
          <img src={`http://localhost:3000/images/${room.image}`} />
          <h2>ห้อง {room.room_number}</h2>
          <p>{room.description}</p>
        </div>
      ))}
    </div>
  );
}

export default FemaleRoom;
