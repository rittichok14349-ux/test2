import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbaradmin from "../../components/admin/Navberadmin";

function EditRoom() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState({
    roomNo: "",
    roomType: "",
    price: "",
    floor: "",
    description: "",
    status: "AVAILABLE",
    dormId: "",
    image: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRoomById();
  }, []);

  // ดึงข้อมูลห้องเดิม
  const fetchRoomById = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/rooms/${id}`);
      setRoom(res.data);
    } catch (error) {
      alert("ไม่พบข้อมูลห้อง");
    }
  };

  // เปลี่ยนค่า input
  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  // เลือกรูปใหม่ + preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setRoom({ ...room, image: URL.createObjectURL(file) });
    }
  };

  // บันทึกการแก้ไข
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!room.roomNo || !room.roomType || !room.price || !room.floor || !room.dormId) {
      alert("กรุณากรอกข้อมูลให้ครบ");
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

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      setLoading(true);
      await axios.put(`${import.meta.env.VITE_API_URL}/rooms/${id}`, formData);
      alert("แก้ไขข้อมูลห้องสำเร็จ");
      navigate("/admin/rooms");
    } catch (error) {
      alert("แก้ไขห้องไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbaradmin />

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            🛠 แก้ไขข้อมูลห้อง
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* รูปภาพ Preview */}
            <div className="flex justify-center">
              <img
                src={room.image || "https://via.placeholder.com/300x180"}
                alt="room"
                className="w-72 h-44 object-cover rounded-lg shadow"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* รหัสห้อง */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">รหัสห้อง</label>
                <input
                  name="roomNo"
                  value={room.roomNo}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                />
              </div>

              {/* ประเภทห้อง */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">ประเภทห้อง</label>
                <select
                  name="roomType"
                  value={room.roomType}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                >
                  <option value="">เลือกประเภท</option>
                  <option value="คู่ชาย">คู่ชาย</option>
                  <option value="คู่หญิง">คู่หญิง</option>
                  <option value="รวมชาย">รวมชาย</option>
                  <option value="รวมหญิง">รวมหญิง</option>
                </select>
              </div>

              {/* ราคา */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">ราคา</label>
                <input
                  type="number"
                  name="price"
                  value={room.price}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                />
              </div>

              {/* ชั้น */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">ชั้น</label>
                <input
                  type="number"
                  name="floor"
                  value={room.floor}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                />
              </div>

              {/* สถานะ */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">สถานะ</label>
                <select
                  name="status"
                  value={room.status}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                >
                  <option value="AVAILABLE">ว่าง</option>
                  <option value="FULL">เต็ม</option>
                </select>
              </div>

              {/* Dorm ID */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Dorm ID</label>
                <input
                  type="number"
                  name="dormId"
                  value={room.dormId}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                />
              </div>
            </div>

            {/* เลือกรูป */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">เลือกรูปใหม่</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border rounded-lg p-2"
              />
            </div>

            {/* รายละเอียด */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">รายละเอียด</label>
              <textarea
                name="description"
                value={room.description}
                onChange={handleChange}
                rows="4"
                className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
              />
            </div>

            {/* ปุ่ม */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-2 rounded-lg text-white font-semibold transition ${
                  loading
                    ? "bg-gray-400"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/admin/rooms")}
                className="flex-1 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
              >
                ยกเลิก
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}

export default EditRoom;