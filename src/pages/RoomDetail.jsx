import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavbarUser from "../components/user/NavbarUser";
import SidebarUser from "../components/user/SidebarUser";
import { jwtDecode } from "jwt-decode";

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const token = localStorage.getItem("token");


  const decoded = token ? jwtDecode(token) : null;
const userId = decoded?.userId;
  // console.log("decoded token:", decoded);
  // console.log("userId:", userId);
  // console.log("roomId:", room?.id);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/rooms/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setRoom(data))
      .catch((err) => console.error(err));
  }, [id]);

  const roomTypeThai = (type) => {
    switch (type) {
      case "MALE":
        return "หอชาย";
      case "FEMALE":
        return "หอหญิง";
      case "MIX":
        return "หอรวม";
      default:
        return type;
    }
  };
  const handleCheckIn = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/bookings/check-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          roomId: room.id,
          userId: userId // ✅ ส่ง userId ให้ controller
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "จองห้องไม่สำเร็จ");
        return;
      }

      alert("จองห้องสำเร็จ");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาด");
    }
  };

  if (!room) return <p className="text-center mt-10">Loading...</p>;
  const isAvailable = room.status === "AVAILABLE";

  console.log(room);
  return (
    <>
      <NavbarUser />

      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <SidebarUser />

        {/* Content */}
        <div className="flex-1 flex justify-center items-center p-6">
          <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6">

            {/* Image */}
            <div>
              {room.image ? (
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/${room.image}`}
                  alt={`Room ${room.roomNo}`}
                  className="w-full h-72 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-72 bg-gray-200 flex items-center justify-center rounded-lg">
                  <span className="text-gray-500">ไม่มีรูปภาพ</span>
                </div>
              )}
            </div>

            {/* Detail */}
            <div className="space-y-3">
              <h1 className="text-2xl font-bold">ห้อง {room.roomNo}</h1>

              <p className="text-lg text-green-600 font-semibold">
                ราคา: {room.price} บาท / เดือน
              </p>

              <p>
                <span className="font-semibold">สถานะ:</span>{" "}
                <span
                  className={`px-2 py-1 rounded text-white text-sm ${room.status === "AVAILABLE"
                    ? "bg-green-500"
                    : "bg-red-500"
                    }`}
                >
                  {room.status === "AVAILABLE" ? "ว่าง" : "เต็ม"}
                </span>
              </p>

              <p><span className="font-semibold">ประเภท:</span> {roomTypeThai(room.roomType)}</p>
              <p><span className="font-semibold">ชั้น:</span> {room.floor}</p>

              <p className="text-gray-600">
                <span className="font-semibold">รายละเอียด:</span><br />
                {room.description || "ไม่มีรายละเอียด"}
              </p>

              {/* Buttons */}<div className="pt-4 flex gap-3">
                <div className="pt-4 flex gap-3">
                  <button
                    disabled={!isAvailable}
                    onClick={handleCheckIn}
                    className={`px-5 py-2 rounded-lg font-medium transition-all
      ${isAvailable
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                  >
                    {isAvailable ? "จองห้อง" : "ห้องเต็ม"}
                  </button>

                  <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-300 hover:bg-gray-400 px-5 py-2 rounded-lg"
                  >
                    กลับ
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetail;