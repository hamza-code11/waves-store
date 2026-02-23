import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiLock, FiLogIn, FiEye, FiEyeOff } from "react-icons/fi";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";
import ShopBanner from "../../components/banner/Banner";

const SignIn = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
    // Add your login logic here
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <Navbar />

      <ShopBanner 
        title="My Account"
        breadcrumbItems={[
          { name: "WAPO", link: "/" },
          { name: "MY ACCOUNT" }
        ]}
        showStats={false}
        showButton={false}
      />

      <div className="container mx-auto px-4 py-12 md:py-16 flex-grow">
        <div className="max-w-md mx-auto">
          
          {/* Login Card */}
          <div className={`rounded-xl border p-6 md:p-8 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Login
              </h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Welcome back! Please login to your account.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email Field */}
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Username or email address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className={`text-base ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john@example.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
                             ${isDarkMode
                               ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                               : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                             }`}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className={`text-base ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-12 py-3 rounded-lg border text-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
                             ${isDarkMode
                               ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                               : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                             }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <FiEyeOff className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    ) : (
                      <FiEye className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 accent-blue-600 rounded border-gray-300"
                  />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Remember me
                  </span>
                </label>
                
                <Link 
                  to="/forgot-password" 
                  className={`text-sm hover:text-blue-600 transition-colors ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  Lost your password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 
                         text-white font-medium rounded-lg hover:from-blue-700 
                         hover:to-cyan-700 transition-all duration-300 transform 
                         hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-600/30
                         flex items-center justify-center gap-2"
              >
                <FiLogIn className="text-lg" />
                <span>Log in</span>
              </button>
            </form>

            {/* Register Link */}
            <div className="mt-6 pt-6 border-t text-center dark:border-gray-700">
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className={`mt-4 p-4 rounded-lg text-center text-xs ${
            isDarkMode ? 'bg-gray-800/50 text-gray-400' : 'bg-gray-50 text-gray-500'
          }`}>
            <p>Demo: demo@example.com / password</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignIn;