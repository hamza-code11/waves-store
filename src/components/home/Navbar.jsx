// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiShoppingCart,
  FiSun,
  FiMoon,
  FiUser,
  FiSmartphone
} from "react-icons/fi";
import { GiCigarette } from "react-icons/gi";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState(null);
  const [mobileOpenSubDropdown, setMobileOpenSubDropdown] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close mobile menu and reset mobile dropdowns when window resizes to large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setIsOpen(false);
        setMobileOpenDropdown(null);
        setMobileOpenSubDropdown(null);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const categories = [
    {
      name: "Vapes",
      icon: <GiCigarette className="text-base sm:text-lg" />,
      subcategories: [
        { name: "Starter Kits", path: "/shop?category=vapes&sub=starter-kits" },
        { name: "Pod Systems", path: "/shop?category=vapes&sub=pod-systems" },
        { name: "Box Mods", path: "/shop?category=vapes&sub=box-mods" },
        { name: "Disposable Vapes", path: "/shop?category=vapes&sub=disposable" },
        { name: "E-Liquids", path: "/shop?category=vapes&sub=e-liquids" },
      ],
    },
    {
      name: "Mobile Accessories",
      icon: <FiSmartphone className="text-base sm:text-lg" />,
      subcategories: [
        { name: "Phone Cases", path: "/shop?category=mobile&sub=phone-cases" },
        { name: "Power Banks", path: "/shop?category=mobile&sub=power-banks" },
        { name: "Cables", path: "/shop?category=mobile&sub=cables" },
        { name: "Wireless Chargers", path: "/shop?category=mobile&sub=wireless-chargers" },
      ],
    },
  ];

  const navItems = [
    { name: "Home", path: "/", isLink: true },
    { name: "About", path: "/about", isLink: true },
    { name: "Shop", path: "/shop", isLink: true },
    { name: "Products", hasDropdown: true },
    { name: "Contact", path: "/contact", isLink: true },
  ];

  // Toggle main dropdown on click (desktop)
  const toggleMainDropdown = (itemName) => {
    if (openDropdown === itemName) {
      setOpenDropdown(null);
      setOpenSubDropdown(null);
    } else {
      setOpenDropdown(itemName);
      setOpenSubDropdown(null);
    }
  };

  // Toggle subdropdown on click (desktop)
  const toggleSubDropdown = (catName) => {
    if (openSubDropdown === catName) {
      setOpenSubDropdown(null);
    } else {
      setOpenSubDropdown(catName);
    }
  };

  // Toggle mobile main dropdown
  const toggleMobileMainDropdown = () => {
    if (mobileOpenDropdown === "products") {
      setMobileOpenDropdown(null);
      setMobileOpenSubDropdown(null);
    } else {
      setMobileOpenDropdown("products");
      setMobileOpenSubDropdown(null);
    }
  };

  // Toggle mobile subdropdown
  const toggleMobileSubDropdown = (catName) => {
    if (mobileOpenSubDropdown === catName) {
      setMobileOpenSubDropdown(null);
    } else {
      setMobileOpenSubDropdown(catName);
    }
  };

  // Close dropdown when clicking outside (desktop)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setOpenDropdown(null);
        setOpenSubDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
      ? isDarkMode
        ? "bg-gray-900 shadow-lg shadow-blue-900/20"
        : "bg-white shadow-lg shadow-blue-200/50"
      : isDarkMode
        ? "bg-gray-900"
        : "bg-white"
      }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">

          {/* Logo - Links to Home */}
          <Link to="/" className={`text-xl sm:text-2xl font-bold cursor-pointer ${
            isDarkMode ? 'text-blue-400' : 'text-blue-600'
          }`}>
            WAPO
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">

            {/* Navigation Items */}
            {navItems.map((item) => (
              <div key={item.name} className="relative dropdown-container">
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => toggleMainDropdown("products")}
                      className={`flex items-center gap-1 text-sm xl:text-base font-medium transition-colors
                                ${isDarkMode 
                                  ? 'text-gray-200 hover:text-blue-400' 
                                  : 'text-gray-700 hover:text-blue-600'}`}
                    >
                      {item.name}
                      <FiChevronDown className={`text-xs transition-transform duration-300 ${
                        openDropdown === "products" ? 'rotate-180' : ''
                      }`} />
                    </button>

                    {/* First Level Dropdown - Fixed dark/light mode */}
                    {openDropdown === "products" && (
                      <div className={`absolute top-full left-0 mt-2 w-56 sm:w-64 shadow-xl rounded-xl border z-50 ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700' 
                          : 'bg-white border-gray-200'
                      }`}>
                        {categories.map((cat, i) => (
                          <div key={i} className="relative">
                            <div
                              onClick={() => toggleSubDropdown(cat.name)}
                              className={`flex justify-between items-center px-3 sm:px-4 py-2.5 sm:py-3 cursor-pointer transition-colors ${
                                isDarkMode 
                                  ? 'hover:bg-gray-700 text-gray-200' 
                                  : 'hover:bg-gray-100 text-gray-700'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>
                                  {cat.icon}
                                </span>
                                <span className="text-sm">{cat.name}</span>
                              </div>
                              <FiChevronDown className={`text-xs transition-transform duration-300 ${
                                openSubDropdown === cat.name ? 'rotate-[-90deg]' : ''
                              }`} />
                            </div>

                            {/* Second Level Dropdown - Fixed dark/light mode */}
                            {openSubDropdown === cat.name && (
                              <div className={`absolute left-full top-0 w-48 sm:w-56 shadow-xl rounded-xl border ml-2 z-50 ${
                                isDarkMode 
                                  ? 'bg-gray-800 border-gray-700' 
                                  : 'bg-white border-gray-200'
                              }`}>
                                {cat.subcategories.map((sub, index) => (
                                  <Link
                                    key={index}
                                    to={sub.path}
                                    className={`block px-3 sm:px-4 py-2 text-xs sm:text-sm transition-colors ${
                                      isDarkMode 
                                        ? 'text-gray-300 hover:bg-gray-700 hover:text-blue-400' 
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                                    }`}
                                    onClick={() => {
                                      setOpenDropdown(null);
                                      setOpenSubDropdown(null);
                                    }}
                                  >
                                    {sub.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`text-sm xl:text-base font-medium transition-colors
                              ${isDarkMode 
                                ? 'text-gray-200 hover:text-blue-400' 
                                : 'text-gray-700 hover:text-blue-600'}`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-800 text-gray-200' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {isDarkMode ? <FiSun className="text-yellow-400 text-lg" /> : <FiMoon className="text-gray-600 text-lg" />}
            </button>

            {/* Cart - Links to Cart Page */}
            <Link to="/cart" className="relative cursor-pointer">
              <FiShoppingCart className={`text-lg ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`} />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </Link>

            {/* Sign In Button with Link */}
            <Link
              to="/signin"
              className={`px-4 xl:px-5 py-2 text-sm xl:text-base rounded-lg transition-colors flex items-center gap-2 ${
                isDarkMode
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <FiUser className="text-base" />
              <span className="hidden xl:inline">Sign In</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isDarkMode ? 'hover:bg-gray-800 text-gray-200' : 'hover:bg-gray-100 text-gray-700'
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>

        {/* Mobile Menu - Full Screen with Scroll */}
        {isOpen && (
          <div
            ref={menuRef}
            className={`fixed inset-0 top-16 sm:top-20 z-40 overflow-y-auto
                      ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
            style={{ height: 'calc(100vh - 64px)' }}
          >
            <div className="container mx-auto px-4 py-4 pb-20">

              {/* Mobile Navigation */}
              <div className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <div key={item.name} className={`border-b py-1 ${
                    isDarkMode ? 'border-gray-800' : 'border-gray-200'
                  }`}>
                    {item.hasDropdown ? (
                      <div className="space-y-1">
                        <button
                          onClick={toggleMobileMainDropdown}
                          className={`w-full flex items-center justify-between py-3 px-2 rounded-lg 
                                    font-medium transition-colors text-sm
                                    ${isDarkMode ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                          <span>{item.name}</span>
                          <FiChevronDown className={`text-sm transition-transform duration-300 ${
                            mobileOpenDropdown === "products" ? 'rotate-180' : ''
                          }`} />
                        </button>

                        {/* Mobile Categories */}
                        {mobileOpenDropdown === "products" && (
                          <div className="pl-3 mt-1 space-y-1">
                            {categories.map((cat, catIdx) => (
                              <div key={catIdx} className="space-y-1">
                                <button
                                  onClick={() => toggleMobileSubDropdown(cat.name)}
                                  className={`w-full flex items-center justify-between gap-2 py-2.5 px-3 rounded-lg 
                                            transition-colors text-sm
                                            ${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                  <div className="flex items-center gap-2">
                                    <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>
                                      {cat.icon}
                                    </span>
                                    <span>{cat.name}</span>
                                  </div>
                                  <FiChevronDown className={`text-xs transition-transform duration-300 ${
                                    mobileOpenSubDropdown === cat.name ? 'rotate-180' : ''
                                  }`} />
                                </button>

                                {/* Mobile Subcategories */}
                                {mobileOpenSubDropdown === cat.name && (
                                  <div className="pl-8 mt-1 space-y-1">
                                    {cat.subcategories.map((sub, subIdx) => (
                                      <Link
                                        key={subIdx}
                                        to={sub.path}
                                        className={`block py-2 px-3 rounded-lg text-xs transition-colors cursor-pointer
                                                 ${isDarkMode
                                            ? 'text-gray-400 hover:bg-gray-800 hover:text-blue-400'
                                            : 'text-gray-500 hover:bg-gray-100 hover:text-blue-600'
                                          }`}
                                        onClick={() => {
                                          setIsOpen(false);
                                          setMobileOpenDropdown(null);
                                          setMobileOpenSubDropdown(null);
                                        }}
                                      >
                                        {sub.name}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className={`block py-3 px-2 rounded-lg text-sm transition-colors
                                 ${isDarkMode
                            ? 'text-gray-300 hover:bg-gray-800 hover:text-blue-400'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                          }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Bottom Section */}
              <div className={`mt-6 pt-4 border-t space-y-2 ${
                isDarkMode ? 'border-gray-800' : 'border-gray-200'
              }`}>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className={`w-full px-3 py-3 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors
                           ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {isDarkMode ? (
                    <>
                      <FiSun className="text-yellow-400" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <FiMoon className="text-blue-600" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>

                {/* Cart Button - Links to Cart Page */}
                <Link
                  to="/cart"
                  className={`w-full px-3 py-3 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors
                                 ${isDarkMode
                      ? 'border border-gray-700 text-gray-300 hover:border-blue-500 hover:bg-gray-800'
                      : 'border border-gray-300 text-gray-700 hover:border-blue-500 hover:bg-blue-50'
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  <FiShoppingCart />
                  <span>View Cart (3)</span>
                </Link>

                {/* Sign In Button */}
                <Link
                  to="/signin"
                  className="w-full px-3 py-3 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <FiUser />
                  <span>Sign In</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;