import React, { useContext, useState } from "react";
import { RestaurantContext } from "../context/RestaurantContext";
import AddRestaurantForm from "../components/admin/AddRestaurantForm";
import RestaurantList from "../components/admin/RestaurantList";
import MenuManagement from "../components/admin/MenuManagement";

const ManageRestaurant = () => {
  const { addRestaurant, removeRestaurant, restaurants, loading } =
    useContext(RestaurantContext);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showMenuManagement, setShowMenuManagement] = useState(false);

  const handleSubmit = async (formData, { resetForm }) => {
    try {
      await addRestaurant(formData);
      alert("Restaurant added successfully!");
      resetForm();
    } catch (error) {
      alert(error.message || "Failed to add restaurant");
    }
  };

  const handleRemoveRestaurant = async (id) => {
    if (window.confirm("Are you sure you want to remove this restaurant?")) {
      try {
        await removeRestaurant(id);
        alert("Restaurant removed successfully!");
      } catch (error) {
        alert(error.message || "Failed to remove restaurant");
      }
    }
  };

  const handleManageMenu = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowMenuManagement(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFE662]"></div>
      </div>
    );
  }

  return (
    <div className="py-10 px-6 text-white">
      <div className="max-w-3xl mx-auto space-y-12">
        <AddRestaurantForm onSubmit={handleSubmit} />
        <RestaurantList
          restaurants={restaurants}
          onRemoveRestaurant={handleRemoveRestaurant}
          onManageMenu={handleManageMenu}
        />
        {showMenuManagement && selectedRestaurant && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-4xl">
              <MenuManagement
                restaurant={selectedRestaurant}
                onClose={() => {
                  setShowMenuManagement(false);
                  setSelectedRestaurant(null);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageRestaurant;
