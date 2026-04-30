import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Shirt,
  Sparkles,
  UsersRound,
  Search,
  Loader2,
  ShoppingCart,
  Box,
  PackageCheck,
  User,
} from "lucide-react";
import { useSearch } from "../context/SearchContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTeesDropdown, setShowTeesDropdown] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);

  const teesRef = useRef(null);
  const productRef = useRef(null);
  const accountRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const { searchTerm, setSearchTerm, searching, searchProducts } = useSearch();
  const { cart } = useCart();
  const { user, logout, version } = useAuth();


  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    setShowTeesDropdown(false);
    setShowProductDropdown(false);
    setShowAccountDropdown(false);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    searchProducts(searchTerm);
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!teesRef.current?.contains(e.target)) setShowTeesDropdown(false);
      if (!productRef.current?.contains(e.target)) setShowProductDropdown(false);
      if (!accountRef.current?.contains(e.target)) setShowAccountDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 👇 Sync currentUser whenever login/logout happens
  useEffect(() => {
    const updateUser = () => {
      setCurrentUser(user);
    };

    updateUser(); // Initial set
    window.addEventListener("user-updated", updateUser);
    return () => window.removeEventListener("user-updated", updateUser);
  }, [user]);

  return (
    <>
      {searching && (
        <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
          <Loader2 size={48} className="text-blue-500 animate-spin" />
        </div>
      )}

      <nav className="bg-[#800000] text-white shadow-md px-6 py-3 sticky top-0 z-40 transition-all duration-300">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
          <Link to="/" className="flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
            <img src="/logo.jpg" alt="Your Brand" className="w-32 h-11 object-contain rounded-[20px] shadow-md" />
            <span className="text-xs tracking-wide text-gray-200 mt-1 font-bold">
              Shree Clothing Cue
            </span>
          </Link>

          <div className="flex-grow flex justify-center md:justify-end">
            <div className="flex w-full md:w-[60%] rounded-full overflow-hidden border border-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search for style..."
                className="flex-grow px-4 py-2 text-sm text-black focus:outline-none"
              />
              <button
                onClick={handleSearch}
                className="bg-white hover:bg-gray-100 text-[#800000] px-4 py-2 text-sm font-medium transform hover:scale-105 transition-all duration-200"
              >
                <Search size={16} />
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-[#f3f3f3] transition-colors duration-200 relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>

            <div className="relative" ref={teesRef}>
              <button
                onClick={() => {
                  setShowTeesDropdown((prev) => !prev);
                  setShowProductDropdown(false);
                }}
                className="flex items-center gap-1 hover:text-[#f3f3f3]"
              >
                Custom Tees <ChevronDown size={16} />
              </button>

              {showTeesDropdown && (
                <div className="absolute top-10 left-0 bg-[#800000] shadow-lg rounded-md p-4 space-y-2 z-50 w-48 text-white animate-fadeIn">
                  <Link to="/men" onClick={handleLinkClick} className="flex items-center gap-2 hover:text-[#f3f3f3] transform hover:translate-x-2 transition-all duration-200">
                    <Shirt size={18} /> Men
                  </Link>
                  <Link to="/women" onClick={handleLinkClick} className="flex items-center gap-2 hover:text-[#f3f3f3] transform hover:translate-x-2 transition-all duration-200">
                    <Sparkles size={18} /> Women
                  </Link>
                  <Link to="/unisex" onClick={handleLinkClick} className="flex items-center gap-2 hover:text-[#f3f3f3] transform hover:translate-x-2 transition-all duration-200">
                    <UsersRound size={18} /> Unisex
                  </Link>
                </div>
              )}
            </div>

            <div className="relative" ref={productRef}>
              <button
                onClick={() => {
                  setShowProductDropdown((prev) => !prev);
                  setShowTeesDropdown(false);
                }}
                className="flex items-center gap-1 hover:text-[#f3f3f3]"
              >
                Custom Products <ChevronDown size={16} />
              </button>

              {showProductDropdown && (
                <div className="absolute top-10 left-0 bg-[#800000] shadow-lg rounded-md p-4 space-y-2 z-50 w-48 text-white animate-fadeIn">
                  <Link to="/cup" onClick={handleLinkClick} className="flex items-center gap-2 hover:text-[#f3f3f3] transform hover:translate-x-2 transition-all duration-200">
                    <Box size={18} /> Custom T-shirts
                  </Link>
                  <Link to="/bottles" onClick={handleLinkClick} className="flex items-center gap-2 hover:text-[#f3f3f3] transform hover:translate-x-2 transition-all duration-200">
                    <Box size={18} /> Cup & Bottles
                  </Link>
                  <Link to="/custom-tshirts" onClick={handleLinkClick} className="flex items-center gap-2 hover:text-[#f3f3f3] transform hover:translate-x-2 transition-all duration-200">
                    <PackageCheck size={18} /> Frame
                  </Link>
                  <Link to="/kitchen" onClick={handleLinkClick} className="flex items-center gap-2 hover:text-[#f3f3f3] transform hover:translate-x-2 transition-all duration-200">
                    <Box size={18} /> Kitchen
                  </Link>
                  <Link to="/cap" onClick={handleLinkClick} className="flex items-center gap-2 hover:text-[#f3f3f3] transform hover:translate-x-2 transition-all duration-200">
                    <PackageCheck size={18} /> Cap
                  </Link>
                </div>
              )}
            </div>

            <Link to="/about" className="hover:text-[#f3f3f3] transition-colors duration-200 relative group">
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative hover:text-[#f3f3f3] transform hover:scale-110 transition-all duration-200">
              <ShoppingCart size={22} />
              {cart?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                  {cart.length}
                </span>
              )}
            </Link>

            <div className="relative" ref={accountRef}>
              <button
                onClick={() => setShowAccountDropdown((prev) => !prev)}
                className="hover:text-[#f3f3f3] transform hover:scale-110 transition-all duration-200"
              >
                <User size={22} />
              </button>

              {showAccountDropdown && (
                <div className="absolute right-0 top-10 bg-[#800000] shadow-lg rounded-md p-4 space-y-2 z-50 w-36 text-white animate-fadeIn">
                  {currentUser ? (
                    <>
                      <Link to="/myaccount" onClick={handleLinkClick} className="hover:text-[#f3f3f3] block transform hover:translate-x-2 transition-all duration-200">
                        My Account
                      </Link>
                      <Link to="/myorders" onClick={handleLinkClick} className="hover:text-[#f3f3f3] block transform hover:translate-x-2 transition-all duration-200">
                        My Orders
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setShowAccountDropdown(false);
                          navigate("/login");
                        }}
                        className="hover:text-[#f3f3f3] w-full text-left transform hover:translate-x-2 transition-all duration-200"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={handleLinkClick} className="hover:text-[#f3f3f3] block transform hover:translate-x-2 transition-all duration-200">
                        Login
                      </Link>
                      <Link to="/register" onClick={handleLinkClick} className="hover:text-[#f3f3f3] block transform hover:translate-x-2 transition-all duration-200">
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden transform hover:scale-110 transition-transform duration-200">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="w-full bg-[#800000] shadow-md p-4 flex flex-col space-y-2 md:hidden z-30 text-white">
            <Link to="/" onClick={handleLinkClick}>Home</Link>
            <Link to="/custom-tshirts" onClick={handleLinkClick}>Custom T-Shirts</Link>
            <Link to="/men" onClick={handleLinkClick}>Men</Link>
            <Link to="/women" onClick={handleLinkClick}>Women</Link>
            <Link to="/unisex" onClick={handleLinkClick}>Unisex</Link>
            <Link to="/about" onClick={handleLinkClick}>About Us</Link>
            <Link to="/cart" onClick={handleLinkClick}>Cart</Link>
            {!currentUser && (
              <>
                <Link to="/login" onClick={handleLinkClick}>Login</Link>
                <Link to="/register" onClick={handleLinkClick}>Register</Link>
              </>
            )}
            {currentUser && (
              <>
                <Link to="/myaccount" onClick={handleLinkClick}>My Account</Link>
                <Link to="/myorders" onClick={handleLinkClick}>My Orders</Link>
                <button onClick={() => { logout(); handleLinkClick(); navigate("/login"); }}>
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
