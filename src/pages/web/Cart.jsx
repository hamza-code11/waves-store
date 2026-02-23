import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { FiTrash2, FiShoppingBag, FiTruck, FiShield, FiArrowRight, FiStar } from "react-icons/fi";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";
import ShopBanner from "../../components/banner/Banner"; // Import ShopBanner component

// Import images directly
import product1 from "../../assets/vapes/01.png";
import product2 from "../../assets/vapes/02.png";
import product3 from "../../assets/vapes/03.png";

// Sample cart data
const initialCartItems = [
    {
        id: 1,
        name: "Mr. Vapo E-liquid 30ml",
        brand: "Mr.Vapo e-liquid",
        flavor: "strawberry",
        price: 4.50,
        quantity: 2,
        color: "#d9b387",
        size: "30ml",
        image: product1,
    },
    {
        id: 2,
        name: "Starter Kit 1",
        brand: "Mr.Vapo e-liquid",
        flavor: "vape-kit",
        price: 54.00,
        quantity: 1,
        color: "#3b82f6",
        size: "Kit",
        image: product2,
    },
    {
        id: 3,
        name: "Mr. Vapo Pod Kit",
        brand: "Mr.Vapo e-liquid",
        flavor: "strawberry",
        price: 267.00,
        quantity: 1,
        color: "#06b6d4",
        size: "Pod",
        image: product3,
    },
];

