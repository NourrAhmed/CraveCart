import React, { useState, useEffect } from "react";
import { useOrder } from "../context/OrderContext";
import OrderSearchForm from "../components/orders/OrderSearchForm";
import OrdersTable from "../components/orders/OrdersTable";

const Orders = () => {
  const { orders, searchOrders } = useOrder();
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  const handleSearch = (searchValue) => {
    if (!searchValue.trim()) {
      setFilteredOrders(orders);
    } else {
      const filtered = searchOrders(searchValue);
      setFilteredOrders(filtered.length > 0 ? filtered : []);
    }
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder((prev) => (prev === orderId ? null : orderId));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-[#212121] text-white py-4">
        <h1 className="text-3xl font-bold text-center">Order History</h1>
      </div>

      <OrderSearchForm onSearch={handleSearch} />
      <OrdersTable
        orders={filteredOrders}
        expandedOrder={expandedOrder}
        onToggleDetails={toggleOrderDetails}
      />
    </div>
  );
};

export default Orders;
