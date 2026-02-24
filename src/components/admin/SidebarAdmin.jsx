import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarAdmin = () => {
  const [open, setOpen] = useState(false);
  const [openRoomType, setOpenRoomType] = useState(false); // สำหรับยุบ/ขยายประเภทห้อง
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // สไตล์สำหรับเมนูหลัก
  const menuClass = (path) => `
    flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold font-anuphan
    ${isActive(path) 
      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' 
      : 'hover:bg-slate-800 text-slate-400 hover:text-white'}
  `;

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-[60] bg-indigo-600 text-white p-2.5 rounded-xl shadow-lg hover:bg-indigo-700 transition-all active:scale-95"
      >
        {open ? <i className="bi bi-x-lg text-lg"></i> : <i className="bi bi-list text-lg"></i>}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-slate-900 text-slate-300 z-50
        transform transition-all duration-300 ease-in-out shadow-2xl
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 mt-14 h-full flex flex-col">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 px-2 mb-8">
            <div className="bg-indigo-500 p-2 rounded-lg">
              <i className="bi bi-building text-white text-xl"></i>
            </div>
            <span className="text-xl font-black text-white tracking-tight font-anuphan">
              Dormitory
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
            
            <p className="px-4 text-[11px] font-bold text-slate-500 uppercase tracking-[2px] mb-2">Main Menu</p>

            <Link to="/admin/home" onClick={() => setOpen(false)} className={menuClass('/admin/home')}>
              <i className="bi bi-grid-1x2-fill"></i>
              หน้าหลัก
            </Link>

            <Link to="/booking" onClick={() => setOpen(false)} className={menuClass('/search-rooms')}>
              <i className="bi bi-search"></i>
              ค้นหาและจองห้องพัก
            </Link>

            <Link to="/my-bookings" onClick={() => setOpen(false)} className={menuClass('/my-bookings')}>
              <i className="bi bi-journal-bookmark-fill"></i>
              รายการจองของฉัน
            </Link>

            {/* <div className="pt-4 pb-2 border-t border-slate-800/50 mt-4">
               <p className="px-4 text-[11px] font-bold text-slate-500 uppercase tracking-[2px] mb-2">Management</p>
            </div> */}

            {/* เมนูประเภทห้องแบบ Dropdown
            <div>
              <button
                onClick={() => setOpenRoomType(!openRoomType)}
                className="w-full flex justify-between items-center px-4 py-3 rounded-xl hover:bg-slate-800 transition-all text-slate-400 font-bold font-anuphan"
              >
                <div className="flex items-center gap-3">
                  <i className="bi bi-door-closed"></i>
                  ประเภทห้องพัก
                </div>
                <i className={`bi bi-chevron-${openRoomType ? 'down' : 'right'} text-[10px]`}></i>
              </button>

              {openRoomType && (
                <div className="ml-9 mt-1 space-y-1 border-l border-slate-700/50">
                  <Link to="/male" className="block px-4 py-2 text-sm hover:text-indigo-400 transition-colors">ห้องคู่ชาย</Link>
                  <Link to="/female" className="block px-4 py-2 text-sm hover:text-indigo-400 transition-colors">ห้องคู่หญิง</Link>
                  <Link to="/double-room-male" className="block px-4 py-2 text-sm hover:text-indigo-400 transition-colors">ห้องรวมชาย</Link>
                  <Link to="/double-room-female" className="block px-4 py-2 text-sm hover:text-indigo-400 transition-colors">ห้องรวมหญิง</Link>
                </div>
              )}
            </div> */}

          </nav>

          {/* Sidebar Footer - Logout */}
          <div className="mt-auto pt-6 border-t border-slate-800">
            <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-all font-bold font-anuphan active:scale-95">
              <i className="bi bi-box-arrow-right text-lg"></i>
              ออกจากระบบ
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default SidebarAdmin;