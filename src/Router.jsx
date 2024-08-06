import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Profile from "./Pages/Profile/Profile";
import Update from "./Pages/Profile/Update";
import Products from "./Pages/Product/Products";
import Register from "./Pages/Register/Register";
import Cart from "./Pages/cart/Cart";
import Login from "./Pages/Login/Login";
import SELLERRegister from "./sellerpages/Register";
import SELLERhome from "./sellerpages/Home";
import SELLERProfile from "./sellerpages/Profile";
import SELLERProduct from "./sellerpages/Products";
import SELLERLogin from "./sellerpages/Login";
import Layout_seller from "./Components/Layout_seller";
import SellerProduct from "./sellerpages/Products";
import ProductPage from "./Pages/Product/ProductPage";
import ProductLayout from "./Pages/Product/ProductLayout";

const APPRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Buyer Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="product" element={<ProductLayout />}>
            <Route path=":id/:productname" element={<ProductPage />} />
          </Route>
          <Route path="profile" element={<Profile />} />
          <Route path="register" element={<Register />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
          <Route path="update" element={<Update />} />
        </Route>

        {/* Seller Routes */}
        <Route path="/seller/*" element={<Layout_seller />}>
          <Route index element={<SELLERhome />} />
          <Route path="dashboard" element={<SELLERhome />} />
          <Route path="register" element={<SELLERRegister />} />
          <Route path="login" element={<SELLERLogin />} />
          <Route path="profile" element={<SELLERProfile />} />

          <Route path="products" element={<SellerProduct />} />
        </Route>

        {/* 404 Route */}
      </Routes>
    </Router>
  );
};

export default APPRouter;
