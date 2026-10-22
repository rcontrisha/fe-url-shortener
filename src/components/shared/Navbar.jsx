import { useState } from "react";
import { FaBars, FaTimes, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slice/userSlice"; 

function Navbar() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth } = useSelector((state) => state.userState);
  const isAuthenticated = Boolean(auth?.token); 
  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Analytics", href: "/analytics" },
    { name: "Links", href: "/links" },
  ];

  const handleLogout = async () => {
    await dispatch(logout());
    setIsOpen(false);
    navigate("/auth/login");
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 font-inter sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Left Side: Brand & Main Navigation */}
        <div className="flex items-center space-x-10 h-full">
          <Link
            to="/"
            className="text-xl font-extrabold text-black tracking-tight cursor-pointer"
          >
            ShortLink
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex space-x-8 h-full">
            {navLinks.map((link) => {
              const isActive = activeTab === link.name;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setActiveTab(link.name)}
                  className={`inline-flex items-center h-full text-sm font-medium transition-colors relative ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Side Desktop Actions */}
        <div className="hidden md:flex items-center space-x-5">
          {isAuthenticated ? (
            /* Condition 1: Authenticated State */
            <>
              <Link to={"/link/create"} className="flex items-center space-x-2 bg-primary hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer">
                <FaPlus className="w-3 h-3" />
                <span>Create New Link</span>
              </Link>

              {/* User Avatar */}
              <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-gray-200 cursor-pointer">
                <img
                  src={
                    auth?.user?.avatar ||
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                  }
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              <button
                onClick={handleLogout}
                className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors cursor-pointer pl-1"
              >
                Logout
              </button>
            </>
          ) : (
            /* Condition 2: Unauthenticated State */
            <>
              <Link
                to="/auth/login"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              >
                Login
              </Link>

              <Link
                to="/auth/register"
                className="text-sm font-semibold text-white bg-primary hover:bg-blue-700 px-5 py-2 rounded-lg shadow-sm transition-all cursor-pointer"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center space-x-3">
          {isAuthenticated && (
            <Link to={"/link/create"} className="flex items-center space-x-1 bg-primary text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-sm">
              <FaPlus className="w-3 h-3" />
              <span>New</span>
            </Link>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-gray-900 p-1.5 focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-4 shadow-lg">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.name;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => {
                    setActiveTab(link.name);
                    setIsOpen(false);
                  }}
                  className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-primary font-semibold"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-gray-100">
            {isAuthenticated ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                    <img
                      src={
                        auth?.user?.avatar ||
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                      }
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    {auth?.user?.name || "Account"}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold text-red-600 hover:text-red-700 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link
                  to="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2 text-sm font-semibold text-white bg-primary hover:bg-blue-700 rounded-lg shadow-sm transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;