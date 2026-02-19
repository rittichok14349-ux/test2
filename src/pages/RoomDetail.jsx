import { useLocation, useNavigate } from "react-router-dom";

function RoomDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const room = location.state;

  if (!room) {
    return <p>ไม่พบข้อมูลห้อง</p>;
  }

  return (
    <div className="p-6">
      <button
        className="mb-4 bg-gray-300 px-4 py-2 rounded"
        onClick={() => navigate(-1)}
      >
        ← กลับ
      </button>

      <img
        src={room.image}
        alt={room.code}
        className="w-full max-w-md rounded-lg mb-4"
      />

      <h2 className="text-2xl font-bold">รหัสห้อง: {room.code}</h2>
      <p>ประเภท: {room.type}</p>
      <p>ราคา: ฿{room.price}</p>
      <p>รายละเอียด: {room.detail}</p>
    </div>
  );
}

export default RoomDetail;
