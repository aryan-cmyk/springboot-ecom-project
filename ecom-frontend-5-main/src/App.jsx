import "./App.css";
import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./Context/Context";
import UpdateProduct from "./components/UpdateProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import OrderHistory from "./components/OrderHistory";
import AdminOrders from "./components/AdminOrders";
import ProductReviewsPage from "./components/ProductReviewsPage";
import AdminDashboard from "./components/AdminDashboard";


function App() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    console.log("Selected category:", category);
  };
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar onSelectCategory={handleCategorySelect}
         />
        <Routes>
          <Route
            path="/"
            element={
              <Home addToCart={addToCart} selectedCategory={selectedCategory}
              />
            }
          />
          <Route path="/add_product" element={<AddProduct />} />
          <Route path="/products" element={<Product  />} />
          <Route path="products/:id" element={<Product  />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/update/:id" element={<UpdateProduct />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/product/:productId/reviews" element={<ProductReviewsPage />} />
          <Route path="/admin/analytics" element={<AdminDashboard />}/>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
