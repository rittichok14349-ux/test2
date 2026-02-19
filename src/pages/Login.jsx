import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username: formData.username,
        password: formData.password
      })

      alert("เข้าสู่ระบบสำเร็จ 🎉")

      // ถ้ามี token (optional)
      localStorage.setItem("token", res.data.token)

      navigate("/") // ไปหน้า Home

    } catch (error) {
      alert(error.response?.data?.message || "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">
          เข้าสู่ระบบ
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-1 font-medium">ชื่อผู้ใช้</label>
            <input
              type="text"
              name="username"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">รหัสผ่าน</label>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition font-semibold"
          >
            เข้าสู่ระบบ
          </button>
        </form>

        <p className="text-center mt-4">
          ยังไม่มีบัญชี?{" "}
          <Link to="/register" className="text-purple-600 font-semibold hover:underline">
            สมัครสมาชิก
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login
