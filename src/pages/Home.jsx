import React from 'react'
import Sidebar from "../components/Sidebar"
// แก้ไข Path ให้ตรงกับโฟลเดอร์จริง (สมมติว่า Navbar อยู่ที่เดียวกับ Sidebar)
import Navbar from "../components/Navbar" 

const Home = () => {
  return (
    <div className="flex min-h-screen"> {/* เพิ่ม flex ตรงนี้เพื่อให้ Sidebar กับ Content อยู่ข้างกัน */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 min-h-screen relative bg-cover bg-center"
        style={{ backgroundImage: "url('/image/LogoHome1.png')" }}
      >
        {/* เรียกใช้ Navbar ตรงนี้ */}
        <Navbar />

        {/* กล่องข้อความด้านล่าง */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-start pb-1 pl-64">
          <div className="bg-white/30 px-10 py-4 rounded-xl shadow-lg">
            <h1 className="text-5xl md:text-6xl font-bold text-[#f5f0dc] drop-shadow text-center" style={{ fontFamily: "Anuphan" }}>
              หอพักนักศึกษา (ภายในวิทยาลัย)
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home