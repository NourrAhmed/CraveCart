import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RestaurantContext } from "../context/RestaurantContext";
import SearchRestaurant from "../components/restaurant/SearchRestaurant";
import RestaurantCard from "../components/restaurant/RestaurantCard";

const Restaurants = () => {
  const { restaurants } = useContext(RestaurantContext);
  return (
    <>
      <div className="flex justify-center items-center">
        <h1 className="text-5xl italic font-bold mb-5">Pick a Restaurant</h1>
      </div>
      <div className="mb-20">
        <SearchRestaurant />
      </div>
      <div className="flex justify-center">
        <div className="flex justify-center mb-30 w-250">
          <div className="grid max-w-fit grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-30 gap-y-30 place-items-center">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Restaurants;
