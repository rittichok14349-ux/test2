import { useEffect, useState } from "react";
import NavbarUser from "../components/user/NavbarUser";
import SidebarUser from "../components/user/SidebarUser";
import { jwtDecode } from "jwt-decode";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const token = localStorage.getItem("token");

    const decoded = token ? jwtDecode(token) : null;
    const userId = decoded?.userId;
    useEffect(() => {
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
            fetchBookings(); // โหลดรายการใหม่
        } catch (err) {
            console.error(err);
            alert("เกิดข้อผิดพลาด");
        }
    };

    return (
        <>
            <NavbarUser />
            <div className="flex min-h-screen bg-gray-100">
                <SidebarUser />

                <div className="flex-1 p-6">
                    <h1 className="text-2xl font-bold mb-6">📄 รายงานการจองของฉัน</h1>

                    {bookings.length === 0 ? (
                        <p>ยังไม่มีข้อมูลการจอง</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {bookings
                                .filter((b) => b.checkOutDate === null) // ⭐ แสดงเฉพาะที่ยังจองอยู่
                                .map((b) => (
                                    <div key={b.id} className="bg-white p-4 rounded shadow">
                                        <h2 className="text-lg font-semibold">
                                            ห้อง {b.room.roomNo}
                                        </h2>

                                        <p>ประเภท: {b.room.roomType}</p>
                                        <p>ราคา: {b.room.price} บาท</p>

                                        <p>
                                            วันที่เข้าอยู่:{" "}
                                            {new Date(b.checkInDate).toLocaleDateString()}
                                        </p>

                                        <p>
                                            วันที่ย้ายออก:{" "}
                                            {b.checkOutDate
                                                ? new Date(b.checkOutDate).toLocaleDateString()
                                                : "ยังไม่ย้ายออก"}
                                        </p>

                                        <p>
                                            สถานะห้อง:{" "}
                                            <span className="font-bold">
                                                {b.room.status}
                                            </span>
                                        </p>

                                        {/* ปุ่มย้ายออก */}
                                        {b.checkOutDate === null && b.room.status === "OCCUPIED" && (
                                            <button
                                                onClick={() => handleCheckOut(b.room.id)}
                                                className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                                            >
                                                ย้ายออกจากห้อง
                                            </button>
                                        )}
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default MyBookings;