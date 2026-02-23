import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiUserPlus } from "react-icons/fi";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";
import ShopBanner from "../../components/banner/Banner";

const Register = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [passwordError, setPasswordError] = useState("");

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

    // Clear password error when typing
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    // Validate password strength (optional)
    if (formData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    console.log("Registration attempt:", formData);
    // Add your registration logic here
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <Navbar />

      <ShopBanner 
        title="Create Account"
        breadcrumbItems={[
          { name: "WAPO", link: "/" },
          { name: "MY ACCOUNT", link: "/signin" },
          { name: "REGISTER" }
        ]}
        showStats={false}
        showButton={false}
      />

      <div className="container mx-auto px-4 py-12 md:py-16 flex-grow">
        <div className="max-w-lg mx-auto">
          
          {/* Register Card */}
          <div className={`rounded-xl border p-6 md:p-8 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Create Account
              </h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Join us today and start shopping!
              </p>
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className={`text-base ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      placeholder="John"
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm
                               focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
                               ${isDarkMode
                                 ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                 : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                               }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Last Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className={`text-base ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      placeholder="Doe"
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm
                               focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
                               ${isDarkMode
                                 ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                 : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                               }`}
                    />
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Email Address <span className="text-red-500">*</span>
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

              {/* Confirm Password Field */}
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className={`text-base ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
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
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    ) : (
                      <FiEye className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-xs text-red-500 mt-1">{passwordError}</p>
                )}
              </div>

              {/* Terms Agreement */}
              <div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    required
                    className="w-4 h-4 accent-blue-600 rounded border-gray-300 mt-0.5"
                  />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    I agree to the{' '}
                    <Link to="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 
                         text-white font-medium rounded-lg hover:from-blue-700 
                         hover:to-cyan-700 transition-all duration-300 transform 
                         hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-600/30
                         flex items-center justify-center gap-2"
              >
                <FiUserPlus className="text-lg" />
                <span>Create Account</span>
              </button>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 pt-6 border-t text-center dark:border-gray-700">
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Already have an account?{' '}
                <Link 
                  to="/signin" 
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;