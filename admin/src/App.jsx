import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { Routes, Route } from 'react-router-dom'
import Dashboard from "./pages/Dashboard"
import Add from "./pages/Add"
import List from "./pages/List"
import Orders from "./pages/Orders"
import Analytics from "./pages/Analytics"
import Settings from "./pages/Settings"
import { useEffect, useState } from "react"
import Login from "./components/Login"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = "₹";

function App() {

  const [token, setToken] = useState(localStorage.getItem("adminToken") ? localStorage.getItem("adminToken") : "");

  useEffect(() => {
    localStorage.setItem("adminToken", token);
  }, [token])


  return (
    <div className=" min-h-screen">
      <ToastContainer />

      {token === "" ? <Login setToken={setToken} /> : <>
        <Navbar setToken={setToken} />
        <hr className="text-gray-300" />
        <div className="bg-white min-h-screen flex">
          <Sidebar />
          <div className="ml-[18%] w-[82%] p-2 md:p-8 text-gray-600 text-base">

            <Routes>
              <Route path="/" element={<Dashboard token={token} />} />
              <Route path="/add" element={<Add token={token} />} />
              <Route path="/list" element={<List token={token} />} />
              <Route path="/orders" element={<Orders token={token} />} />
              <Route path="/analytics" element={<Analytics token={token} />} />
              <Route path="/settings" element={<Settings token={token} />} />
            </Routes>
          </div>

        </div>
      </>
      }

    </div>
  )
}

export default App
