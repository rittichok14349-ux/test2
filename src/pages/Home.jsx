import React from 'react'
import Sidebar from "../components/Sidebar"

const Home = () => {
  return (
<div className="min-h-screen">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/image/LogoHome1.png')" }}
      >


{/* กล่องข้อความด้านล่าง */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-start pb-1 pl-65">
          <div className="bg-white/30 px-10 py-4 rounded-xl shadow-lg">
            <h1 className="text-5xl md:text-6xl font-bold text-[#f5f0dc] drop-shadow text-center "style={{ fontFamily: "Anuphan" }}>
              หอพักนักศึกษา (ภายในวิทยาลัย)
            </h1>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home
