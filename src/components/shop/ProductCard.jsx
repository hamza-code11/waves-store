import React, { useState } from "react";
import { FiShoppingBag, FiStar, FiHeart, FiEye, FiShare2 } from "react-icons/fi";

const ProductCard = ({ product, isDarkMode }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  // Toggle favorite
  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  // Quick view
  const handleQuickView = (e) => {
    e.stopPropagation();
    setShowQuickView(true);
    // You can implement modal or redirect to product page
    console.log("Quick view for:", product.name);
  };

  // Share product
  const handleShare = (e) => {
    e.stopPropagation();
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} at $${product.price}`,
        url: window.location.href,
      });
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Calculate discount percentage
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div 
      className={`group relative rounded-xl transition-all duration-300 border overflow-hidden
        ${isDarkMode 
          ? 'bg-gray-800 border-gray-700 hover:shadow-xl hover:shadow-blue-900/20 hover:border-blue-700' 
          : 'bg-white border-gray-200 hover:shadow-xl hover:shadow-blue-200/50 hover:border-blue-300'
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >


      {/* Action Buttons - Visible on hover */}
      <div className={`absolute top-3 right-3 z-10 flex flex-col gap-2 transition-all duration-300
        ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
        
        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className={`p-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110
            ${isDarkMode 
              ? 'bg-gray-700 hover:bg-gray-600' 
              : 'bg-white hover:bg-gray-100'
            }`}
          aria-label="Add to favorites"
        >
          <FiHeart className={`text-lg transition-colors ${
            isFavorite 
              ? 'text-red-500 fill-current' 
              : isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`} />
        </button>

        {/* Quick View Button */}
        <button
          onClick={handleQuickView}
          className={`p-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110
            ${isDarkMode 
              ? 'bg-gray-700 hover:bg-gray-600' 
              : 'bg-white hover:bg-gray-100'
            }`}
          aria-label="Quick view"
        >
          <FiEye className={`text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`} />
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className={`p-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110
            ${isDarkMode 
              ? 'bg-gray-700 hover:bg-gray-600' 
              : 'bg-white hover:bg-gray-100'
            }`}
          aria-label="Share product"
        >
          <FiShare2 className={`text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`} />
        </button>
      </div>

      {/* Image Container */}
      <div className="relative p-4 pb-0">
        <div className="relative overflow-hidden rounded-lg aspect-square">
          {/* Glow effect on hover */}
          <div className={`absolute inset-0 rounded-lg blur-xl opacity-0 transition-opacity duration-500
            ${isHovered ? 'opacity-100' : 'opacity-0'}
            ${isDarkMode 
              ? 'bg-gradient-to-t from-blue-900/30 to-transparent' 
              : 'bg-gradient-to-t from-blue-100/50 to-transparent'
            }`} />
          
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-contain transition-transform duration-700
              ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 pt-2">
        {/* Product Name */}
        <h3 className={`font-semibold text-base mb-1 line-clamp-1 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {product.name}
        </h3>

        {/* Brand and Flavor */}
        <div className="space-y-0.5 mb-2">
          <p className={`text-xs flex items-center gap-1.5 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
            {product.brand}
          </p>
          <p className={`text-xs flex items-center gap-1.5 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <span className="w-1 h-1 bg-cyan-500 rounded-full"></span>
            {product.flavor}
          </p>
        </div>

        {/* Rating Stars */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`text-xs ${
                  i < product.rating 
                    ? 'text-yellow-400 fill-current' 
                    : isDarkMode ? 'text-gray-600' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            ({product.rating}.0)
          </span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <p className={`text-xl font-bold ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>
              ${product.price.toFixed(2)}
            </p>
            {product.originalPrice && (
              <p className={`text-xs line-through ${
                isDarkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
                ${product.originalPrice.toFixed(2)}
              </p>
            )}
          </div>

          {/* Add to Cart Button - Small */}
          <button className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-110
            ${isDarkMode
              ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/30'
              : 'bg-blue-50 text-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 hover:text-white border border-blue-200'
            }`}
            aria-label="Add to cart"
          >
            <FiShoppingBag className="text-base" />
          </button>
        </div>

        {/* Full width Add to Cart for mobile */}
        <button className={`w-full mt-3 py-2 rounded-lg text-sm font-medium
                         transition-all duration-300 flex items-center justify-center gap-2
                         lg:hidden ${
                           isDarkMode
                             ? 'border border-blue-600 text-blue-400 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 hover:text-white'
                             : 'border border-blue-500 text-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 hover:text-white'
                         }`}>
          <FiShoppingBag className="text-sm" />
          <span>Add to Cart</span>
        </button>
      </div>

      {/* Quick View Modal (simplified - you can enhance this) */}
      {showQuickView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className={`max-w-2xl rounded-xl overflow-hidden ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="p-6">
              <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {product.name}
              </h3>
              <button 
                onClick={() => setShowQuickView(false)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;