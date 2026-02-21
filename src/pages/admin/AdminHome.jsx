import React from 'react'
import Sidebar from "../../components/Sidebar"
import Navbaradmin from "../../components/admin/Navberadmin"

const Home = () => {
    return (
        // ใช้ flex เพื่อให้ Sidebar อยู่ซ้าย และเนื้อหาที่เหลืออยู่ขวา
        <div className="flex min-h-screen"> 
            <Sidebar />

            {/* ส่วนเนื้อหาหลัก (Main Content Area) */}
            <div className="flex-1 flex flex-col min-h-screen relative bg-cover bg-center"
                 style={{ backgroundImage: "url('/image/LogoHome1.png')" }}
            >
                {/* Navbar อยู่ด้านบนสุดของฝั่งเนื้อหา */}
                <Navbaradmin />

                {/* เนื้อหาอื่นๆ หรือกล่องข้อความ */}
                <div className="flex-1 relative">
                    {/* กล่องข้อความด้านล่าง */}
                    <div className="absolute bottom-10 left-10"> 
                        <div className="bg-white/30 px-10 py-4 rounded-xl shadow-lg backdrop-blur-sm">
                            <h1 className="text-5xl md:text-6xl font-bold text-[#f5f0dc] drop-shadow-lg text-center" 
                                style={{ fontFamily: "Anuphan" }}>
                                หอพักนักศึกษา (ภายในวิทยาลัย)
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home