import React from "react";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
      <button
        onClick={() => navigate("/restaurants")}
        className="bg-[#FFE662] text-[#800020] px-6 py-2 rounded-full hover:bg-[#FFD700]"
      >
        Browse Restaurants
      </button>
    </div>
  );
};

export default EmptyCart;
