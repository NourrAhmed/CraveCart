import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const CartItemList = ({ items, onIncrease, onDecrease, onRemove }) => {
  return (
    <div>
      <div className="grid grid-cols-5 text-white font-semibold border-b border-gray-700 pb-2 mb-4">
        <span>Product</span>
        <span className="text-center">Price</span>
        <span className="text-center">Quantity</span>
        <span className="text-right">Subtotal</span>
        <span className="text-right">Actions</span>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item._id} className="grid grid-cols-5 items-center">
            <div className="flex items-center space-x-4">
              <span>{item.name}</span>
            </div>

            <div className="text-center">${item.price.toFixed(2)}</div>

            <div className="text-center">
              <button
                onClick={() => onDecrease(item._id)}
                className="px-2 py-1 bg-gray-700 text-white rounded-full"
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                onClick={() => onIncrease(item._id)}
                className="px-2 py-1 bg-gray-700 text-white rounded-full"
              >
                +
              </button>
            </div>

            <div className="text-right">
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            <div className="text-right">
              <button
                onClick={() => onRemove(item._id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrashAlt className="inline-block" size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItemList;
