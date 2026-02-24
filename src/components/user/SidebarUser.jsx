import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SidebarUser = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth(); // ✅ ดึง logout จาก context

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    if (window.confirm("คุณต้องการออกจากระบบใช่หรือไม่?")) {
      logout();              // ✅ ลบ token / auth state
      navigate("/login");    // ✅ กลับหน้า login
    }
  };

  const menuClass = (path) => `
    flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold
    ${isActive(path)
      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
      : "hover:bg-slate-800 text-slate-400 hover:text-white"}
  `;

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-[60] bg-indigo-600 text-white p-2.5 rounded-xl shadow-lg hover:bg-indigo-700 transition-all active:scale-95"
      >
        {open ? <i className="bi bi-x-lg"></i> : <i className="bi bi-list"></i>}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-slate-900 text-slate-300 z-50
        transform transition-all duration-300 ease-in-out shadow-2xl
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 mt-14 h-full flex flex-col">

          {/* Brand */}
          <div className="flex items-center gap-3 px-2 mb-8">
            <div className="bg-indigo-500 p-2 rounded-lg">
              <i className="bi bi-building text-white text-xl"></i>
            </div>
            <span className="text-xl font-black text-white">
              Dormitory
            </span>
          </div>

          {/* Menu */}
          <nav className="flex-1 space-y-2">

            <p className="px-4 text-[11px] font-bold text-slate-500 uppercase">
              User Menu
            </p>

            <Link
              to="/my-bookings"
              onClick={() => setOpen(false)}
              className={menuClass("/my-bookings")}
            >
              <i className="bi bi-journal-bookmark-fill"></i>
              รายการจองของฉัน
            </Link>

          </nav>
        </div>

        {/* Logout */}
        <div className="absolute bottom-8 left-0 right-0 px-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-400 border border-red-500/50 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all"
          >
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default SidebarUser;