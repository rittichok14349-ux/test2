import { useState } from "react";
import axios from "axios";
import Navbaradmin from "../../components/admin/Navberadmin";

function AddRoom() {
  const [room, setRoom] = useState({
    roomNo: "",
    roomType: "",
    price: "",
    floor: "",

  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // เปลี่ยนค่า input
  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };


  // เลือกรูป + preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      setRoom({ ...room, image: URL.createObjectURL(file) });
    }
  };

  // บันทึกข้อมูล
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!room.roomNo || !room.roomType || !room.price || !room.floor) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    const token = localStorage.getItem("token");

    // if (!imageFile) {
    //   alert("กรุณาเลือกรูปภาพ");
    //   return;
    // }

    const formData = new FormData();
    formData.append("roomNo", room.roomNo);
    formData.append("roomType", room.roomType);
    formData.append("price", room.price);
    formData.append("floor", room.floor);
    formData.append("image", imageFile); // ✅ สำคัญ



    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/rooms`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("เพิ่มข้อมูลห้องสำเร็จ");

      setRoom({
        roomNo: "",
        roomType: "",
        price: "",
        floor: "",

      });

      setImageFile(null);

    } catch (error) {
      console.error("ADD ROOM ERROR:", error);

      // ถ้ามี message จาก backend
      if (error.response && error.response.data && error.response.data.message) {
        alert("เพิ่มห้องไม่สำเร็จ: " + error.response.data.message);
      } else {
        alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbaradmin />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            ➕ เพิ่มข้อมูลห้อง
          </h2>

          <form onSubmit={handleSubmit} className="space-y-7">

            {/* รูป Preview */}
            <div className="flex flex-col items-center gap-3">

              <img
                src={room.image || "https://via.placeholder.com/300x180"}
                alt="preview"
                className="w-72 h-44 object-cover rounded-lg shadow border"
              />

              {/* ซ่อน input file */}
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
            {/* ✅ เพิ่มตรงนี้ */}


            <div className="flex gap-2">

              <input
                type="roomNo"
                name="roomNo"
                value={room.roomNo}
                placeholder="รหัสห้อง"
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <select
                name="roomType"
                value={room.roomType}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="number"
              name="floor"
              value={room.floor}
              placeholder="ชั้น"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* ปุ่ม */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 py-2 rounded-lg text-white font-semibold transition ${loading
                    ? "bg-gray-400"
                    : "bg-green-600 hover:bg-green-700"
                    }`}
                >
                  {loading ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
                </button>

                <button
                  type="reset"
                  onClick={() =>
                    setRoom({
                      roomNo: "",
                      roomType: "",
                      price: "",
                      floor: "",

                    })
                  }
                  className="flex-1 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                >
                  ล้างข้อมูล
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}

export default AddRoom;