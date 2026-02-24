import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavbarAdmin = () => {
  const location = useLocation();

  // Helper function เพื่อเช็คว่าอยู่ที่หน้านั้นๆ หรือเปล่า (สำหรับทำ Active State)
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo Section */}
          <Link to="/admin/home" className="flex items-center gap-2 group">
            <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-700 transition-colors">
              <i className="bi bi-database-fill text-white text-lg"></i>
            </div>
            <span className="text-xl font-black text-slate-800 tracking-tight font-anuphan">
              Dormitory
            </span>
          </Link>


          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            <Link
              to="/add-room"
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all font-anuphan
                ${isActive('/add-room') 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}`}
            >
              เพิ่มห้อง
            </Link>

            <Link
              to="/admin/rooms"
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all font-anuphan
                ${isActive('/admin/rooms') 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}`}
            >
              ดูห้อง
            </Link>

            <Link
              to="/members"
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all font-anuphan
                ${isActive('/members') 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}`}
            >
              ดูสมาชิก
            </Link>

            {/* ขีดคั่นเล็กน้อย (Optional) */}
            <div className="h-6 w-[1px] bg-slate-200 mx-2"></div>

            {/* โปรไฟล์ Admin (แบบหลอกๆ ให้ดูเต็ม) */}
            <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
              <i className="bi bi-person-circle text-xl"></i>
            </div>
          </div>

        </div>
      </div>
    </nav>
  )
}

export default NavbarAdmin