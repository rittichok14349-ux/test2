import { useState } from "react";
import axios from "axios";
import Navbaradmin from "../../components/Navberadmin"
function AddRoom() {
  const [room, setRoom] = useState({
    roomNo: "",
    roomType: "",
    price: "",
    floor: "",
    description: "",
    status: "AVAILABLE",
    dormId: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!room.roomNo || !room.roomType || !room.price || !room.floor || !room.dormId) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (!imageFile) {
      alert("กรุณาเลือกรูปภาพ");
      return;
    }

    const formData = new FormData();
    formData.append("roomNo", room.roomNo);
    formData.append("roomType", room.roomType);
    formData.append("price", room.price);
    formData.append("floor", room.floor);
    formData.append("description", room.description);
    formData.append("status", room.status);
    formData.append("dormId", room.dormId);
    formData.append("image", imageFile);

    try {
      setLoading(true);

      // ❗ ห้ามใส่ headers Content-Type
      await axios.post(
        `${import.meta.env.VITE_API_URL}/rooms`,
        formData
      );

      alert("เพิ่มห้องสำเร็จ");

      setRoom({
        roomNo: "",
        roomType: "",
        price: "",
        floor: "",
        description: "",
        status: "AVAILABLE",
        dormId: ""
      });

      setImageFile(null);

    } catch (err) {
      console.error("ERROR:", err.response?.data || err.message);
      alert("เพิ่มห้องไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <><Navbaradmin /> 

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

        <input type="number" name="price" placeholder="ราคา" onChange={handleChange} value={room.price} className="border p-2 w-full" />

        <input type="number" name="floor" placeholder="ชั้น" onChange={handleChange} value={room.floor} className="border p-2 w-full" />

        <select name="status" value={room.status} onChange={handleChange} className="border p-2 w-full">
          <option value="AVAILABLE">ว่าง</option>
          <option value="FULL">เต็ม</option>
        </select>

        <input type="number" name="dormId" placeholder="Dorm ID" value={room.dormId} onChange={handleChange} className="border p-2 w-full" />

        <input type="file" accept="image/*" onChange={handleImageChange} className="border p-2 w-full" />

        <textarea name="description" placeholder="รายละเอียดห้อง" onChange={handleChange} value={room.description} className="border p-2 w-full" />

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 rounded text-white font-medium transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "กำลังบันทึก..." : "บันทึกห้อง"}
        </button>
      </form>
    </div>
    </>
  );
}

export default AddRoom;
