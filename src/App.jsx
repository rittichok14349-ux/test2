import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AdminHome from './pages/admin/AdminHome';
import Members from './pages/admin/Members';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import MaleDormRoom from "./pages/DoubleRoomMale";
import FemaleDormRoom from "./pages/DoubleRoomFemale";
import MaleRoom from './pages/MaleRoom';
import FemaleRoom from './pages/FemaleRoom';
import RoomDetail from "./pages/RoomDetail";
import AddRoom from "./pages/admin/AddRoom";
import HomeUser from "./pages/user/HomeUser";
import AdminRooms from "./pages/admin/AdminRooms";
import EditRoomAdmin from "./pages/admin/EditRoomAdmin";
import DetailRoomAdmin from "./pages/admin/DetailRoomAdmin";
import BookingPage from "./pages/Booking";
import Profile from "./pages/Profile";  

const App = () => {
  return (
    <>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-100">
          {/* <Navbar /> */}

          <main className="flex-grow">
            <Routes>
              <Route path="/admin/home" element={<AdminHome />} />
              <Route path="/home" element={<Home />} />
              <Route path="/home-user" element={<HomeUser />} />
              <Route path="/" element={<Home />} />
              <Route path="/members" element={<Members />} />
              <Route path="/register" element={<Register />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/double-room-male" element={<MaleDormRoom />} />
              <Route path="/double-room-female" element={<FemaleDormRoom />} />
              <Route path="/male" element={<MaleRoom />} />
              <Route path="/female" element={<FemaleRoom />} />
              <Route path="/room/:id" element={<RoomDetail />} />
              <Route path="/add-room" element={<AddRoom />} />
              <Route path="/admin/rooms" element={<AdminRooms />} />
              <Route path="/admin/rooms/edit/:id" element={<EditRoomAdmin />} />
              <Route path="/admin/rooms/:id" element={<DetailRoomAdmin />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="Sidebar" element={<Sidebar />} />




            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App