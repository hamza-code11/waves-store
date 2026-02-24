import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { 
  FiPlus, FiEdit2, FiTrash2, FiSearch, 
  FiChevronLeft, FiChevronRight, FiMoreVertical,
  FiFolder, FiPackage, FiEye, FiEyeOff
} from "react-icons/fi";

const ProductList = () => {
  const { isDarkMode } = useOutletContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Sample product data
  const products = [
    { 
      id: 1, 
      name: "Mr. Vapo E-liquid 30ml", 
      slug: "mr-vapo-e-liquid-30ml",
      category: "Vapes",
      subcategory: "E-Liquids",
      price: 4.50,
      stock: 156,
      status: "active",
      image: null,
      createdAt: "2024-01-15"
    },
    { 
      id: 2, 
      name: "Starter Kit Pro", 
      slug: "starter-kit-pro",
      category: "Vapes",
      subcategory: "Starter Kits",
      price: 54.00,
      stock: 89,
      status: "active",
      image: null,
      createdAt: "2024-01-14"
    },
    { 
      id: 3, 
      name: "Pod System V2", 
      slug: "pod-system-v2",
      category: "Vapes",
      subcategory: "Pod Systems",
      price: 267.00,
      stock: 34,
      status: "active",
      image: null,
      createdAt: "2024-01-13"
    },
    { 
      id: 4, 
      name: "Phone Case iPhone 15", 
      slug: "phone-case-iphone-15",
      category: "Mobile Accessories",
      subcategory: "Phone Cases",
      price: 19.99,
      stock: 245,
      status: "active",
      image: null,
      createdAt: "2024-01-12"
    },
    { 
      id: 5, 
      name: "Power Bank 10000mAh", 
      slug: "power-bank-10000mah",
      category: "Mobile Accessories",
      subcategory: "Power Banks",
      price: 35.00,
      stock: 67,
      status: "low-stock",
      image: null,
      createdAt: "2024-01-11"
    },
    { 
      id: 6, 
      name: "Wireless Charger", 
      slug: "wireless-charger",
      category: "Mobile Accessories",
      subcategory: "Chargers",
      price: 29.99,
      stock: 0,
      status: "out-of-stock",
      image: null,
      createdAt: "2024-01-10"
    },
    { 
      id: 7, 
      name: "Disposable Vape", 
      slug: "disposable-vape",
      category: "Vapes",
      subcategory: "Disposable Vapes",
      price: 12.99,
      stock: 78,
      status: "active",
      image: null,
      createdAt: "2024-01-09"
    },
    { 
      id: 8, 
      name: "E-Liquid Sampler Pack", 
      slug: "e-liquid-sampler-pack",
      category: "Vapes",
      subcategory: "E-Liquids",
      price: 24.99,
      stock: 42,
      status: "active",
      image: null,
      createdAt: "2024-01-08"
    },
    { 
      id: 9, 
      name: "USB-C Cable 2m", 
      slug: "usb-c-cable-2m",
      category: "Mobile Accessories",
      subcategory: "Cables",
      price: 9.99,
      stock: 189,
      status: "active",
      image: null,
      createdAt: "2024-01-07"
    },
    { 
      id: 10, 
      name: "Box Mod Kit", 
      slug: "box-mod-kit",
      category: "Vapes",
      subcategory: "Box Mods",
      price: 89.99,
      stock: 23,
      status: "active",
      image: null,
      createdAt: "2024-01-06"
    },
  ];

  // Filter products based on search
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Handle select all
  const handleSelectAll = () => {
    if (selectedProducts.length === currentItems.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(currentItems.map(product => product.id));
    }
  };

  // Handle select single
  const handleSelect = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(prodId => prodId !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  // Handle delete
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      console.log('Delete product:', id);
      // Add your delete logic here
    }
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) return;
    if (confirm(`Are you sure you want to delete ${selectedProducts.length} products?`)) {
      console.log('Delete products:', selectedProducts);
      setSelectedProducts([]);
      // Add your bulk delete logic here
    }
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return 'text-green-500 bg-green-500/10';
      case 'low-stock':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'out-of-stock':
        return 'text-red-500 bg-red-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  // Format price
  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Products
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage your products inventory
          </p>
        </div>
        
        <button
          onClick={() => navigate('/admin/products/create')}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base"
        >
          <FiPlus className="text-base" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex-1 relative max-w-md">
        <FiSearch className={`absolute left-3 top-2.5 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500
            ${isDarkMode
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
            }`}
        />
      </div>

      {/* Bulk Actions */}
      {selectedProducts.length > 0 && (
        <div className={`p-4 rounded-lg flex items-center justify-between
          ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {selectedProducts.length} product(s) selected
          </span>
          <button
            onClick={handleBulkDelete}
            className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
          >
            Delete Selected
          </button>
        </div>
      )}

      {/* Products Table */}
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === currentItems.length && currentItems.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                </th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>ID</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Product</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Category</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Subcategory</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Price</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Stock</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Created</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentItems.map((product) => (
                <tr key={product.id}>
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelect(product.id)}
                      className="w-4 h-4 accent-blue-600 rounded"
                    />
                  </td>
                  <td className={`p-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    #{product.id}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center
                        ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <FiPackage className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {product.name}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          {product.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className={`p-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {product.category}
                  </td>
                  <td className={`p-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {product.subcategory}
                  </td>
                  <td className={`p-4 text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {formatPrice(product.price)}
                  </td>
                  <td className={`p-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {product.stock}
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(product.status)}`}>
                      {product.status === 'active' ? 'Active' : 
                       product.status === 'low-stock' ? 'Low Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className={`p-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {new Date(product.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                        className={`p-1.5 rounded-lg transition-colors
                          ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
                      >
                        <FiEdit2 className="text-sm" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className={`p-1.5 rounded-lg transition-colors hover:bg-red-100 dark:hover:bg-red-900/20
                          ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                      >
                        <FiTrash2 className="text-sm hover:text-red-500" />
                      </button>
                      <button className={`p-1.5 rounded-lg transition-colors lg:hidden
                        ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}>
                        <FiMoreVertical className="text-sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {currentItems.length === 0 && (
          <div className={`p-8 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <FiFolder className="text-4xl mx-auto mb-3 opacity-50" />
            <p className="text-sm">No products found</p>
            <p className="text-xs mt-1">Try adjusting your search or add a new product</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={`text-sm order-2 sm:order-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} products
          </p>
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg transition-colors
                ${currentPage === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : isDarkMode
                    ? 'hover:bg-gray-700 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
            >
              <FiChevronLeft className="text-sm" />
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-lg text-sm transition-colors
                  ${currentPage === i + 1
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                    : isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg transition-colors
                ${currentPage === totalPages
                  ? 'opacity-50 cursor-not-allowed'
                  : isDarkMode
                    ? 'hover:bg-gray-700 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
            >
              <FiChevronRight className="text-sm" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;