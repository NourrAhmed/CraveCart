import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function OrderButton() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleClick = () => {
    if (user) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-[#FFE662] text-nowrap text-black ease-out px-5 py-2 mr-3 rounded-full hover:scale-110 transition-all duration-200"
    >
      Order Now
    </button>
  );
}
