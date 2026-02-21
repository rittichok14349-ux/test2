import React, { useState } from "react";
import { Link } from "react-router-dom";

const SidebarUser = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ปุ่ม Hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-20 left-4 z-50 bg-gray-700 text-white p-2 rounded-md transition-all active:scale-90"
      >
        <i className={`bi ${open ? "bi-x-lg" : "bi-list"} text-2xl`}></i>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white z-50
        transform transition-transform duration-300 ease-in-out shadow-2xl
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo */}
        <div className="p-6 flex items-center gap-3 border-b border-gray-700">
          <i className="bi bi-building-fill text-2xl text-blue-400"></i>
          <span className="font-bold text-xl tracking-wide">Dormitory</span>
        </div>

        {/* Menu Items */}
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
  <Link to="/profile" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors">
    <i className="bi bi-person-circle"></i> โปรไฟล์
  </Link>
</li>
            <li>
              <Link
                to="/home"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <i className="bi bi-house-door"></i> หน้าหลัก
              </Link>
            </li>

            {/* ยุบทุก "ประเภท" รวมเป็นเมนูเดียว */}
            <li>
              <Link
                to="/booking" 
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors"
              >
                <i className="bi bi-search"></i> ค้นหาและจองห้องพัก
              </Link>
            </li>

            <li>
              <Link
                to="/my-bookings"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <i className="bi bi-journal-check"></i> รายการจองของฉัน
              </Link>
            </li>

            <li>
              <Link
                to="/payment"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <i className="bi bi-credit-card"></i> แจ้งชำระเงิน
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout (วางไว้ด้านล่าง) */}
        <div className="absolute bottom-8 left-0 right-0 px-4">
          <button className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-400 border border-red-500/50 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all">
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default SidebarUser;