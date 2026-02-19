import { useState } from "react";
import { loginUser } from "../services/authService.js";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(username, password);

      login(data); // เก็บ user ลง context

      if (data.role === "ADMIN") {
        navigate("/admin/home");
      } else {
        navigate("/home");
      }
    } catch (err) {
      alert("Username หรือ Password ไม่ถูกต้อง");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">เข้าสู่ระบบ</h2>

        <input
          type="text"
          placeholder="Username"
          className="border w-full p-2 mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        
        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 rounded text-white font-medium transition ${loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
            }`}
        >
          {loading ? "กำลังบันทึก..." : "บันทึกห้อง"}
        </button>
      </form>
    </div>
  );
};

export default Login;
