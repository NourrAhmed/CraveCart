import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import RestaurantHeader from "../components/restaurant/RestaurantHeader.jsx";
import MenuComponent from "../components/restaurant/MenuComponent.jsx";
import { menuAPI } from "../config/api";
import ReviewForm from "../components/restaurant/ReviewForm.jsx";

const RestaurantMenu = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { restaurant } = location.state || {};

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const response = await menuAPI.getMenuItems(id);
        if (response.data && Array.isArray(response.data)) {
          setMenu(response.data);
          setError(null);
        } else {
          setError("Invalid menu data received");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch menu");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMenu();
    }
  }, [id]);

  if (!restaurant) {
    return <p>Loading...</p>;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFE662]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-5 py-10">
        <RestaurantHeader restaurant={restaurant} />
        <MenuComponent menu={menu} />
        <ReviewForm restaurantId={id} />
      </div>
    </div>
  );
};

export default RestaurantMenu;
