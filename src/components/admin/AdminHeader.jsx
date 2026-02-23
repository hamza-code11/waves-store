import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FiMenu, FiSun, FiMoon, FiSearch, FiChevronDown, 
  FiUser, FiSettings, FiLogOut, FiX
} from "react-icons/fi";
import { useLocation } from "react-router-dom";

const AdminHeader = ({ 
  isDarkMode, 
  setIsDarkMode,
  isSidebarOpen, 
  toggleSidebar, 
  isMobileMenuOpen, 
  toggleMobileMenu 
}) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Products", path: "/admin/products" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Customers", path: "/admin/customers" },
    { name: "Categories", path: "/admin/categories" },
    { name: "Inventory", path: "/admin/inventory" },
    { name: "Reports", path: "/admin/reports" },
    { name: "Reviews", path: "/admin/reviews" },
    { name: "Messages", path: "/admin/messages" },
    { name: "Settings", path: "/admin/settings" },
  ];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const getPageTitle = () => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    return currentItem?.name || 'Dashboard';
  };

  return (
    <header className={`sticky top-0 z-20 w-full h-14 sm:h-16 flex items-center justify-between px-3 sm:px-4 md:px-6 border-b ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      
      {/* Left Section */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Sidebar Toggle - Desktop */}
        <button
          onClick={toggleSidebar}
          className="hidden lg:block p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <FiMenu className={`text-lg sm:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <FiMenu className={`text-lg sm:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
        </button>

        {/* Page Title */}
        <h1 className={`text-sm sm:text-base md:text-lg font-semibold truncate max-w-[120px] sm:max-w-none ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {getPageTitle()}
        </h1>
      </div>

      {/* Search Bar - Desktop */}
      <div className="hidden md:block flex-1 max-w-md mx-4">
        <div className="relative">
          <FiSearch className={`absolute left-3 top-2.5 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <input
            type="text"
            placeholder="Search..."
            className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
          />
        </div>
      </div>

      {/* Mobile Search Toggle */}
      <button
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className="md:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <FiSearch className={`text-lg sm:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
      </button>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="absolute left-0 right-0 top-14 p-3 bg-inherit border-b md:hidden">
          <div className="relative">
            <FiSearch className={`absolute left-3 top-2.5 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search..."
              className={`w-full pl-10 pr-10 py-2 rounded-lg border text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500
                ${isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              autoFocus
            />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-3 top-2.5"
            >
              <FiX className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </button>
          </div>
        </div>
      )}

      {/* Right Section */}
      <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
            isDarkMode 
              ? 'hover:bg-gray-700 text-yellow-400' 
              : 'hover:bg-gray-100 text-gray-600'
          }`}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <FiSun className="text-base sm:text-lg" /> : <FiMoon className="text-base sm:text-lg" />}
        </button>
        
        {/* Profile Dropdown */}
        <div className="relative" ref={profileDropdownRef}>
          <button
            onClick={toggleProfileDropdown}
            className="flex items-center gap-1 sm:gap-2 focus:outline-none"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
              A
            </div>
            <div className="hidden sm:block text-xs sm:text-sm text-left">
              <p className={`font-medium truncate max-w-[80px] ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Admin</p>
              <p className={`text-xs truncate max-w-[80px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Super Admin</p>
            </div>
            <FiChevronDown 
              className={`hidden sm:block text-xs transition-transform duration-300 ${
                isProfileDropdownOpen ? 'rotate-180' : ''
              } ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} 
            />
          </button>

          {/* Dropdown Menu */}
          {isProfileDropdownOpen && (
            <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl border overflow-hidden z-50 ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className={`p-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Admin User</p>
                <p className={`text-xs truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>admin@wapo.com</p>
              </div>
              <Link
                to="/admin/profile"
                className={`flex items-center gap-2 px-4 py-3 text-sm transition-colors
                  ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setIsProfileDropdownOpen(false)}
              >
                <FiUser className="text-sm" />
                <span>My Profile</span>
              </Link>
              <Link
                to="/admin/settings"
                className={`flex items-center gap-2 px-4 py-3 text-sm transition-colors
                  ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setIsProfileDropdownOpen(false)}
              >
                <FiSettings className="text-sm" />
                <span>Settings</span>
              </Link>
              <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <button
                  className={`w-full flex items-center gap-2 px-4 py-3 text-sm transition-colors text-left
                    ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  <FiLogOut className="text-sm" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;