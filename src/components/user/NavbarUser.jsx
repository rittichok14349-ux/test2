import React from 'react'
import { Link } from 'react-router-dom'

const NavbarUser = () => {
  return (
    <nav className="bg-[#b8ada6] text-white shadow-lg">
      <div className="w-full px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="text-xl font-bold flex items-center gap-2 font-anuphan">
            <i className="bi bi-database-fill"></i>
            Dormitory
          </Link>



        </div>
      </div>
    </nav>
  )
}

export default NavbarUser
