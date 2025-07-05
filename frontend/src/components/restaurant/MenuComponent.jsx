import React from "react";
import { useCart } from "../../context/CartContext";

const MenuComponent = ({ menu }) => {
  const { addToCart } = useCart();

  const handleAddToCart = async (menuItem) => {
    try {
      await addToCart(menuItem);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  const menuByCategory = menu.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold text-[#7A1523] mb-8">Menu</h2>
      <div className="space-y-8">
        {Object.entries(menuByCategory).map(([category, items]) => (
          <div key={category} className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-[#800020] mb-4 capitalize">
              {category}
            </h3>
            <div className="grid gap-4">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-[#800020]">
                      {item.name}
                    </h4>
                    <p className="text-gray-600 mt-1">{item.description}</p>
                    <p className="text-[#7A1523] font-semibold mt-2">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="ml-4 bg-[#FFE662] text-[#800020] px-4 py-2 rounded-full hover:bg-[#FFD700] transition-colors whitespace-nowrap"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuComponent;
