import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [openRoom, setOpenRoom] = useState(false);
  const [openDouble, setOpenDouble] = useState(false); // ห้องคู่
  const [openGroup, setOpenGroup] = useState(false);   // ห้องรวม

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-20 left-4 z-50 bg-gray-700 text-white p-2 rounded-md"
      >
        ☰
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
        <div className="p-4 font-bold border-b">Dormitory</div>

        <ul className="p-4 space-y-3">

          <li>
            <Link to="/" className="block bg-gray-200 text-black px-4 py-2 rounded">
              หน้าหลัก
            </Link>
          </li>

          <li>
            <button
              onClick={() => setOpenRoom(!openRoom)}
              className="w-full flex justify-between bg-gray-200 text-black px-4 py-2 rounded"
            >
              ประเภทห้อง
              <span>{openRoom ? "▲" : "▼"}</span>
            </button>

            {openRoom && (
              <ul className="ml-3 mt-2 space-y-2">

                {/* ห้องคู่ */}
                <li>
                  <button
                    onClick={() => setOpenDouble(!openDouble)}
                    className="w-full flex justify-between bg-gray-100 text-black px-4 py-2 rounded"
                  >
                    🏠 ห้องคู่
                    <span>{openDouble ? "▲" : "▼"}</span>
                  </button>

                  {openDouble && (
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
                    <span>{openGroup ? "▲" : "▼"}</span>
                  </button>

                  {openGroup && (
                    <ul className="ml-6 mt-2 space-y-2">
                      <li>
                        <Link to="/double-room-male" className="block bg-white text-black px-4 py-2 rounded">
                          ห้องรวมชาย
                        </Link>
                      </li>
                      <li>
                        <Link to="/double-room-female" className="block bg-white text-black px-4 py-2 rounded">
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
      </div>
    </>
  );
};

export default Sidebar;
