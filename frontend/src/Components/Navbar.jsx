import { useCart } from "../context/CartContext";
import { FaShoppingCart, FaRegUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { TbPlant } from "react-icons/tb";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { navigate, token, setToken, setCart } = useCart();
  const { cart = [] } = useCart() || {}; // ✅ fallback 
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinkClasses = ({ isActive }) =>
    isActive
      ? "text-green-600 border-b-2 border-green-600 pb-1"
      : "hover:text-green-600 hover:border-b-2 pb-1 transition";

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCart({});
    setIsOpen(false); // Close mobile menu after logout
  };

  const handleMobileLinkClick = () => {
    setIsOpen(false);
  };

  const handleOrdersClick = () => {
    navigate("/orders");
    setIsOpen(false);
  };

  return (
    <nav className="text-gray-700 p-3 shadow-md bg-white fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/"> 
          <h1 className="text-base font-semibold flex gap-2 text-green-700 items-center">
            <TbPlant size={25} className="text-white bg-green-700 p-1 rounded-2xl" />
            Logi Integrated Farm
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 font-medium font-poppins text-sm">
          <NavLink to="/" className={navLinkClasses}>Home</NavLink>
          <NavLink to="/about" className={navLinkClasses}>About</NavLink>
          <NavLink to="/farm" className={navLinkClasses}>Our Farm</NavLink>
          <NavLink to="/agriculture" className={navLinkClasses}>Agriculture</NavLink>
          <NavLink to="/products" className={navLinkClasses}>Products</NavLink>
          <NavLink to="/visit" className={navLinkClasses}>Visit Us</NavLink>
          <NavLink to="/contact" className={navLinkClasses}>Contact</NavLink>
        </div>

        {/* Top bar icons */}
        <div className="flex gap-6 items-center">
          {/* Shopping Cart */}
          {token && (
            <div className="relative group hidden md:block">
              <NavLink to="/cart">
                <FaShoppingCart
                  size={25}
                  className="text-green-700 p-1 rounded-2xl border-2 cursor-pointer"
                />
                {/* ✅ Cart Badge */}
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            </div>
          )}

          {/* User Login / Logout Dropdown */}
          <div className="relative group">
            <button className="flex items-center">
              <FaRegUser
                size={25}
                className="p-1 rounded-2xl border-2 text-green-700 cursor-pointer"
              />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-3.5 w-28 bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
              {token ? (
                <>
                  <button
                    onClick={logout}
                    className="block w-full text-center px-3 py-2 hover:bg-green-700 hover:text-white"
                  >
                    Logout
                  </button>
                  <button 
                    onClick={() => navigate("/orders")}
                    className="block w-full text-center px-3 py-2 text-green-700 hover:bg-green-700 hover:text-white"
                  >
                    Orders
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block px-3 py-2 text-center text-green-700 hover:bg-green-700 hover:text-white"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden min-h-screen flex flex-col gap-4 mt-4 text-lg bg-white shadow-md p-4">
          {/* Regular Navigation Links */}
          <NavLink to="/" className={navLinkClasses} onClick={handleMobileLinkClick}>Home</NavLink>
          <NavLink to="/about" className={navLinkClasses} onClick={handleMobileLinkClick}>About</NavLink>
          <NavLink to="/farm" className={navLinkClasses} onClick={handleMobileLinkClick}>Our Farm</NavLink>
          <NavLink to="/agriculture" className={navLinkClasses} onClick={handleMobileLinkClick}>Agriculture</NavLink>
          <NavLink to="/products" className={navLinkClasses} onClick={handleMobileLinkClick}>Products</NavLink>
          <NavLink to="/visit" className={navLinkClasses} onClick={handleMobileLinkClick}>Visit Us</NavLink>
          <NavLink to="/contact" className={navLinkClasses} onClick={handleMobileLinkClick}>Contact</NavLink>
          
          {/* Cart Link for Mobile */}
          {token && (
            <NavLink to="/cart" onClick={handleMobileLinkClick} className="flex items-center gap-2 text-green-700">
              Shopping Cart <FaShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="ml-1 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </NavLink>
          )}

          {/* Authentication Links for Mobile */}
          <div className="border-t border-gray-300 pt-4 mt-2">
            {token ? (
              <>
                <button 
                  onClick={handleOrdersClick}
                  className="block w-full text-left py-2 text-green-700 hover:text-green-800 font-medium"
                >
                  My Orders
                </button>
                <button 
                  onClick={logout}
                  className="block w-full text-left py-2 text-green-700 hover:text-green-800 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink 
                to="/login" 
                className="block py-2 text-green-700 hover:text-green-800 font-medium" 
                onClick={handleMobileLinkClick}
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;