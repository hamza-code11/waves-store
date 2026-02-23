import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FiHome, FiShoppingBag, FiUsers, FiFileText, FiSettings,
  FiLogOut, FiX, FiPackage, FiStar, FiMail, FiBarChart2
} from "react-icons/fi";
import { GiCigarette } from "react-icons/gi";

const AdminSidebar = ({ isDarkMode, isSidebarOpen, isMobileMenuOpen, closeMobileMenu }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <FiHome /> },
    { name: "Products", path: "/admin/products", icon: <GiCigarette /> },
    { name: "Orders", path: "/admin/orders", icon: <FiShoppingBag /> },
    { name: "Customers", path: "/admin/customers", icon: <FiUsers /> },
    { name: "Categories", path: "/admin/categories", icon: <FiPackage /> },
    { name: "Inventory", path: "/admin/inventory", icon: <FiFileText /> },
    { name: "Reports", path: "/admin/reports", icon: <FiBarChart2 /> },
    { name: "Reviews", path: "/admin/reviews", icon: <FiStar /> },
    { name: "Messages", path: "/admin/messages", icon: <FiMail /> },
    { name: "Settings", path: "/admin/settings", icon: <FiSettings /> },
  ];

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <aside className={`hidden lg:flex flex-col fixed left-0 top-0 h-full w-64 z-30 transition-all duration-300 ${
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
    } ${isDarkMode ? 'bg-gray-800 border-r border-gray-700' : 'bg-white border-r border-gray-200'}`}>
      
      {/* Logo */}
      <div className={`h-16 flex items-center justify-center border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <Link to="/admin" className="text-xl sm:text-2xl font-bold text-blue-600">
          WAPO<span className="text-xs sm:text-sm"> Admin</span>
        </Link>
      </div>

      {/* User Info */}
      <div className={`p-3 sm:p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm sm:text-base">
            A
          </div>
          <div className="min-w-0 flex-1">
            <p className={`text-xs sm:text-sm font-medium truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Admin User
            </p>
            <p className={`text-xs truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              admin@wapo.com
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-2 sm:py-4">
        <ul className="space-y-0.5 sm:space-y-1 px-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base
                    ${isActive
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                      : isDarkMode
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  <span className="text-base sm:text-lg">{item.icon}</span>
                  <span className="font-medium truncate">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className={`p-3 sm:p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <button className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg w-full transition-colors text-sm sm:text-base
          ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
          <FiLogOut className="text-base sm:text-lg" />
          <span className="font-medium truncate">Logout</span>
        </button>
      </div>
    </aside>
  );

  // Mobile Sidebar Overlay
  const MobileSidebarOverlay = () => (
    isMobileMenuOpen && (
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={closeMobileMenu}
      />
    )
  );

  // Mobile Sidebar
  const MobileSidebar = () => (
    <aside className={`fixed inset-y-0 left-0 w-64 z-50 lg:hidden transition-transform duration-300 ${
      isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
    } ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="h-full flex flex-col">
        <div className={`h-16 flex items-center justify-between px-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <Link to="/admin" className="text-xl font-bold text-blue-600">
            WAPO<span className="text-xs"> Admin</span>
          </Link>
          <button onClick={closeMobileMenu} className="p-1">
            <FiX className={`text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
        </div>
        
        <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
              A
            </div>
            <div className="min-w-0 flex-1">
              <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Admin User
              </p>
              <p className={`text-xs truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                admin@wapo.com
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-sm
                      ${isActive
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                        : isDarkMode
                          ? 'text-gray-300 hover:bg-gray-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    onClick={closeMobileMenu}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium truncate">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <button className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full transition-colors text-sm
            ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
            <FiLogOut className="text-lg" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebarOverlay />
      <MobileSidebar />
    </>
  );
};

export default AdminSidebar;