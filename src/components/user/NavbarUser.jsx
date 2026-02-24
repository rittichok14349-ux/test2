import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavbarUser = () => {
  const location = useLocation();

  // ฟังก์ชันเช็ค Path ปัจจุบันสำหรับทำ UI Active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <Link to="/home-user" className="flex items-center gap-2 group">
            <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-700 transition-colors shadow-sm">
              <i className="bi bi-database-fill text-white text-lg"></i>
            </div>
            <span className="text-xl font-black text-slate-800 tracking-tight font-anuphan">
              Dormitory
            </span>
          </Link>

          {/* Navigation Links for User */}
          <div className="flex items-center space-x-1">
            <Link
              to="/home-user"
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all font-anuphan
                ${isActive('/home') 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}`}
            >
              หน้าแรก
            </Link>

            <Link
              to="/booking"
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all font-anuphan
                ${isActive('/my-booking') 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}`}
            >
              ค้นหาและจองห้องพัก
            </Link>

            {/* ขีดคั่นระหว่างเมนูกับโปรไฟล์ */}
            <div className="h-6 w-[1px] bg-slate-200 mx-2"></div>

            {/* User Profile Avatar */}
            <div className="flex items-center gap-2 pl-2 cursor-pointer group">
              <div className="w-9 h-9 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                <i className="bi bi-person-fill text-lg"></i>
              </div>
              <span className="hidden md:block text-sm font-bold text-slate-700 font-anuphan group-hover:text-indigo-600 transition-colors">
                ผู้ใช้งาน
              </span>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default NavbarUser;