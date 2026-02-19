import React, { useState } from "react";

const AddRoom = () => {
  const [roomNo, setRoomNo] = useState("");
  const [roomType, setRoomType] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ roomNo, roomType, price });
    alert("บันทึกข้อมูลห้องเรียบร้อย");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">เพิ่มห้องพัก</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="รหัสห้อง"
          className="border p-2 w-full"
          onChange={(e) => setRoomNo(e.target.value)}
        />

        <select
          className="border p-2 w-full"
          onChange={(e) => setRoomType(e.target.value)}
        >
          <option value="">เลือกประเภทห้อง</option>
          <option value="คู่ชาย">คู่ชาย</option>
          <option value="คู่หญิง">คู่หญิง</option>
          <option value="รวมชาย">รวมชาย</option>
          <option value="รวมหญิง">รวมหญิง</option>
        </select>

        <input
          type="number"
          placeholder="ราคา"
          className="border p-2 w-full"
          onChange={(e) => setPrice(e.target.value)}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          บันทึก
        </button>
      </form>
    </div>
  );
};

export default AddRoom;
