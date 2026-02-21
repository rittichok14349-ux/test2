import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarUser from "../components/user/NavbarUser";
import Sidebar from "../components/Sidebar";

const Profile = () => {
  // 1. รวบรวม State พร้อมค่าเริ่มต้นป้องกัน Error
  const [student, setStudent] = useState({
    student_code: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    faculty: "",
    major: "",
    year: "1",
    address: "",
    profile: "" 
  });

  const [imageFile, setImageFile] = useState(null);
  const [hasProfile, setHasProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/students`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data) {
        // ดักค่า null จาก DB ให้กลายเป็น string ว่างเพื่อป้องกัน Controlled/Uncontrolled warning
        const cleanData = {};
        Object.keys(response.data).forEach(key => {
          cleanData[key] = response.data[key] || "";
        });
        setStudent(cleanData);
        setHasProfile(true);
      }
    } catch (err) {
      console.log("ยังไม่มีข้อมูลนักศึกษาในระบบ");
      setHasProfile(false);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setStudent({ ...student, profile: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;

    const formData = new FormData();
    // เพิ่มข้อมูลลง FormData ตามโครงสร้าง DB
    formData.append("student_code", student.student_code);
    formData.append("first_name", student.first_name);
    formData.append("last_name", student.last_name);
    formData.append("email", student.email);
    formData.append("phone", student.phone);
    formData.append("faculty", student.faculty);
    formData.append("major", student.major);
    formData.append("year", student.year);
    formData.append("address", student.address);
    
    if (imageFile) {
      formData.append("image", imageFile); 
    }

    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      const config = {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}` 
        }
      };

      // ตัดสินใจว่าจะ POST (สร้างใหม่) หรือ PUT (แก้ไข)
      if (hasProfile) {
        await axios.put(`${import.meta.env.VITE_API_URL}/students/${student.student_code}`, formData, config);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/students`, formData, config);
      }

      alert("บันทึกข้อมูลสำเร็จ");
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      alert("เกิดข้อผิดพลาด: " + (error.response?.data?.message || "บันทึกไม่สำเร็จ"));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-20 text-center font-medium">กำลังโหลดข้อมูล...</div>;

  // --- 🎨 ส่วนแสดงผล: โหมดแก้ไข / ลงทะเบียนใหม่ ---
  if (!hasProfile || isEditing) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen pt-24">
        <NavbarUser />
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            {hasProfile ? "📝 แก้ไขโปรไฟล์" : "🎓 ลงทะเบียนนักศึกษา"}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* รูปโปรไฟล์ */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-50 mb-3 shadow-md bg-gray-100 flex items-center justify-center">
                {student.profile ? (
                  <img src={student.profile} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <i className="bi bi-person text-5xl text-gray-300"></i>
                )}
              </div>
              <input type="file" accept="image/*" onChange={handleImageChange} className="text-xs" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputBox label="รหัสนักศึกษา" name="student_code" value={student.student_code} onChange={handleChange} required />
              <InputBox label="เบอร์โทรศัพท์" name="phone" value={student.phone} onChange={handleChange} required />
              <InputBox label="ชื่อจริง" name="first_name" value={student.first_name} onChange={handleChange} required />
              <InputBox label="นามสกุล" name="last_name" value={student.last_name} onChange={handleChange} required />
              <InputBox label="อีเมล" name="email" type="email" value={student.email} onChange={handleChange} />
              <InputBox label="คณะ" name="faculty" value={student.faculty} onChange={handleChange} />
              <InputBox label="สาขาวิชา" name="major" value={student.major} onChange={handleChange} />
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600 mb-1.5">ชั้นปี</label>
                <select 
                  name="year" 
                  value={student.year} 
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="1">ปี 1</option>
                  <option value="2">ปี 2</option>
                  <option value="3">ปี 3</option>
                  <option value="4">ปี 4</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600 mb-1.5">ที่อยู่</label>
                <textarea 
                    name="address" 
                    value={student.address} 
                    onChange={handleChange} 
                    className="w-full border border-gray-200 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-100"
                    rows="3"
                ></textarea>
            </div>

            <div className="flex gap-3 pt-4">
              <button type="submit" disabled={saving} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition disabled:bg-gray-400 shadow-lg shadow-blue-200">
                {saving ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
              </button>
              {hasProfile && (
                <button type="button" onClick={() => setIsEditing(false)} className="px-6 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200">
                  ยกเลิก
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }

  // --- 🎨 ส่วนแสดงผล: โหมดแสดงข้อมูล (UI สวยงาม) ---
  return (<><NavbarUser />
    <div className="p-6 bg-gray-50 min-h-screen pt-24">
        
            <Sidebar />
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card ซ้าย: รูปภาพ */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center h-fit">
            <div className="w-40 h-40 rounded-full border-4 border-blue-50 overflow-hidden shadow-inner mb-4">
              <img 
                src={student.profile || "https://www.w3schools.com/howto/img_avatar.png"} 
                className="w-full h-full object-cover" 
                alt="Profile" 
              />
            </div>
            <h2 className="text-xl font-bold text-gray-800">{student.first_name} {student.last_name}</h2>
            <p className="text-blue-500 font-bold text-sm bg-blue-50 px-4 py-1 rounded-full mt-2 tracking-wide">
              {student.student_code}
            </p>
          </div>

          {/* Card ขวา: รายละเอียด */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-bold text-gray-800">ข้อมูลส่วนตัว</h3>
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-blue-100 transition"
                >
                  <i className="bi bi-pencil-square"></i> แก้ไขข้อมูล
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4">
                <DetailItem label="รหัสนักศึกษา" value={student.student_code} />
                <DetailItem label="เบอร์โทรศัพท์" value={student.phone} />
                <DetailItem label="คณะ" value={student.faculty} />
                <DetailItem label="สาขาวิชา" value={student.major} />
                <DetailItem label="ชั้นปี" value={`ปี ${student.year}`} />
                <DetailItem label="อีเมล" value={student.email} />
              </div>

              <div className="mt-8 pt-8 border-t border-gray-50">
                <DetailItem label="ที่อยู่ปัจจุบัน" value={student.address} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

// --- Components ย่อย ---
const InputBox = ({ label, ...props }) => (
  <div className="flex flex-col">
    <label className="text-sm font-semibold text-gray-600 mb-1.5">{label}</label>
    <input 
      {...props} 
      className="w-full border border-gray-200 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all" 
    />
  </div>
);

const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1.5">{label}</p>
    <p className="text-gray-700 font-semibold">{value || "ไม่ได้ระบุ"}</p>
  </div>
);

export default Profile;