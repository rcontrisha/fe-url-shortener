import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router";

function Navbar() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", href: "#" },
    { name: "Analytics", href: "#" },
    { name: "Links", href: "#" },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-100 font-sans sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand & Desktop Navigation */}
        <div className="flex items-center space-x-10 h-full">
          <div className="text-xl font-extrabold text-black tracking-tight cursor-pointer">
            ShortLink
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex space-x-8 h-full">
            {navLinks.map((link) => {
              const isActive = activeTab === link.name;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveTab(link.name)}
                  className={`inline-flex items-center h-full text-sm font-medium transition-colors relative ${
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-5">
          <Link to={"auth/login"} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
            Login
          </Link>

          <button className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg shadow-sm transition-all cursor-pointer">
            Logout
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-gray-900 p-2 focus:outline-none cursor-pointer"
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
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    setActiveTab(link.name);
                    setIsOpen(false);
                  }}
                  className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3">
            <Link to={"/auth/login"} className="w-full text-center py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Login
            </Link>
            <button className="w-full text-center py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all cursor-pointer">
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;