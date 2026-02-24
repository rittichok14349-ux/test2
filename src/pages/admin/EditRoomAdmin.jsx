import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbaradmin from "../../components/admin/Navberadmin";



function EditRoomAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState({
    roomNo: "",
    roomType: "",
    price: "",
    floor: "",
    description: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRoomById();
  }, []);

  const fetchRoomById = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/rooms/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRoom({
        roomNo: res.data.roomNo || "",
        roomType: res.data.roomType || "",
        price: res.data.price || "",
        floor: res.data.floor || "",
        description: res.data.description || "",
        image: res.data.image || "",
      });
    } catch (error) {
      console.error(error);
      alert("ไม่พบข้อมูลห้อง");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      setRoom({
        ...room,
        image: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("roomNo", room.roomNo);
    formData.append("roomType", room.roomType);
    formData.append("price", Number(room.price));
    formData.append("floor", Number(room.floor));
    formData.append("description", room.description);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    // debug ดูค่าที่ส่งไป
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/rooms/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("แก้ไขข้อมูลห้องสำเร็จ");
      navigate("/admin/rooms");
    } catch (error) {
      console.error("Backend error:", error.response?.data || error.message);
      alert("แก้ไขข้อมูลห้องไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  const imagePreview = room.image
    ? room.image.startsWith("blob:")
      ? room.image
      : `${import.meta.env.VITE_API_URL}/uploads/${room.image}`
    : "/no-image.png";

  return (
    <>
      <Navbaradmin />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            ✏️ แก้ไขข้อมูลห้อง
          </h2>

          <form onSubmit={handleSubmit} className="space-y-7">
            <div className="flex flex-col items-center gap-3">
              <img
                src={imagePreview}
                alt="preview"
                className="w-72 h-44 object-cover rounded-lg shadow border"
              />

              <label className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                เลือกรูปห้อง
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                name="roomNo"
                value={room.roomNo}
                placeholder="รหัสห้อง"
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg"
              />

              <select
                name="roomType"
                value={room.roomType}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">-- เลือกประเภทห้อง --</option>
                <option value="MALE">ห้องชาย</option>
                <option value="FEMALE">ห้องหญิง</option>
              </select>
            </div>

            <input
              type="number"
              name="price"
              value={room.price}
              placeholder="ราคาห้อง"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />

            <input
              type="number"
              name="floor"
              value={room.floor}
              placeholder="ชั้น"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />

            <input
              type="text"
              name="description"
              value={room.description}
              placeholder="รายละเอียด"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-2 rounded-lg text-white ${
                  loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
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

export default EditRoomAdmin;