import { FaRegUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";

export default function Login() {
  const { token, setToken, navigate, backendUrl } = useCart();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        toast.error("Please enter both email and password");
        return;
      }

      const response = await axios.post(`${backendUrl}/api/user/login`, {
        email,
        password,
      });

      if (response.data.success) {
        toast.success("Login successful");
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        
      } else {
        toast.error(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please try again.");
    }
  };

 useEffect(()=>{
  if(token){
    navigate("/")
  }
 },[token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center ">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-100">
            <FaRegUser size={20} className="text-green-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Sign in to your account to continue shopping
        </p>

        <form onSubmit={SubmitHandler} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md outline-none focus:outline-none"
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
            className="w-full bg-green-600 text-white py-3 cursor-pointer rounded-md hover:bg-green-700 transition shadow-md font-medium"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-gray-700">
          <p className="flex justify-center">
            Don't have an account?{" "}
            <NavLink
              to="/signup"
              className="text-green-600 font-medium hover:underline ml-1"
            >
              Sign up
            </NavLink>
          </p>
          <NavLink
            to="/forgot-password"
            className="block mt-2 text-green-600 text-sm hover:underline"
          >
            Forgot your password?
          </NavLink>
        </div>
      </div>
    </div>
  );
}
