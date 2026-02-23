import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiTruck, FiShield, FiLock, FiCreditCard } from "react-icons/fi";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";
import ShopBanner from "../../components/banner/Banner";

const Checkout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [createAccount, setCreateAccount] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    address: "",
    city: "",
    postcode: "",
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
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order placed:", { formData, paymentMethod, createAccount });
  };

  const orderItems = [
    {
      id: 1,
      name: "Mr. Vapo E-liquid 30ml",
      details: "Strawberry, 30ml",
      quantity: 2,
      price: 4.50,
    },
    {
      id: 2,
      name: "Starter Kit 1",
      details: "Vape Kit, Complete Set",
      quantity: 1,
      price: 54.00,
    },
    {
      id: 3,
      name: "Mr. Vapo Pod Kit",
      details: "Strawberry, Pod System",
      quantity: 1,
      price: 267.00,
    },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <Navbar />

      <ShopBanner 
        title="Checkout"
        breadcrumbItems={[
          { name: "WAPO", link: "/" },
          { name: "CART", link: "/cart" },
          { name: "CHECKOUT" }
        ]}
        showStats={false}
        showButton={false}
      />

      <div className="container mx-auto px-4 py-8 md:py-12 flex-grow">
        <form onSubmit={handleSubmit}>
          {/* Responsive Grid - Stack on mobile, side by side on desktop */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            
            {/* Billing Details - Full width on mobile, 2/3 on desktop */}
            <div className="w-full lg:w-2/3">
              <h2 className={`text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <span className="w-1 h-5 md:h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></span>
                Billing Details
              </h2>

              <div className="space-y-3 md:space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className={`block text-xs md:text-sm font-medium mb-1 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      required
                      className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
                               focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                 isDarkMode
                                   ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                                   : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                               }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs md:text-sm font-medium mb-1 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      required
                      className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
                               focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                 isDarkMode
                                   ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                                   : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                               }`}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className={`block text-xs md:text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john.doe@example.com"
                    required
                    className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                               isDarkMode
                                 ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                                 : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                             }`}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className={`block text-xs md:text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 234 567 8900"
                    required
                    className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                               isDarkMode
                                 ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                                 : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                             }`}
                  />
                </div>

                {/* Country */}
                <div>
                  <label className={`block text-xs md:text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Country *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                               isDarkMode
                                 ? 'bg-gray-800 border-gray-700 text-white'
                                 : 'bg-white border-gray-300 text-gray-900'
                             }`}
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>

                {/* Address */}
                <div>
                  <label className={`block text-xs md:text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main St"
                    required
                    className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                               isDarkMode
                                 ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                                 : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                             }`}
                  />
                </div>

                {/* City and Postcode */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className={`block text-xs md:text-sm font-medium mb-1 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Town / City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Miami"
                      required
                      className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
                               focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                 isDarkMode
                                   ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                                   : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                               }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs md:text-sm font-medium mb-1 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Postcode / ZIP *
                    </label>
                    <input
                      type="text"
                      name="postcode"
                      value={formData.postcode}
                      onChange={handleInputChange}
                      placeholder="33101"
                      required
                      className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
                               focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                 isDarkMode
                                   ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                                   : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                               }`}
                    />
                  </div>
                </div>

                {/* Create Account Option */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="createAccount"
                    checked={createAccount}
                    onChange={(e) => setCreateAccount(e.target.checked)}
                    className="w-4 h-4 accent-blue-600 rounded border-gray-300"
                  />
                  <label htmlFor="createAccount" className={`text-xs md:text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Create an account for faster checkout
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary - Full width on mobile, 1/3 on desktop */}
            <div className="w-full lg:w-1/3">
              <div className="lg:sticky lg:top-24">
                <h2 className={`text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <span className="w-1 h-5 md:h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></span>
                  Order Summary
                </h2>

                <div className={`rounded-lg md:rounded-xl border overflow-hidden ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  {/* Order Items */}
                  <div className="p-3 md:p-4 border-b dark:border-gray-700">
                    <div className="flex justify-between text-xs font-semibold uppercase tracking-wider mb-2">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Product</span>
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Total</span>
                    </div>

                    <div className="space-y-2">
                      {orderItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-xs md:text-sm">
                          <div>
                            <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                              {item.name}
                            </span>
                            <span className={`block text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                              {item.details} × {item.quantity}
                            </span>
                          </div>
                          <span className={`font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Totals */}
                  <div className="p-3 md:p-4 space-y-1">
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Subtotal</span>
                      <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Shipping</span>
                      <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        ${shipping.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Tax (10%)</span>
                      <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        ${tax.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400">
                      Free Shipping
                    </div>

                    <div className="flex justify-between text-base md:text-lg font-bold pt-2 border-t dark:border-gray-700 mt-2">
                      <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Total</span>
                      <span className="text-blue-600 dark:text-blue-400">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-4 md:mt-6">
                  <h3 className={`text-sm font-semibold mb-2 md:mb-3 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Payment Method
                  </h3>
                  
                  <div className="space-y-2">
                    {/* Bank Transfer */}
                    <label className={`flex items-start gap-2 p-2 md:p-3 rounded-lg border cursor-pointer
                      ${paymentMethod === 'bank'
                        ? isDarkMode
                          ? 'border-blue-500 bg-blue-600/10'
                          : 'border-blue-500 bg-blue-50'
                        : isDarkMode
                          ? 'border-gray-700 hover:bg-gray-800/50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}>
                      <input
                        type="radio"
                        name="payment"
                        value="bank"
                        checked={paymentMethod === 'bank'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-0.5 accent-blue-600"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-1">
                          <FiCreditCard className={`text-xs md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                          <span className={`text-xs md:text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                            Bank Transfer
                          </span>
                        </div>
                      </div>
                    </label>

                    {/* Cash on Delivery */}
                    <label className={`flex items-start gap-2 p-2 md:p-3 rounded-lg border cursor-pointer
                      ${paymentMethod === 'cod'
                        ? isDarkMode
                          ? 'border-blue-500 bg-blue-600/10'
                          : 'border-blue-500 bg-blue-50'
                        : isDarkMode
                          ? 'border-gray-700 hover:bg-gray-800/50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}>
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-0.5 accent-blue-600"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-1">
                          <FiShoppingBag className={`text-xs md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                          <span className={`text-xs md:text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                            Cash on Delivery
                          </span>
                        </div>
                      </div>
                    </label>

                    {/* Card Payment */}
                    <label className={`flex items-start gap-2 p-2 md:p-3 rounded-lg border cursor-pointer
                      ${paymentMethod === 'card'
                        ? isDarkMode
                          ? 'border-blue-500 bg-blue-600/10'
                          : 'border-blue-500 bg-blue-50'
                        : isDarkMode
                          ? 'border-gray-700 hover:bg-gray-800/50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}>
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-0.5 accent-blue-600"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-1">
                          <FiLock className={`text-xs md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                          <span className={`text-xs md:text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                            Card Payment
                          </span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  className="w-full mt-4 md:mt-6 py-2.5 md:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 
                           text-white font-medium rounded-lg text-sm md:text-base
                           hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 
                           transform hover:scale-[1.01] hover:shadow-md"
                >
                  Place Order
                </button>

                {/* Trust Badges */}
                <div className="mt-4 pt-3 border-t dark:border-gray-700">
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex items-center gap-1">
                      <FiTruck className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Free Shipping
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiShield className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Secure
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;