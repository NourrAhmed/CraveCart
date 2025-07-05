import React from "react";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Restaurants from "./pages/Restaurants";
import ManageRestaurant from "./pages/ManageRestaurant";
import FAQ from "./pages/FAQ";
import RestaurantMenu from "./pages/RestaurantMenu";
import ContactUs from "./pages/ContactUs";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import { RestaurantProvider } from "./context/RestaurantContext";
import { AuthProvider } from "./context/AuthContext";
import { CreditCardProvider } from "./context/CreditCardContext";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <RestaurantProvider>
            <CreditCardProvider>
              <main className="overflow-hidden">
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/restaurants" element={<Restaurants />} />
                  <Route path="/restaurant/:id" element={<RestaurantMenu />} />
                  <Route path="/admin" element={<AdminLogin />} />
                  <Route
                    path="/admin/manageRestaurant"
                    element={
                      <ProtectedRoute>
                        <ManageRestaurant />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                </Routes>
                <Footer />
              </main>
            </CreditCardProvider>
          </RestaurantProvider>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}
