import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { 
  FiStar, FiHeart, FiMinus, FiPlus, 
  FiShoppingBag, FiTruck, FiShield, FiRefreshCw,
  FiChevronLeft, FiChevronRight
} from "react-icons/fi";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";
import ShopBanner from "../../components/banner/Banner";
import TabsSection from "../../components/tabs/TabsSection";

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

// Constants
const THUMBNAILS = [productMain, thumb1, thumb2, thumb3, thumb4];
const RELATED_PRODUCTS = [
  { id: 1, name: "Starter Kit", price: 54.00, image: related1 },
  { id: 2, name: "Pod System", price: 267.00, image: related2 },
  { id: 3, name: "Box Mod", price: 89.00, image: related3 },
  { id: 4, name: "E-Liquid Set", price: 45.00, image: related4 },
];

const WEIGHT_OPTIONS = ["30ml", "60ml", "100ml", "120ml"];

const ProductPage = () => {
  const { id } = useParams();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState("30ml");
  const [selectedFlavor, setSelectedFlavor] = useState(1);
  const [selectedImage, setSelectedImage] = useState(productMain);
  const [activeTab, setActiveTab] = useState("flavors");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);

  // Handle image navigation
  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex(prev => {
      const newIndex = prev > 0 ? prev - 1 : THUMBNAILS.length - 1;
      setSelectedImage(THUMBNAILS[newIndex]);
      return newIndex;
    });
  }, []);

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex(prev => {
      const newIndex = prev < THUMBNAILS.length - 1 ? prev + 1 : 0;
      setSelectedImage(THUMBNAILS[newIndex]);
      return newIndex;
    });
  }, []);

  const handleQuantityChange = useCallback((type) => {
    setQuantity(prev => type === 'increase' ? prev + 1 : Math.max(1, prev - 1));
  }, []);

  const toggleWishlist = useCallback(() => {
    setIsWishlisted(prev => !prev);
  }, []);

  // Calculate discount percentage
  const discountPercentage = useMemo(() => {
    const originalPrice = 2899.00;
    const currentPrice = 664.00;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  }, []);

  // Render star rating
  const renderStars = (rating = 4, total = 5) => {
    return [...Array(total)].map((_, i) => (
      <FiStar
        key={i}
        className={`text-base ${
          i < rating 
            ? 'text-yellow-400 fill-current' 
            : isDarkMode ? 'text-gray-600' : 'text-gray-300'
        }`}
      />
    ));
  };

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          
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
                  loading="lazy"
                />
              </div>

              {/* Navigation Arrows */}
              <NavigationArrow 
                direction="left" 
                onClick={handlePrevImage} 
                isDarkMode={isDarkMode} 
              />
              <NavigationArrow 
                direction="right" 
                onClick={handleNextImage} 
                isDarkMode={isDarkMode} 
              />
            </div>

            {/* Thumbnails */}
            <ThumbnailList
              thumbnails={THUMBNAILS}
              selectedImage={selectedImage}
              onSelect={(thumb, index) => {
                setSelectedImage(thumb);
                setCurrentImageIndex(index);
              }}
              isDarkMode={isDarkMode}
            />

            {/* Image Counter */}
            <div className="flex justify-center mt-3">
              <span className={`text-xs px-3 py-1 rounded-full ${
                isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
              }`}>
                {currentImageIndex + 1} / {THUMBNAILS.length}
              </span>
            </div>
          </div>

          {/* Right Section - Details */}
          <div>
            <ProductBreadcrumb isDarkMode={isDarkMode} />

            <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Mr. Vapo E-liquid
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-0.5">
                {renderStars(4)}
              </div>
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                (992 Ratings)
              </span>
            </div>

            {/* Price */}
            <PriceSection
              currentPrice={664.00}
              originalPrice={2899.00}
              discountPercentage={discountPercentage}
              isDarkMode={isDarkMode}
            />

            {/* Weight Options */}
            <WeightSelector
              options={WEIGHT_OPTIONS}
              selected={selectedWeight}
              onSelect={setSelectedWeight}
              isDarkMode={isDarkMode}
            />

            {/* Quantity & Add to Cart */}
            <ActionButtons
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
              isWishlisted={isWishlisted}
              onToggleWishlist={toggleWishlist}
              isDarkMode={isDarkMode}
            />

            {/* Delivery Info */}
            <DeliveryInfo isDarkMode={isDarkMode} />
          </div>
        </div>

        {/* Tabs Section - Imported from components/tabs */}
        <TabsSection
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isDarkMode={isDarkMode}
          selectedFlavor={selectedFlavor}
          setSelectedFlavor={setSelectedFlavor}
        />

        {/* Related Products */}
        <RelatedProducts
          products={RELATED_PRODUCTS}
          isDarkMode={isDarkMode}
        />
      </div>

      <Footer />
    </div>
  );
};

