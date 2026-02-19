import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-[#b8ada6] text-white shadow-lg">
      <div className="w-full px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="text-xl font-bold flex items-center gap-2 font-anuphan">
            <i className="bi bi-database-fill"></i>
            Dormitory
          </Link>


          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <Link
              to="/add-room"
              className="px-4 py-2 rounded-lg border border-white hover:bg-white hover:text-purple-600 transition font-medium" style={{ fontFamily: "Anuphan" }}
            >
              เพิ่มห้อง
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 rounded-lg border border-white hover:bg-white hover:text-purple-600 transition font-medium" style={{ fontFamily: "Anuphan" }}
            >
              ดูสมาชิก
            </Link>
          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar
