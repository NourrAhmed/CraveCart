import React from "react";
import { Link } from "react-router-dom";
import { RiShoppingBasketLine } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import CraveCartLogo from "../assets/CraveCartLogo.svg";
import OrderButton from "../components/OrderButton";

export default function Navbar() {
  const { cartItems } = useCart();
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="w-[80%] min-w-2 mx-auto my-10 bg-[#7A1523] h-15 py-6 rounded-full flex items-center justify-end gap-x-5 shadow-lg text-white/40">
      <Link to="/" className="flex items-center justify-start mr-auto ml-5">
        <img src={CraveCartLogo} alt="Crave Cart Logo" className="w-20 ml-5" />
      </Link>

      <Link
        to="/"
        className="flex items-center hover:text-white transition-all duration-200 space-x-1 text-lg"
      >
        <AiFillHome className="text-2xl" />
        <span>Home</span>
      </Link>

      <Link
        to="/account"
        className="flex items-center hover:text-white transition-all duration-200 space-x-1 text-lg"
      >
        <FaUserCircle className="text-2xl" />
        <span>My Account</span>
      </Link>

      <Link
        to="/restaurants"
        className="flex items-center hover:text-white transition-all duration-200 space-x-1 text-lg"
      >
        <MdRestaurantMenu className="text-2xl" />
        <span>Restaurants</span>
      </Link>

      <Link
        to="/admin"
        className="flex items-center hover:text-white transition-all duration-200 space-x-1 text-lg"
      >
        <FaUserShield className="text-2xl" />
        <span>Admin</span>
      </Link>

      <Link
        to="/cart"
        className="flex items-center hover:text-white transition-all duration-200 space-x-1 text-lg relative"
      >
        <RiShoppingBasketLine className="text-2xl" />
        <span>Cart</span>
        {cartItemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#FFE662] text-[#800020] text-sm rounded-full w-5 h-5 flex items-center justify-center">
            {cartItemCount}
          </span>
        )}
      </Link>
      <OrderButton />
    </nav>
  );
}
