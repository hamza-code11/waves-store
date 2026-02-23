import React from "react";
import { FiSearch, FiFilter, FiX, FiChevronDown } from "react-icons/fi";

const FilterSidebar = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
  priceRange,
  setPriceRange,
  search,
  setSearch,
  handleSearch,
  handleReset,
  isDarkMode,
  isMobile,
  onClose
}) => {
  const min = priceRange?.min ?? 0;
  const max = priceRange?.max ?? 500;

  return (
    <div className={`rounded-xl shadow-lg p-4 transition-all duration-500 border ${
      isDarkMode 
        ? 'bg-gray-800/90 backdrop-blur-sm border-gray-700' 
        : 'bg-white/90 backdrop-blur-sm border-gray-200'
    }`}>
      
      {/* Header with decorative element */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-1 h-6 rounded-full bg-gradient-to-b from-blue-500 to-cyan-500`}></div>
          <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Filters
          </h2>
        </div>
        {isMobile && (
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <FiX className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
        )}
      </div>

      {/* Search with enhanced styling */}
      <div className="mb-4">
        <label className={`text-xs font-medium mb-1.5 block ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Search Products
        </label>
        <div className="relative group">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full pl-9 pr-3 py-2 rounded-lg border transition-all duration-300 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                       isDarkMode 
                         ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700' 
                         : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:bg-white'
                     }`}
          />
          <FiSearch className={`absolute left-3 top-2.5 text-base transition-colors duration-300
            ${isDarkMode ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-500 group-hover:text-blue-600'}`} />
        </div>
      </div>

      {/* Category Filter with enhanced styling */}
      <div className="mb-4">
        <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full bg-blue-500`}></span>
          Category
        </h3>

        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat.name} className="relative">
              <label className={`flex items-center p-2 rounded-lg cursor-pointer transition-all duration-300 text-sm
                ${selectedCategory === cat.name 
                  ? isDarkMode 
                    ? 'bg-blue-600/20 border border-blue-500/50' 
                    : 'bg-blue-50 border border-blue-300'
                  : isDarkMode 
                    ? 'hover:bg-gray-700/50 border border-transparent' 
                    : 'hover:bg-gray-100 border border-transparent'
                }`}>
                <input
                  type="radio"
                  name="category"
                  className="sr-only"
                  value={cat.name}
                  checked={selectedCategory === cat.name}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedSubCategory("");
                  }}
                />
                <div className="flex items-center flex-1">
                  <div className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center
                    ${selectedCategory === cat.name
                      ? 'border-blue-500 bg-blue-500'
                      : isDarkMode ? 'border-gray-600' : 'border-gray-300'
                    }`}>
                    {selectedCategory === cat.name && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className={`text-sm ${
                    selectedCategory === cat.name
                      ? isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      : isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {cat.name}
                  </span>
                </div>
                {selectedCategory === cat.name && (
                  <FiChevronDown className={`text-xs transition-transform duration-300 rotate-[-90deg] ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                )}
              </label>

              {/* Subcategories with animation */}
              {selectedCategory === cat.name && (
                <div className="ml-6 mt-1.5 space-y-1.5 animate-slide-down">
                  {cat.sub.map((sub) => (
                    <label key={sub} className={`flex items-center p-1.5 pl-3 rounded-lg cursor-pointer transition-all duration-300 text-xs
                      ${selectedSubCategory === sub
                        ? isDarkMode 
                          ? 'bg-blue-600/10 border border-blue-500/30' 
                          : 'bg-blue-50/50 border border-blue-200'
                        : isDarkMode 
                          ? 'hover:bg-gray-700/30 border border-transparent' 
                          : 'hover:bg-gray-50 border border-transparent'
                      }`}>
                      <input
                        type="radio"
                        name="subCategory"
                        className="sr-only"
                        value={sub}
                        checked={selectedSubCategory === sub}
                        onChange={(e) => setSelectedSubCategory(e.target.value)}
                      />
                      <div className={`w-3 h-3 rounded-full border-2 mr-2 flex items-center justify-center
                        ${selectedSubCategory === sub
                          ? 'border-blue-500 bg-blue-500'
                          : isDarkMode ? 'border-gray-600' : 'border-gray-300'
                        }`}>
                        {selectedSubCategory === sub && (
                          <div className="w-1 h-1 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span className={`text-xs ${
                        selectedSubCategory === sub
                          ? isDarkMode ? 'text-blue-400' : 'text-blue-600'
                          : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {sub}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter with enhanced styling */}
      <div className="mb-4">
        <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full bg-cyan-500`}></span>
          Price Range
        </h3>
        
        <div className="space-y-3">
          {/* Min Price */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Minimum
              </label>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                isDarkMode 
                  ? 'bg-gray-700 text-blue-400' 
                  : 'bg-blue-100 text-blue-600'
              }`}>
                ${min}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="500"
              value={min}
              onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })}
              className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${isDarkMode ? '#3b82f6' : '#3b82f6'} 0%, ${isDarkMode ? '#06b6d4' : '#06b6d4'} ${(min/500)*100}%, ${isDarkMode ? '#374151' : '#e5e7eb'} ${(min/500)*100}%, ${isDarkMode ? '#374151' : '#e5e7eb'} 100%)`
              }}
            />
          </div>
          
          {/* Max Price */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Maximum
              </label>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                isDarkMode 
                  ? 'bg-gray-700 text-cyan-400' 
                  : 'bg-cyan-100 text-cyan-600'
              }`}>
                ${max}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="500"
              value={max}
              onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
              className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${isDarkMode ? '#3b82f6' : '#3b82f6'} 0%, ${isDarkMode ? '#06b6d4' : '#06b6d4'} ${(max/500)*100}%, ${isDarkMode ? '#374151' : '#e5e7eb'} ${(max/500)*100}%, ${isDarkMode ? '#374151' : '#e5e7eb'} 100%)`
              }}
            />
          </div>

          {/* Range Display */}
          <div className={`p-2 rounded-lg text-center ${
            isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'
          }`}>
            <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Selected Range: <span className={`font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>${min}</span> 
              <span className="mx-1">-</span> 
              <span className={`font-semibold ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>${max}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Buttons with enhanced styling */}
      <div className="flex gap-2 pt-2">
        <button
          onClick={() => {
            handleSearch();
            if (isMobile && onClose) onClose();
          }}
          className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 
                   text-white font-medium rounded-lg hover:from-blue-700 
                   hover:to-cyan-700 transition-all duration-300 transform 
                   hover:scale-[1.02] hover:shadow-md hover:shadow-blue-600/30
                   flex items-center justify-center gap-1.5 group text-sm"
        >
          <FiFilter className="text-xs group-hover:rotate-12 transition-transform" />
          <span>Apply</span>
        </button>

        <button
          onClick={() => {
            handleReset();
            if (isMobile && onClose) onClose();
          }}
          className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all duration-300 text-sm
                   transform hover:scale-[1.02] flex items-center justify-center gap-1.5
                   ${isDarkMode 
                     ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white' 
                     : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                   }`}
        >
          <FiX className="text-xs" />
          <span>Reset</span>
        </button>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default FilterSidebar;