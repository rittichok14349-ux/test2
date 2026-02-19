import { useState } from "react";
import axios from "axios";

function AddRoom() {
  const [room, setRoom] = useState({
    roomNo: "",
    roomType: "",
    price: "",
    floor: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/rooms", room);
      alert("เพิ่มห้องสำเร็จ");
      setRoom({
        roomNo: "",
        roomType: "",
        price: "",
        floor: "",
        image: "",
        description: "",
      });
    } catch (err) {
      console.error(err);
      alert("เพิ่มห้องไม่สำเร็จ");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">เพิ่มข้อมูลห้อง</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="roomNo" placeholder="รหัสห้อง" onChange={handleChange} value={room.roomNo} className="border p-2 w-full" />

        <select name="roomType" onChange={handleChange} value={room.roomType} className="border p-2 w-full">
          <option value="">เลือกประเภทห้อง</option>
          <option value="คู่ชาย">คู่ชาย</option>
          <option value="คู่หญิง">คู่หญิง</option>
          <option value="รวมชาย">รวมชาย</option>
          <option value="รวมหญิง">รวมหญิง</option>
        </select>

        <input name="price" type="number" placeholder="ราคา" onChange={handleChange} value={room.price} className="border p-2 w-full" />
        <input name="floor" type="number" placeholder="ชั้น" onChange={handleChange} value={room.floor} className="border p-2 w-full" />
        <input name="image" placeholder="URL รูปภาพ" onChange={handleChange} value={room.image} className="border p-2 w-full" />
        <textarea name="description" placeholder="รายละเอียดห้อง" onChange={handleChange} value={room.description} className="border p-2 w-full" />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          บันทึกห้อง
        </button>
      </form>
    </div>
  );
}

export default AddRoom;
