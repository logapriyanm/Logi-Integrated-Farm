import { useCart } from "../context/CartContext";
import { FaShoppingCart, FaRegUser, FaHome, FaInfoCircle, FaSeedling, FaLeaf, FaBox, FaMapMarkerAlt, FaPhone, FaSignOutAlt, FaListAlt } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
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
      ? "text-green-600 border-b-2 border-green-600"
      : "text-gray-700 hover:text-green-600 hover:bg-green-50";

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCart({});
    setIsOpen(false);
  };

  const handleMobileLinkClick = () => {
    setIsOpen(false);
  };

  const handleOrdersClick = () => {
    navigate("/orders");
    setIsOpen(false);
  };

  const handleUserIconClick = () => {
    if (!token) {
      navigate("/login");
    }
  };

  // Mobile menu items with icons
  const mobileMenuItems = [
    { to: "/", label: "Home", icon: FaHome },
    { to: "/about", label: "About", icon: FaInfoCircle },
    { to: "/farm", label: "Our Farm", icon: FaSeedling },
    { to: "/agriculture", label: "Agriculture", icon: FaLeaf },
    { to: "/products", label: "Products", icon: FaBox },
    { to: "/visit", label: "Visit Us", icon: FaMapMarkerAlt },
    { to: "/contact", label: "Contact", icon: IoCall },
  ];

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

          {/* User Login / Logout Dropdown - Hidden on mobile when logged in */}
          {(!token || window.innerWidth >= 768) && (
            <div className="relative group">
              <button 
                className="flex items-center"
                onClick={handleUserIconClick}
              >
                <FaRegUser
                  size={25}
                  className="p-1 rounded-2xl border-2 text-green-700 cursor-pointer"
                />
              </button>

              {/* Dropdown Menu - Only show on desktop */}
              <div className="hidden md:block absolute right-0 mt-3.5 w-28 bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
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
          )}

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50">
          <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl flex flex-col">
            {/* Header - Fixed */}
            <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-gray-200 bg-green-50">
              <Link to="/" onClick={handleMobileLinkClick}>
                <h1 className="text-lg font-bold flex gap-2 text-green-700 items-center">
                  <TbPlant size={28} className="text-white bg-green-700 p-1 rounded-2xl" />
                  Logi Integrated Farm
                </h1>
              </Link>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-green-100 transition-colors"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Navigation Links */}
              <div className="py-4">
                <nav className="space-y-1">
                  {mobileMenuItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                          `flex items-center gap-4 px-6 py-4 text-lg font-medium transition-all duration-200 ${isActive
                            ? "text-green-600 bg-green-50 border-r-4 border-green-600"
                            : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                          }`
                        }
                        onClick={handleMobileLinkClick}
                      >
                        <IconComponent size={20} className="flex-shrink-0" />
                        {item.label}
                      </NavLink>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Bottom Section - Fixed (Non-scrollable) */}
            <div className="flex-shrink-0 border-t border-gray-200 bg-gray-50 p-6 space-y-4">
              {/* Shopping Cart for Mobile */}
              {token && (
                <NavLink 
                  to="/cart" 
                  onClick={handleMobileLinkClick}
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <FaShoppingCart size={22} className="text-green-600" />
                      {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </div>
                    <span className="text-lg font-medium text-gray-800">Shopping Cart</span>
                  </div>
                  <div className="text-green-600 font-semibold">{cartCount} items</div>
                </NavLink>
              )}

              {/* Authentication Section */}
              <div className="space-y-2">
                {token ? (
                  <>
                    <button 
                      onClick={handleOrdersClick}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left bg-white rounded-lg border border-gray-200 hover:bg-green-50 hover:border-green-200 transition-colors"
                    >
                      <FaListAlt size={18} className="text-green-600 flex-shrink-0" />
                      <span className="text-lg font-medium text-gray-800">My Orders</span>
                    </button>
                    <button 
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left bg-white rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-colors"
                    >
                      <FaSignOutAlt size={18} className="text-red-500 flex-shrink-0" />
                      <span className="text-lg font-medium text-gray-800">Logout</span>
                    </button>
                  </>
                ) : (
                  <NavLink 
                    to="/login" 
                    onClick={handleMobileLinkClick}
                    className="flex items-center gap-3 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium"
                  >
                    <FaRegUser size={18} className="flex-shrink-0" />
                    Login to Your Account
                  </NavLink>
                )}
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-center text-sm text-gray-500">
                  © 2024 Logi Integrated Farm
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;