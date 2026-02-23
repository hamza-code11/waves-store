import { Routes, Route } from "react-router-dom";
import Home from "./pages/web/Home";
import Shop from "./pages/web/Shop";
import Cart from "./pages/web/Cart";
import Checkout from "./pages/web/Checkout";
import Contact from "./pages/web/Contact";
import Product from "./pages/web/ProductPage";
import SignIn from "./pages/web/SignIn";
import Register from "./pages/web/Register";
import About from "./pages/web/About";


import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/product" element={<Product />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        {/* <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="inventory" element={<AdminInventory />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="reviews" element={<AdminReviews />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="settings" element={<AdminSettings />} /> */}
      </Route>
    </Routes>
  );
};

export default App;
