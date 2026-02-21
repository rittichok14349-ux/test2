import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import NavbarUser from "../components/user/NavbarUser";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

function MaleRoom() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/rooms`)
      .then(async (res) => {
        if (!res.ok) throw new Error("API error " + res.status);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setRooms(data);
        } else {
          setError("ข้อมูลห้องไม่ถูกต้อง");
          setRooms([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("โหลดข้อมูลไม่สำเร็จ", err);
        setError("ไม่สามารถโหลดข้อมูลห้องได้");
        setLoading(false);
      });
  }, []);



  if (loading) return <p className="p-8">กำลังโหลดข้อมูล...</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;

  return (
    <>
      <NavbarUser />

      <div className="flex">
        <Sidebar />

        <div className="p-15 w-full bg-gray-100 min-h-screen">
          <h2 className="text-3xl font-bold mb-9 border-b pb-2">
            ห้องพักแบบคู่ (ชาย)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {rooms.slice(0, 8).map((room) => (
              <div
                key={room.id}
                onClick={() => handleClickRoom(room)}
                className="bg-white border border-gray-300 rounded-xl shadow-md 
                hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer"
              >
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/${room.image}`}
                  alt={room.roomNo}
                  className="w-full h-40 object-cover rounded-t-xl"
                />

                <div className="p-4">
                  <h3 className="text-lg font-bold">ห้อง {room.roomNo}</h3>
                  <p className="text-sm text-gray-600">{room.roomType}</p>
                  <p className="text-green-600 font-semibold mt-2">
                    ราคา {room.price} บาท
                  </p>
                </div>
              </div>
            ))}
          </div>

          {rooms.length === 0 && (
            <p className="mt-4 text-gray-500">ยังไม่มีข้อมูลห้อง</p>
          )}
        </div>
      </div>
    </>
  );
}

export default MaleRoom;
