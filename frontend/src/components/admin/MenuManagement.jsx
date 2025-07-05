import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { menuAPI } from "../../config/api";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  category: Yup.string().required("Category is required"),
});

const MenuManagement = ({ restaurant, onClose }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMenuItems();
  }, [restaurant._id]);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await menuAPI.getMenuItems(restaurant._id);
      setMenuItems(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch menu items");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await menuAPI.addMenuItem(restaurant._id, values);
      await fetchMenuItems();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add menu item");
      console.error(err);
    }
  };

  const handleDelete = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      try {
        await menuAPI.deleteMenuItem(restaurant._id, itemId);
        await fetchMenuItems();
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete menu item");
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFE662]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#2e2e2e] p-6 rounded-xl border border-[#FFE662]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-[#FFE662]">
          Menu Management - {restaurant.name}
        </h3>
        <button
          onClick={onClose}
          className="text-[#FFE662] hover:text-[#FFD700]"
        >
          Close
        </button>
      </div>

      {error && (
        <div className="bg-[#800020] text-white p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <Formik
        initialValues={{
          name: "",
          description: "",
          price: "",
          category: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4 mb-8">
            <div>
              <label className="block text-[#FFE662] mb-2">Name</label>
              <Field
                name="name"
                className="w-full p-2 rounded bg-[#1a1a1a] text-white border border-[#FFE662]"
              />
              {errors.name && touched.name && (
                <div className="text-[#800020]">{errors.name}</div>
              )}
            </div>

            <div>
              <label className="block text-[#FFE662] mb-2">Description</label>
              <Field
                name="description"
                as="textarea"
                className="w-full p-2 rounded bg-[#1a1a1a] text-white border border-[#FFE662]"
              />
              {errors.description && touched.description && (
                <div className="text-[#800020]">{errors.description}</div>
              )}
            </div>

            <div>
              <label className="block text-[#FFE662] mb-2">Price</label>
              <Field
                name="price"
                type="number"
                step="0.01"
                className="w-full p-2 rounded bg-[#1a1a1a] text-white border border-[#FFE662]"
              />
              {errors.price && touched.price && (
                <div className="text-[#800020]">{errors.price}</div>
              )}
            </div>

            <div>
              <label className="block text-[#FFE662] mb-2">Category</label>
              <Field
                name="category"
                as="select"
                className="w-full p-2 rounded bg-[#1a1a1a] text-white border border-[#FFE662]"
              >
                <option value="">Select a category</option>
                <option value="appetizer">Appetizer</option>
                <option value="main">Main Course</option>
                <option value="dessert">Dessert</option>
                <option value="beverage">Beverage</option>
              </Field>
              {errors.category && touched.category && (
                <div className="text-[#800020]">{errors.category}</div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#FFE662] text-[#212121] px-4 py-2 rounded-full hover:bg-[#FFD700] transition"
            >
              Add Menu Item
            </button>
          </Form>
        )}
      </Formik>

      <div>
        <h4 className="text-xl font-semibold text-[#FFE662] mb-4">
          Current Menu Items
        </h4>
        <div className="space-y-4">
          {menuItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center bg-[#1a1a1a] p-4 rounded-lg border border-[#FFE662]"
            >
              <div>
                <h5 className="text-lg font-semibold text-[#FFE662]">
                  {item.name}
                </h5>
                <p className="text-sm text-gray-300">{item.description}</p>
                <p className="text-sm text-gray-400">
                  ${item.price} - {item.category}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-[#800020] text-white px-3 py-1 rounded-full hover:bg-[#a0262c]"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuManagement;
