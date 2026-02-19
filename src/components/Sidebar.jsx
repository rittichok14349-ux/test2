import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
    const [openRoom, setOpenRoom] = useState(false); // state เมนูย่อย
    const [openSingle, setOpenSingle] = useState(false);
  const [openGroup, setOpenGroup] = useState(false);

  return (
    <>
      {/* ปุ่มสามขีด */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-20 left-4 z-50 bg-gray-700 text-white p-2 rounded-md"
      >
        <i className="bi bi-list text-2xl"></i>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo */}
        <div className="p-4 flex items-center gap-2 border-b border-gray-600">
          <i className="bi bi-building text-xl"></i>
          <span className="font-bold">Dormitory</span>
        </div>

        {/* Menu */}
        <ul className="p-4 space-y-3">
          <li>
            <Link to="/home"className="flex items-center gap-3 bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300">
              <i className="bi bi-house"></i> หน้าหลัก
            </Link>
          </li>
          
          <li>
            <button
              onClick={() => setOpenRoom(!openRoom)}
              className="w-full flex items-center justify-between gap-3 bg-gray-200 text-black px-1 py-2 rounded hover:bg-gray-300">
            
            <Link className="flex items-center gap-2 bg-gray-200 text-black px-4 py-1 rounded hover:bg-gray-300">
              <i className="bi bi-door-open"></i> ประเภทห้อง
            </Link>
            <i className={`bi ${openRoom ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
            </button>
            {openRoom && (
              <ul className="ml-3 mt-2 space-y-2">

                                 {/* ห้องคู่ */}
                <li>
                  <button
                    onClick={() => setOpenSingle(!openSingle)}
                    className="w-full flex justify-between bg-gray-100 text-black px-4 py-2 rounded"
                  >
                    🏠 ห้องคู่
                    <i className={`bi ${openSingle ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                  </button>

                  {openSingle && (
                    <ul className="ml-6 mt-2 space-y-2">
                      <li>
                        <Link to="/male" className="block bg-white text-black px-4 py-2 rounded">
                          ห้องคู่ชาย
                        </Link>
                      </li>
                      <li>
                        <Link to="/female" className="block bg-white text-black px-4 py-2 rounded">
                          ห้องคู่หญิง
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>

                {/* ห้องรวม */}
                <li>
                  <button
                    onClick={() => setOpenGroup(!openGroup)}
                    className="w-full flex justify-between bg-gray-100 text-black px-4 py-2 rounded"
                  >
                    🏢 ห้องรวม
                    <i className={`bi ${openGroup ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                  </button>

                  {openGroup && (
                    <ul className="ml-6 mt-2 space-y-2">
                      <li>
                        <Link to="/double-room-male"className="block bg-white text-black px-4 py-2 rounded">
                          ห้องรวมชาย
                        </Link>
                      </li>
                      <li>
                        <Link to="/double-room-female"className="block bg-white text-black px-4 py-2 rounded">
                          ห้องรวมหญิง
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>

              </ul>
            )}
          </li>
        </ul>
        {/* Logout */}
        <div className="absolute bottom-6 left-4 right-4">
          <button className="w-full bg-gray-200 text-black py-2 rounded hover:bg-gray-300">
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;