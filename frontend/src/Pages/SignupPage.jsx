import { FaUserPlus, FaRegUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState,useEffect } from "react";
import axios from "axios";
import {toast} from "react-toastify";

export default function CreateAccount() {
  const { token, setToken, navigate, backendUrl } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!name || !email || !password) {
        toast.error("All fields are required");
        return;
      }

      const response = await axios.post(`${backendUrl}/api/user/signup`, {
        name,
        email,
        password,
      });
      
      

      if (response.data.success) {
        toast.success("Account created successfully");
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        
      } else {
        toast.error(response.data.message || "Signup failed");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong. Please try again.");
    }
  };

   useEffect(()=>{
    if(token){
      navigate("/")
    }
   },[token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 md:py-20">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center ">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-100">
            <FaRegUser size={20} className="text-green-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>
        <p className="text-center text-gray-600">
          Join us to start shopping for fresh farm products
        </p>

        <form onSubmit={submitHandler} className="space-y-5 mt-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center cursor-pointer justify-center gap-2 bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition shadow-md"
          >
            <FaUserPlus />
            Create Account
          </button>

          <p className="flex justify-center text-gray-700">
            Do you have an account?{" "}
            <NavLink
              to="/login"
              className="text-green-600 font-medium hover:underline ml-1"
            >
              Login
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}
