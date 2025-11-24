
import { Link } from "react-router-dom";
import { TbPlant } from "react-icons/tb";
import { IoLogOut } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";


const Navbar = ({setToken}) => {
  return (
    <nav className="w-full bg-white fixed top-0 left-0  z-50 text-white flex items-center justify-between px-6 py-2 shadow-md">
      {/* Left Logo */}
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <TbPlant size={28} className="text-white bg-green-700 p-1 rounded-2xl" />
          <h1 className="text-lg font-semibold text-green-500 hidden md:block">Logi Integrated Farm</h1>
        </Link>
      </div>

     

      {/* Right Side Icons */}
      <div className="flex items-center gap-5">
        <button className="flex items-center gap-2 text-gray-300 hover:text-white transition">
          
          
        </button>

        <IoMdNotifications  size={22} className="text-gray-600 hover:text-green-600 cursor-pointer" />


        {/* Logout Button */}
        <button
          className="flex items-center gap-2 cursor-pointer bg-green-700 hover:bg-green-600 px-3 py-2 rounded-lg text-white text-sm font-medium"
          onClick={() => setToken("")}   
        >
          <IoLogOut size={18}  />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
