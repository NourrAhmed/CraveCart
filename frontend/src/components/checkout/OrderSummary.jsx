import React from "react";

const OrderSummary = ({ cartItems, total }) => {
  return (
    <div className="bg-[#212121] p-4 rounded-lg shadow-sm text-white">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      <ul>
        {cartItems.map((item) => (
          <li
            key={`${item._id}-${item.quantity}`}
            className="flex justify-between py-1"
          >
            <div className="flex items-center">
              <span>
                {item.name} x {item.quantity}
              </span>
            </div>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 border-t pt-2 text-sm">
        <div className="flex justify-between">
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
