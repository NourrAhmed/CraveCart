import React, { createContext, useState, useEffect, useContext } from "react";
import { orderAPI } from "../config/api";

const OrderContext = createContext(null);

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getUserOrders();
      setOrders(response.data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch orders");
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const addOrder = async (orderData) => {
    try {
      const response = await orderAPI.create(orderData);
      setOrders((prevOrders) => [...prevOrders, response.data]);
      setError(null);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create order");
      throw error;
    }
  };

  const getOrderById = async (id) => {
    try {
      const response = await orderAPI.getById(id);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch order");
      throw error;
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      const response = await orderAPI.updateStatus(id, status);
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === id ? response.data : order))
      );
      setError(null);
      return response.data;
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to update order status"
      );
      throw error;
    }
  };

  const searchOrders = (orderNumber) => {
    return orders.filter((order) =>
      order._id.toLowerCase().includes(orderNumber.toLowerCase())
    );
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error,
        addOrder,
        getOrderById,
        updateOrderStatus,
        searchOrders,
        fetchOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export { OrderContext };
