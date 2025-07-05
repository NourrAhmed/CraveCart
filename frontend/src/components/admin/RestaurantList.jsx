import React from "react";

const RestaurantList = ({ restaurants, onRemoveRestaurant, onManageMenu }) => {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-[#800020] mb-6 text-center">
        Existing Restaurants
      </h3>
      <ul className="space-y-4">
        {restaurants.map((restaurant) => (
          <li
            key={restaurant._id}
            className="flex justify-between items-center bg-[#2e2e2e] border border-[#FFE662] rounded-xl p-5 shadow hover:shadow-md transition"
          >
            <div>
              <h4 className="text-lg font-semibold text-[#FFE662]">
                {restaurant.name}
              </h4>
              <p className="text-sm text-gray-300">{restaurant.description}</p>
              <p className="text-sm text-gray-400">
                {restaurant.isActive ? "Active" : "Inactive"}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onManageMenu(restaurant)}
                className="bg-[#FFE662] text-[#212121] px-4 py-2 rounded-full hover:bg-[#FFD700] transition"
              >
                Manage Menu
              </button>
              <button
                onClick={() => onRemoveRestaurant(restaurant._id)}
                className="bg-[#800020] text-white px-4 py-2 rounded-full hover:bg-[#a0262c] transition"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
