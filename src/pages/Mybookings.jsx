import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // เพิ่ม navigate เพื่อความปลอดภัย
import NavbarUser from "../components/user/NavbarUser";
import NavbarAdmin from "../components/admin/Navberadmin"; // เช็คชื่อไฟล์ Navber vs Navbar ด้วยนะครับ
import SidebarUser from "../components/user/SidebarUser";
import SidebarAdmin from "../components/admin/SidebarAdmin";
import { jwtDecode } from "jwt-decode";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const userRole = localStorage.getItem("role");

        // ถ้าไม่มี token ให้กลับไปหน้า login
        if (!token) {
            navigate("/login");
            return;
        }

        setRole(userRole);
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/bookings/my-bookings`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();

            if (!res.ok) {
                console.error(data);
                setBookings([]);
                return;
            }

            setBookings(data);
        } catch (err) {
            console.error("fetchBookings error:", err);
            setBookings([]);
        }
    };

    const handleCheckOut = async (roomId) => {
        if (!confirm("คุณต้องการย้ายออกจากห้องนี้หรือไม่?")) return;

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/bookings/check-out`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ roomId }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || "ย้ายออกไม่สำเร็จ");
                return;
            }

            alert("ย้ายออกจากห้องเรียบร้อย");
            fetchBookings();
        } catch (err) {
            console.error(err);
            alert("เกิดข้อผิดพลาด");
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* 1. แสดง Sidebar ตาม Role */}
            {role === "ADMIN" ? <SidebarAdmin /> : <SidebarUser />}

            <div className="flex-1 flex flex-col">
                {/* 2. แสดง Navbar ตาม Role */}
                {role === "ADMIN" ? <NavbarAdmin /> : <NavbarUser />}

                {/* 3. เนื้อหาหลัก (เพิ่ม pt-24 เพื่อไม่ให้ Navbar ทับ) */}
                <div className="p-6 pt-24">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800">📄 รายงานการจองของฉัน</h1>

                    {bookings.length === 0 ? (
                        <div className="bg-white p-10 rounded-xl shadow text-center text-gray-500">
                            ยังไม่มีข้อมูลการจอง
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {bookings
                                .filter((b) => {
                                    // 1. กรองเอาเฉพาะรายการที่วันที่ย้ายออก (checkOutDate) เป็น null หรือไม่มีค่า
                                    // 2. และสถานะห้องพักควรจะเป็น 'OCCUPIED' หรือ 'เต็ม'
                                    return b.checkOutDate === null && (b.room?.status === "OCCUPIED" || b.room?.status === "เต็ม");
                                })
                                .map((b) => (
                                    <div key={b.id} className="bg-white p-4 rounded shadow border-l-4 border-blue-500">
                                        <h2 className="text-lg font-semibold">
                                            ห้อง {b.room?.room_number || b.room?.roomNo}
                                        </h2>
                                        {/* รายละเอียดอื่นๆ */}
                                        <p>วันที่เข้าอยู่: {new Date(b.checkInDate).toLocaleDateString('th-TH')}</p>

                                        {/* ปุ่มย้ายออก */}
                                        <button
                                            onClick={() => handleCheckOut(b.room.id)}
                                            className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
                                        >
                                            แจ้งย้ายออกจากห้อง
                                        </button>
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyBookings;