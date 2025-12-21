import { FaRegUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const { token, setToken, navigate, backendUrl } = useCart();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "tokenExpiry",
          Date.now() + 24 * 60 * 60 * 1000 // 1 day
        );
        setToken(response.data.token);

        toast.success("Login successful");
      } else {
        toast.error(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please try again.");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
              className="w-full px-4 py-2 border rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Enter your password"
                className="w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                {showPassword ? (
                  <FaEyeSlash size={16} />
                ) : (
                  <FaEye size={16} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 cursor-pointer rounded-md hover:bg-green-700 transition shadow-md font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-gray-700">
          <p className="flex justify-center items-center">
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