// Reusable Sub-components
const NavigationArrow = ({ direction, onClick, isDarkMode }) => {
  const Icon = direction === 'left' ? FiChevronLeft : FiChevronRight;
  const positionClass = direction === 'left' ? 'left-2' : 'right-2';
  
  return (
    <button
      onClick={onClick}
      className={`absolute ${positionClass} top-1/2 transform -translate-y-1/2 
                 p-3 rounded-full transition-all duration-300
                 ${isDarkMode 
                   ? 'bg-gray-800/80 text-white hover:bg-gray-700 border border-gray-700' 
                   : 'bg-white/80 text-gray-800 hover:bg-white border border-gray-300'
                 } shadow-lg hover:scale-110`}
      aria-label={`${direction} image`}
    >
      <Icon className="text-xl" />
    </button>
  );
};

const ThumbnailList = ({ thumbnails, selectedImage, onSelect, isDarkMode }) => (
  <div className="flex items-center justify-center mt-4 gap-2">
    {thumbnails.map((thumb, index) => (
      <button
        key={index}
        onClick={() => onSelect(thumb, index)}
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
          loading="lazy"
        />
      </button>
    ))}
  </div>
);

const ProductBreadcrumb = ({ isDarkMode }) => (
  <div className={`text-xs mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
    <Link to="/" className="hover:text-blue-600">Home</Link>
    <span className="mx-2">/</span>
    <Link to="/shop" className="hover:text-blue-600">Shop</Link>
    <span className="mx-2">/</span>
    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Product</span>
  </div>
);

const PriceSection = ({ currentPrice, originalPrice, discountPercentage, isDarkMode }) => (
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
);

const WeightSelector = ({ options, selected, onSelect, isDarkMode }) => (
  <div className="mb-6">
    <p className={`text-sm font-semibold mb-2 ${
      isDarkMode ? 'text-gray-200' : 'text-gray-700'
    }`}>
      Bottle Size
    </p>
    <div className="flex flex-wrap gap-2">
      {options.map((weight) => (
        <button
          key={weight}
          onClick={() => onSelect(weight)}
          className={`px-4 py-2 rounded-lg border text-sm transition-all duration-300
            ${selected === weight
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
);

const ActionButtons = ({ quantity, onQuantityChange, isWishlisted, onToggleWishlist, isDarkMode }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
    <div className={`flex items-center border rounded-lg ${
      isDarkMode ? 'border-gray-700' : 'border-gray-300'
    }`}>
      <QuantityButton onClick={() => onQuantityChange('decrease')} icon={FiMinus} isDarkMode={isDarkMode} />
      <span className={`px-6 text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {quantity}
      </span>
      <QuantityButton onClick={() => onQuantityChange('increase')} icon={FiPlus} isDarkMode={isDarkMode} />
    </div>

    <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 
                     text-white font-medium rounded-lg hover:from-blue-700 
                     hover:to-cyan-700 transition-all duration-300 transform 
                     hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-600/30
                     flex items-center justify-center gap-2">
      <FiShoppingBag className="text-lg" />
      <span>ADD TO CART</span>
    </button>

    <WishlistButton 
      isWishlisted={isWishlisted} 
      onClick={onToggleWishlist} 
      isDarkMode={isDarkMode} 
    />
  </div>
);

const QuantityButton = ({ onClick, icon: Icon, isDarkMode }) => (
  <button
    onClick={onClick}
    className={`p-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800
      ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
    aria-label="Change quantity"
  >
    <Icon className="text-sm" />
  </button>
);

const WishlistButton = ({ isWishlisted, onClick, isDarkMode }) => (
  <button
    onClick={onClick}
    className={`p-3 rounded-lg border transition-all duration-300
      ${isWishlisted
        ? 'bg-red-50 border-red-300 text-red-500 dark:bg-red-900/20 dark:border-red-700'
        : isDarkMode
          ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
          : 'border-gray-300 text-gray-600 hover:bg-gray-100'
      }`}
    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
  >
    <FiHeart className={`text-lg ${isWishlisted ? 'fill-current' : ''}`} />
  </button>
);

const DeliveryInfo = ({ isDarkMode }) => {
  const infoItems = [
    { icon: FiTruck, title: "Free Shipping", description: "On orders $50+" },
    { icon: FiRefreshCw, title: "30 Days Return", description: "Money back guarantee" },
    { icon: FiShield, title: "Secure Payment", description: "100% encrypted" },
  ];

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-lg border ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
    }`}>
      {infoItems.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <item.icon className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
          <div>
            <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              {item.title}
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const RelatedProducts = ({ products, isDarkMode }) => (
  <div className="mt-12">
    <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${
      isDarkMode ? 'text-white' : 'text-gray-900'
    }`}>
      <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></span>
      You May Also Like
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <Link 
          to={`/product/${product.id}`} 
          key={product.id} 
          className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1
            ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-500'}`}
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-24 w-full object-contain mb-2"
            loading="lazy"
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
);

export default ProductPage;