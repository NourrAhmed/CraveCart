import React, { createContext, useState, useEffect } from "react";
import { restaurantAPI } from "../config/api";

export const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await restaurantAPI.getAll();
      setRestaurants(response.data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  const addRestaurant = async (restaurantData) => {
    const response = await restaurantAPI.create(restaurantData);
    setRestaurants((prev) => [...prev, response.data]);
    return response.data;
  };

  const updateRestaurant = async (id, restaurantData) => {
    const response = await restaurantAPI.update(id, restaurantData);
    setRestaurants((prev) =>
      prev.map((restaurant) =>
        restaurant._id === id ? response.data : restaurant
      )
    );
    return response.data;
  };

  const removeRestaurant = async (id) => {
    await restaurantAPI.delete(id);
    setRestaurants((prev) =>
      prev.filter((restaurant) => restaurant._id !== id)
    );
  };

  const getRestaurantById = async (id) => {
    const response = await restaurantAPI.getById(id);
    return response.data;
  };

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        loading,
        addRestaurant,
        updateRestaurant,
        removeRestaurant,
        getRestaurantById,
        fetchRestaurants,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};
