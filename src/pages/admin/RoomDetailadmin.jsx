import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function AdminRoomDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const roomData = location.state;

  const [room, setRoom] = useState(roomData);

  if (!room) {
    return <p>ไม่พบข้อมูลห้อง</p>;
  }

  // แก้ไขค่า input
  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  // บันทึก (เชื่อม API ภายหลัง)
  const handleSave = () => {
    console.log("บันทึกข้อมูล:", room);
    alert("บันทึกข้อมูลเรียบร้อย (ตัวอย่าง)");
  };

  // ลบห้อง
  const handleDelete = () => {
    if (window.confirm("ต้องการลบห้องนี้หรือไม่?")) {
      console.log("ลบห้อง:", room.code);
      alert("ลบห้องเรียบร้อย (ตัวอย่าง)");
      navigate("/admin/rooms");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <button
        className="mb-4 bg-gray-300 px-4 py-2 rounded"
        onClick={() => navigate(-1)}
      >
        ← กลับ
      </button>

      <img
        src={room.image}
        alt={room.code}
        className="w-full rounded-lg mb-4"
      />

      <div className="space-y-3">
        <div>
          <label>รหัสห้อง</label>
          <input
            type="text"
            name="code"
            value={room.code}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>ประเภท</label>
          <input
            type="text"
            name="type"
            value={room.type}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>ราคา</label>
          <input
            type="number"
            name="price"
            value={room.price}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>รายละเอียด</label>
          <textarea
            name="detail"
            value={room.detail}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          บันทึก
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          ลบห้อง
        </button>
      </div>
    </div>
  );
}

export default AdminRoomDetail;
