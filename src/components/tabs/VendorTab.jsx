import React from "react";
import { FiStar } from "react-icons/fi";

const VendorTab = ({ isDarkMode }) => {
  return (
    <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
        <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 
                        flex items-center justify-center text-white text-3xl font-bold shadow-lg`}>
          MV
        </div>
        <div>
          <h4 className={`font-semibold text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Mr. Vapo Store
          </h4>
          <p className="text-sm opacity-75 mb-2">Premium Vape Products Since 2015</p>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <FiStar className="text-yellow-400 fill-current" />
              <span>4.8</span>
            </span>
            <span className="text-gray-400">•</span>
            <span>2.5k+ Reviews</span>
          </div>
        </div>
      </div>
      
      <p className="leading-relaxed mb-4">
        Mr. Vapo is a leading provider of high-quality vaping products. 
        We are committed to providing our customers with the best products 
        and exceptional customer service. All our products undergo strict 
        quality control and are made with premium ingredients sourced from 
        around the world.
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        <div className={`p-3 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <p className="text-xs opacity-75">Products</p>
          <p className="font-bold text-lg">150+</p>
        </div>
        <div className={`p-3 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <p className="text-xs opacity-75">Customers</p>
          <p className="font-bold text-lg">10k+</p>
        </div>
        <div className={`p-3 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <p className="text-xs opacity-75">Years</p>
          <p className="font-bold text-lg">8+</p>
        </div>
        <div className={`p-3 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <p className="text-xs opacity-75">Countries</p>
          <p className="font-bold text-lg">15+</p>
        </div>
      </div>
      
      <div className="mt-4">
        <h5 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Contact Information
        </h5>
        <p className="text-sm">Email: support@mrvapo.com</p>
        <p className="text-sm">Phone: +1 (800) 123-4567</p>
        <p className="text-sm">Address: 123 Vape Street, Los Angeles, CA 90001</p>
      </div>
    </div>
  );
};

export default VendorTab;