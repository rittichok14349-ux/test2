import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Members from './pages/Members';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import DoubleRoomMale from "./pages/DoubleRoomMale";
import DoubleRoomFemale from "./pages/DoubleRoomFemale";
import MaleRoom from './pages/MaleRoom';
import FemaleRoom from './pages/FemaleRoom';
import RoomDetail from "./pages/RoomDetail";  
import AddRoom from "./pages/AddRoom";



const App = () => {
  return (
    <>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Navbar />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/members" element={<Members />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/register" element={<Register />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/double-room-male" element={<DoubleRoomMale />} />
              <Route path="/double-room-female" element={<DoubleRoomFemale />} />
              <Route path="/male" element={<MaleRoom />} />
              <Route path="/female" element={<FemaleRoom />} />
              <Route path="/room/:id" element={<RoomDetail />} />
              <Route path="/add-room" element={<AddRoom />} />
              
              
              
              
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App