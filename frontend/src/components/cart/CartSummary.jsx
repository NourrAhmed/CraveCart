import React from "react";
import { useNavigate } from "react-router-dom";

const CartSummary = ({ subtotal, shipping, total }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#212121] text-white rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-700 my-2"></div>
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={() => navigate("/restaurants")}
        className="mt-4 w-full bg-[#800020] text-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg"
      >
        Add More Items
      </button>

      <button
        onClick={() => navigate("/checkout")}
        className="mt-6 w-full bg-[#FFE662] text-[#800020] px-4 py-2 rounded-xl shadow-md hover:shadow-lg"
      >
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;
