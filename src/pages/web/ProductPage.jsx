import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FiStar, FiHeart, FiMinus, FiPlus, 
  FiShoppingBag, FiTruck, FiShield, FiRefreshCw,
  FiChevronLeft, FiChevronRight
} from "react-icons/fi";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";
import ShopBanner from "../../components/banner/Banner";

// Import product images
import productMain from "../../assets/vapes/01.png";
import thumb1 from "../../assets/vapes/02.png";
import thumb2 from "../../assets/vapes/03.png";
import thumb3 from "../../assets/vapes/04.png";
import thumb4 from "../../assets/vapes/05.png";

// Import related product images
import related1 from "../../assets/vapes/06.png";
import related2 from "../../assets/vapes/07.png";
import related3 from "../../assets/vapes/08.png";
import related4 from "../../assets/vapes/05.png";

const ProductPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState("500g");
  const [selectedImage, setSelectedImage] = useState(productMain);
  const [activeTab, setActiveTab] = useState("detail");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const thumbnails = [productMain, thumb1, thumb2, thumb3, thumb4];
  const relatedProducts = [
    { id: 1, name: "Starter Kit", price: 54.00, image: related1 },
    { id: 2, name: "Pod System", price: 267.00, image: related2 },
    { id: 3, name: "Box Mod", price: 89.00, image: related3 },
    { id: 4, name: "E-Liquid Set", price: 45.00, image: related4 },
  ];

  // Handle previous image
  const handlePrevImage = () => {
    setCurrentImageIndex(prev => {
      const newIndex = prev > 0 ? prev - 1 : thumbnails.length - 1;
      setSelectedImage(thumbnails[newIndex]);
      return newIndex;
    });
  };

  // Handle next image
  const handleNextImage = () => {
    setCurrentImageIndex(prev => {
      const newIndex = prev < thumbnails.length - 1 ? prev + 1 : 0;
      setSelectedImage(thumbnails[newIndex]);
      return newIndex;
    });
  };

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else {
      setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const tabs = [
    { id: "detail", label: "Detail" },
    { id: "specifications", label: "Specifications" },
    { id: "vendor", label: "Vendor" },
    { id: "reviews", label: "Reviews" },
  ];

  // Calculate discount percentage
  const originalPrice = 2899.00;
  const currentPrice = 664.00;
  const discountPercentage = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <Navbar />

      <ShopBanner 
        title="Product Details"
        breadcrumbItems={[
          { name: "WAPO", link: "/" },
          { name: "SHOP", link: "/shop" },
          { name: "PRODUCT" }
        ]}
        showStats={false}
        showButton={false}
      />

      <div className="container mx-auto px-4 py-8 md:py-12 flex-grow">
        
        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Section - Images */}
          <div>
            {/* Main Image with Navigation Arrows */}
            <div className="relative">
              <div className={`rounded-xl border p-6 flex justify-center items-center h-80 md:h-96
                ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                <img
                  src={selectedImage}
                  alt="Product"
                  className="h-full object-contain"
                />
              </div>

              {/* Left Arrow */}
              <button
                onClick={handlePrevImage}
                className={`absolute left-2 top-1/2 transform -translate-y-1/2 
                           p-3 rounded-full transition-all duration-300
                           ${isDarkMode 
                             ? 'bg-gray-800/80 text-white hover:bg-gray-700 border border-gray-700' 
                             : 'bg-white/80 text-gray-800 hover:bg-white border border-gray-300'
                           } shadow-lg hover:scale-110`}
                aria-label="Previous image"
              >
                <FiChevronLeft className="text-xl" />
              </button>

              {/* Right Arrow */}
              <button
                onClick={handleNextImage}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 
                           p-3 rounded-full transition-all duration-300
                           ${isDarkMode 
                             ? 'bg-gray-800/80 text-white hover:bg-gray-700 border border-gray-700' 
                             : 'bg-white/80 text-gray-800 hover:bg-white border border-gray-300'
                           } shadow-lg hover:scale-110`}
                aria-label="Next image"
              >
                <FiChevronRight className="text-xl" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex items-center justify-center mt-4 gap-2">
              {thumbnails.map((thumb, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedImage(thumb);
                    setCurrentImageIndex(index);
                  }}
                  className={`border rounded-lg overflow-hidden transition-all duration-300
                    ${selectedImage === thumb 
                      ? 'border-2 border-blue-500 scale-105 shadow-lg shadow-blue-500/30' 
                      : isDarkMode 
                        ? 'border-gray-700 hover:border-gray-500' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                >
                  <img
                    src={thumb}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-16 w-16 object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Image Counter */}
            <div className="flex justify-center mt-3">
              <span className={`text-xs px-3 py-1 rounded-full ${
                isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
              }`}>
                {currentImageIndex + 1} / {thumbnails.length}
              </span>
            </div>
          </div>

          {/* Right Section - Details */}
          <div>
            {/* Breadcrumb */}
            <div className={`text-xs mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/shop" className="hover:text-blue-600">Shop</Link>
              <span className="mx-2">/</span>
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Product</span>
            </div>

            {/* Product Title */}
            <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Potato Chips 52g, American Cream & Onion
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`text-base ${
                      i < 4 
                        ? 'text-yellow-400 fill-current' 
                        : isDarkMode ? 'text-gray-600' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                (992 Ratings)
              </span>
            </div>

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 
                               bg-clip-text text-transparent">
                  ${currentPrice.toFixed(2)}
                </span>
                <span className={`text-sm line-through ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  ${originalPrice.toFixed(2)}
                </span>
                <span className="px-2 py-1 bg-green-500/20 text-green-600 dark:text-green-400 
                               text-xs font-medium rounded-full border border-green-500/30">
                  -{discountPercentage}% OFF
                </span>
              </div>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                M.R.P. incl. of all taxes
              </p>
            </div>

            {/* Features */}
            <div className={`mb-6 p-4 rounded-lg border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <h3 className={`text-sm font-semibold mb-2 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Key Features
              </h3>
              <ul className={`text-sm space-y-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Closure: Hook & Loop</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Sole: Polyvinyl Chloride</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Width: Medium</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Outer Material: A-Grade Standard Quality</span>
                </li>
              </ul>
            </div>

            {/* Weight Options */}
            <div className="mb-6">
              <p className={`text-sm font-semibold mb-2 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Weight
              </p>
              <div className="flex flex-wrap gap-2">
                {["250g", "500g", "1kg", "2kg"].map((weight) => (
                  <button
                    key={weight}
                    onClick={() => setSelectedWeight(weight)}
                    className={`px-4 py-2 rounded-lg border text-sm transition-all duration-300
                      ${selectedWeight === weight
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-transparent'
                        : isDarkMode
                          ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
              <div className={`flex items-center border rounded-lg ${
                isDarkMode ? 'border-gray-700' : 'border-gray-300'
              }`}>
                <button
                  onClick={() => handleQuantityChange('decrease')}
                  className={`p-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800
                    ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  <FiMinus className="text-sm" />
                </button>
                <span className={`px-6 text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange('increase')}
                  className={`p-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800
                    ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  <FiPlus className="text-sm" />
                </button>
              </div>

              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 
                               text-white font-medium rounded-lg hover:from-blue-700 
                               hover:to-cyan-700 transition-all duration-300 transform 
                               hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-600/30
                               flex items-center justify-center gap-2">
                <FiShoppingBag className="text-lg" />
                <span>ADD TO CART</span>
              </button>

              <button
                onClick={toggleWishlist}
                className={`p-3 rounded-lg border transition-all duration-300
                  ${isWishlisted
                    ? 'bg-red-50 border-red-300 text-red-500 dark:bg-red-900/20 dark:border-red-700'
                    : isDarkMode
                      ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
                      : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <FiHeart className={`text-lg ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Delivery Info */}
            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-lg border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center gap-2">
                <FiTruck className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
                <div>
                  <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Free Shipping
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    On orders $50+
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FiRefreshCw className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
                <div>
                  <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    30 Days Return
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Money back guarantee
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FiShield className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
                <div>
                  <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Secure Payment
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    100% encrypted
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          {/* Tab Headers */}
          <div className={`flex flex-wrap gap-1 border-b ${
            isDarkMode ? 'border-gray-800' : 'border-gray-200'
          }`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300
                  ${activeTab === tab.id
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                    : isDarkMode
                      ? 'text-gray-400 hover:text-gray-200'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className={`mt-6 p-6 rounded-lg border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            {activeTab === 'detail' && (
              <div className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <p className="mb-4">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
                <p>
                  It has survived not only five centuries, but also the leap into electronic typesetting, 
                  remaining essentially unchanged. It was popularised in the 1960s with the release of 
                  Letraset sheets containing Lorem Ipsum passages.
                </p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Product Specifications
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Brand:</span>
                        <span>Mr. Vapo</span>
                      </li>
                      <li className="flex justify-between">
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Model:</span>
                        <span>XC-2000</span>
                      </li>
                      <li className="flex justify-between">
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Color:</span>
                        <span>Black</span>
                      </li>
                      <li className="flex justify-between">
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Material:</span>
                        <span>Polyvinyl Chloride</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Dimensions
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Weight:</span>
                        <span>250g - 2kg</span>
                      </li>
                      <li className="flex justify-between">
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Height:</span>
                        <span>10 cm</span>
                      </li>
                      <li className="flex justify-between">
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Width:</span>
                        <span>Medium</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'vendor' && (
              <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 
                                  flex items-center justify-center text-white text-2xl font-bold`}>
                    MV
                  </div>
                  <div>
                    <h4 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Mr. Vapo Store
                    </h4>
                    <p className="text-sm">Premium Vape Products Since 2015</p>
                  </div>
                </div>
                <p>
                  Mr. Vapo is a leading provider of high-quality vaping products. 
                  We are committed to providing our customers with the best products 
                  and exceptional customer service.
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">4.2</span>
                    <span className="text-sm ml-2">out of 5</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} className={`text-base ${
                          i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`} />
                      ))}
                    </div>
                    <span className="text-sm">(992 Ratings)</span>
                  </div>
                </div>
                <p className="text-center text-gray-500">
                  Customer reviews coming soon...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></span>
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((product) => (
              <Link 
                to={`/product/${product.id}`} 
                key={product.id} 
                className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-lg hover:scale-[1.02]
                  ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-24 w-full object-contain mb-2"
                />
                <h3 className={`text-sm font-medium mb-1 line-clamp-1 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {product.name}
                </h3>
                <p className="text-sm font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;