const Cart = () => {
    const [cartItems, setCartItems] = useState(initialCartItems);
    const [discountCode, setDiscountCode] = useState("");
    const [shippingMethod, setShippingMethod] = useState("free");
    const [isDarkMode, setIsDarkMode] = useState(false);

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

    // Memoized calculations
    const subtotal = useMemo(() => 
        cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        [cartItems]
    );

    const shippingCost = useMemo(() => 
        shippingMethod === "free" ? 0 : shippingMethod === "flat" ? 5.99 : 9.99,
        [shippingMethod]
    );

    const tax = useMemo(() => subtotal * 0.1, [subtotal]);
    
    const total = useMemo(() => 
        subtotal + shippingCost + tax,
        [subtotal, shippingCost, tax]
    );

    // Optimized handlers
    const updateQuantity = useCallback((id, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    }, []);

    const removeItem = useCallback((id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    }, []);

    const applyDiscount = useCallback(() => {
        console.log("Applying discount:", discountCode);
    }, [discountCode]);

    return (
        <div className={`min-h-screen flex flex-col transition-colors duration-500 ${
            isDarkMode ? 'bg-gray-900' : 'bg-white'
        }`}>
            <Navbar />

            {/* Shop Banner Component */}
            <ShopBanner 
                title="Products Cart"
                breadcrumbItems={[
                    { name: "WAPO", link: "/" },
                    { name: "CART" }
                ]}
                showStats={false}
                showButton={false}
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
                {cartItems.length > 0 ? (
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Left Table Section */}
                        <div className="flex-1">
                            <div className={`rounded-xl overflow-hidden border ${
                                isDarkMode ? 'border-gray-700' : 'border-gray-200'
                            }`}>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className={`border-b ${
                                                isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
                                            }`}>
                                                <th className={`p-4 text-left text-xs font-semibold uppercase tracking-wider ${
                                                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                                }`}>Product</th>
                                                <th className={`p-4 text-left text-xs font-semibold uppercase tracking-wider ${
                                                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                                }`}>Flavor</th>
                                                <th className={`p-4 text-left text-xs font-semibold uppercase tracking-wider ${
                                                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                                }`}>Size</th>
                                                <th className={`p-4 text-left text-xs font-semibold uppercase tracking-wider ${
                                                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                                }`}>Price</th>
                                                <th className={`p-4 text-left text-xs font-semibold uppercase tracking-wider ${
                                                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                                }`}>Quantity</th>
                                                <th className={`p-4 text-left text-xs font-semibold uppercase tracking-wider ${
                                                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                                }`}>Total</th>
                                                <th className="p-4"></th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {cartItems.map((item) => (
                                                <tr key={item.id} className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                                                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                                                }`}>
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-16 h-16 rounded-lg overflow-hidden border ${
                                                                isDarkMode ? 'border-gray-700' : 'border-gray-200'
                                                            }`}>
                                                                <img
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                    className="w-full h-full object-cover"
                                                                    loading="lazy"
                                                                />
                                                            </div>
                                                            <div>
                                                                <h3 className="font-medium text-sm mb-1">{item.name}</h3>
                                                                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                                    {item.brand}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                            {item.flavor}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                            {item.size}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className={`text-sm font-medium ${
                                                            isDarkMode ? 'text-blue-400' : 'text-blue-600'
                                                        }`}>
                                                            ${item.price.toFixed(2)}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className={`inline-flex items-center border rounded-lg ${
                                                            isDarkMode ? 'border-gray-700' : 'border-gray-300'
                                                        }`}>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className={`px-3 py-1 text-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                                                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                                                }`}
                                                            >
                                                                -
                                                            </button>
                                                            <span className={`px-3 py-1 text-sm border-x ${
                                                                isDarkMode
                                                                    ? 'border-gray-700 text-gray-300'
                                                                    : 'border-gray-300 text-gray-700'
                                                            }`}>
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className={`px-3 py-1 text-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                                                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                                                }`}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className={`text-sm font-semibold ${
                                                            isDarkMode ? 'text-cyan-400' : 'text-cyan-600'
                                                        }`}>
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <button
                                                            onClick={() => removeItem(item.id)}
                                                            className={`p-1 rounded-full transition-colors hover:bg-red-100 dark:hover:bg-red-900/20
                                                                     ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                                                        >
                                                            <FiTrash2 className="text-lg hover:text-red-500 transition-colors" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Discount Code Section - Commented out */}
                                {/* <div className={`p-4 border-t flex flex-col sm:flex-row gap-3 ${
                                    isDarkMode ? 'border-gray-700' : 'border-gray-200'
                                }`}>
                                    <input
                                        type="text"
                                        placeholder="Discount Code"
                                        value={discountCode}
                                        onChange={(e) => setDiscountCode(e.target.value)}
                                        className={`flex-1 px-4 py-2 rounded-lg border text-sm transition-colors
                                                 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                    isDarkMode
                                                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                                }`}
                                    />
                                    <button
                                        onClick={applyDiscount}
                                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 
                                                 text-white font-medium rounded-lg hover:from-blue-700 
                                                 hover:to-cyan-700 transition-all duration-300"
                                    >
                                        Apply
                                    </button>
                                </div> */}
                            </div>

                            {/* Continue Shopping */}
                            <Link
                                to="/shop"
                                className={`inline-flex items-center gap-2 mt-4 px-6 py-2 rounded-lg transition-colors
                                           ${isDarkMode
                                                ? 'text-gray-300 hover:bg-gray-800'
                                                : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                            >
                                <FiArrowRight className="rotate-180" />
                                <span>Continue Shopping</span>
                            </Link>
                        </div>

                        {/* Right Summary Section */}
                        <div className="w-full lg:w-96">
                            <div className={`rounded-xl border p-6 sticky top-24 ${
                                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                            }`}>
                                <h3 className={`text-lg font-bold mb-4 ${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                    Order Summary
                                </h3>

                                {/* Subtotal */}
                                <div className="flex justify-between text-sm mb-3">
                                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Subtotal</span>
                                    <span className={`font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                        ${subtotal.toFixed(2)}
                                    </span>
                                </div>

                                {/* Shipping */}
                                <div className="mb-4">
                                    <h4 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Shipping
                                    </h4>
                                    <div className="space-y-2">
                                        {['free', 'flat', 'express'].map((method) => (
                                            <label key={method} className={`flex items-center justify-between text-sm p-2 rounded-lg border cursor-pointer
                                                ${shippingMethod === method
                                                    ? isDarkMode
                                                        ? 'border-blue-500 bg-blue-600/10'
                                                        : 'border-blue-500 bg-blue-50'
                                                    : isDarkMode
                                                        ? 'border-gray-700 hover:bg-gray-700/50'
                                                        : 'border-gray-200 hover:bg-gray-50'
                                                }`}>
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        name="shipping"
                                                        value={method}
                                                        checked={shippingMethod === method}
                                                        onChange={(e) => setShippingMethod(e.target.value)}
                                                        className="accent-blue-600"
                                                    />
                                                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                                                        {method === 'free' ? 'Free Shipping' : 
                                                         method === 'flat' ? 'Flat Rate' : 'Express Delivery'}
                                                    </span>
                                                </div>
                                                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                                                    ${method === 'free' ? '0.00' : method === 'flat' ? '5.99' : '9.99'}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Tax */}
                                <div className="flex justify-between text-sm mb-3 pt-3 border-t dark:border-gray-700">
                                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Tax (10%)</span>
                                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>${tax.toFixed(2)}</span>
                                </div>

                                {/* Total */}
                                <div className="flex justify-between text-base font-bold mb-4 pt-3 border-t dark:border-gray-700">
                                    <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Total</span>
                                    <span className="text-blue-600 dark:text-blue-400">${total.toFixed(2)}</span>
                                </div>

                                {/* Update Cart Button */}
                                <button className={`w-full py-3 rounded-lg text-sm font-medium mb-3 transition-colors
                                    ${isDarkMode
                                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}>
                                    Update Cart
                                </button>

                                {/* Checkout Button */}
                                <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 
                                                 text-white font-medium rounded-lg hover:from-blue-700 
                                                 hover:to-cyan-700 transition-all duration-300 transform 
                                                 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-600/30
                                                 flex items-center justify-center gap-2">
                                    <FiShoppingBag className="text-lg" />
                                    <span><Link to="/checkout">Proceed to Checkout</Link></span>
                                </button>

                                {/* Trust Badges */}
                                <div className="mt-4 pt-4 border-t dark:border-gray-700">
                                    <div className="flex items-center justify-center gap-4">
                                        <div className="flex items-center gap-1">
                                            <FiTruck className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                                            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                Free Shipping
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FiShield className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                                            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                Secure Payment
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Empty Cart State
                    <div className={`text-center py-16 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <FiShoppingBag className="text-6xl mx-auto mb-4 opacity-50" />
                        <h3 className="text-2xl font-bold mb-2">Your cart is empty</h3>
                        <p className="mb-6">Looks like you haven't added anything to your cart yet.</p>
                        <Link
                            to="/shop"
                            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 
                                     text-white font-medium rounded-lg hover:from-blue-700 
                                     hover:to-cyan-700 transition-all duration-300"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Cart;