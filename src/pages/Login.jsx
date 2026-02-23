import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService.js";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData.email, formData.password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ ตรวจว่ามี user จริงไหม
      if (!data || !data.user) {
        alert("ไม่พบข้อมูลผู้ใช้");
        navigate("/login");
        return;
      }

      login(data); // เก็บ token + user ลง context

      alert("เข้าสู่ระบบสำเร็จ 🎉");

      // ✅ แยก role
      if (data.user.role === "ADMIN") {
        navigate("/admin/home");
      } else if (data.user.role === "USER") {
        navigate("/home-user");
      } else {
        // กรณี role ผิดปกติ
        navigate("/login");
      }

    } catch (error) {
      console.error(error);
      alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">
          เข้าสู่ระบบ
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition font-semibold"
          >
            เข้าสู่ระบบ
          </button>
        </form>

        <p className="text-center mt-4">
          ยังไม่มีบัญชี?{" "}
          <Link
            to="/register"
            className="text-purple-600 font-semibold hover:underline"
          >
            สมัครสมาชิก
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
