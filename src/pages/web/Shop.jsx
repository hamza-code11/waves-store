import React, { useState, useEffect } from "react";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";
import ProductCard from "../../components/shop/ProductCard";
import FilterSidebar from "../../components/shop/FilterSidebar";
import ShopBanner from "../../components/banner/Banner"; // Import the banner component
import { FiFilter, FiX, FiChevronDown } from "react-icons/fi";

// Import actual images
import product1 from "../../assets/vapes/01.png";
import product2 from "../../assets/vapes/02.png";
import product3 from "../../assets/vapes/03.png";
import product4 from "../../assets/vapes/04.png";

const productsData = [
  {
    id: 1,
    name: "Mr. Vapo E-liquid 30ml",
    brand: "Mr.Vapo e-liquid",
    flavor: "strawberry",
    category: "Vapes",
    subCategory: "E-liquids",
    price: 4.50,
    originalPrice: 6.99,
    rating: 4,
    image: product1,
    isNew: false,
  },
  {
    id: 2,
    name: "Starter Kit 1",
    brand: "Mr.Vapo e-liquid",
    flavor: "vape-kit",
    category: "Vapes",
    subCategory: "Starter Kits",
    price: 54.00,
    originalPrice: 69.99,
    rating: 5,
    image: product2,
    isNew: false,
  },
  {
    id: 3,
    name: "Mr. Vapo Pod Kit",
    brand: "Mr.Vapo e-liquid",
    flavor: "strawberry",
    category: "Vapes",
    subCategory: "Pod Kits",
    price: 267.00,
    originalPrice: 299.99,
    rating: 4,
    image: product3,
    isNew: true,
  },
  {
    id: 4,
    name: "Mobile Charger",
    brand: "TechBrand",
    flavor: "charger",
    category: "Mobile Accessories",
    subCategory: "Chargers",
    price: 20.00,
    originalPrice: 29.99,
    rating: 4,
    image: product4,
    isNew: false,
  },
  {
    id: 5,
    name: "Wireless Earbuds",
    brand: "AudioPro",
    flavor: "wireless",
    category: "Mobile Accessories",
    subCategory: "Audio",
    price: 45.00,
    originalPrice: 59.99,
    rating: 5,
    image: product1,
    isNew: true,
  },
  {
    id: 6,
    name: "Power Bank 10000mAh",
    brand: "PowerGen",
    flavor: "10000mAh",
    category: "Mobile Accessories",
    subCategory: "Power Banks",
    price: 35.00,
    originalPrice: 49.99,
    rating: 4,
    image: product2,
    isNew: false,
  }
];

const categories = [
  {
    name: "Vapes",
    sub: ["E-liquids", "Pod Kits", "Starter Kits", "Box Mods", "Disposable"],
  },
  {
    name: "Mobile Accessories",
    sub: ["Chargers", "Cables", "Power Banks", "Phone Cases", "Audio"],
  },
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

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

  const handleSearch = () => {
    let filtered = productsData.filter((product) => {
      const categoryMatch = selectedCategory ? product.category === selectedCategory : true;
      const subCategoryMatch = selectedSubCategory ? product.subCategory === selectedSubCategory : true;
      const priceMatch = product.price >= priceRange.min && product.price <= priceRange.max;
      const searchMatch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                         product.brand.toLowerCase().includes(search.toLowerCase()) ||
                         product.flavor.toLowerCase().includes(search.toLowerCase());

      return categoryMatch && subCategoryMatch && priceMatch && searchMatch;
    });

    // Apply sorting
    if (sortBy === "price-low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    handleSearch();
  }, [selectedCategory, selectedSubCategory, priceRange, search, sortBy]);

  const handleReset = () => {
    setSelectedCategory("");
    setSelectedSubCategory("");
    setPriceRange({ min: 0, max: 500 });
    setSearch("");
    setSortBy("default");
    setFilteredProducts(productsData);
    setCurrentPage(1);
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      
      {/* Navbar */}
      <Navbar />

      {/* Shop Banner Component */}
      <ShopBanner 
        title="Shop"
        breadcrumbItems={[
          { name: "WAPO", link: "/" },
          { name: "SHOP" }
        ]}
        showStats={false}
        showButton={false}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
        
        {/* Header with Results and Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Showing {indexOfFirstProduct + 1}–{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} results
          </p>

          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`appearance-none pl-4 pr-10 py-2 rounded-lg border text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer
                         ${isDarkMode 
                           ? 'bg-gray-800 border-gray-700 text-white' 
                           : 'bg-white border-gray-300 text-gray-700'
                         }`}
              >
                <option value="default">Sort by: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <FiChevronDown className={`absolute right-3 top-3 text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`} />
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <FiFilter />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={setSelectedSubCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              search={search}
              setSearch={setSearch}
              handleSearch={handleSearch}
              handleReset={handleReset}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Mobile Filter Sidebar */}
          {isMobileFilterOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/50 flex items-start justify-end">
              <div className={`w-80 h-full overflow-y-auto p-5 ${
                isDarkMode ? 'bg-gray-900' : 'bg-white'
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Filters
                  </h2>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    <FiX className={isDarkMode ? 'text-white' : 'text-gray-700'} />
                  </button>
                </div>
                <FilterSidebar
                  categories={categories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedSubCategory={selectedSubCategory}
                  setSelectedSubCategory={setSelectedSubCategory}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  search={search}
                  setSearch={setSearch}
                  handleSearch={handleSearch}
                  handleReset={handleReset}
                  isDarkMode={isDarkMode}
                  isMobile={true}
                  onClose={() => setIsMobileFilterOpen(false)}
                />
              </div>
            </div>
          )}

          {/* Products */}
          <div className="lg:col-span-3">
            {currentProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isDarkMode={isDarkMode}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12 gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-10 h-10 rounded-lg transition-colors ${
                          currentPage === i + 1
                            ? 'bg-blue-600 text-white'
                            : isDarkMode
                              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className={`text-center py-12 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <p className="text-xl">No products found</p>
                <p className="mt-2">Try adjusting your filters</p>
                <button
                  onClick={handleReset}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Shop;