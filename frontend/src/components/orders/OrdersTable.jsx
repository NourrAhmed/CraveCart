import React from "react";
import OrderDetails from "./OrderDetails";

const OrdersTable = ({ orders, expandedOrder, onToggleDetails }) => {
  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-[#800020] text-white">
            <th className="px-4 py-2 text-left">Order ID</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Total Price</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <React.Fragment key={order._id}>
                <tr className="border-b">
                  <td className="px-4 py-2">{order._id}</td>
                  <td className="px-4 py-2">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">${order.totalAmount.toFixed(2)}</td>
                  <td className="px-4 py-2 text-gray-800">{order.status}</td>
                  <td className="px-4 py-2">
                    <button
                      className="px-4 py-2 rounded-md text-[#800020]"
                      onClick={() => onToggleDetails(order._id)}
                    >
                      {expandedOrder === order._id ? (
                        <>- Hide Details</>
                      ) : (
                        <>+ View Details</>
                      )}
                    </button>
                  </td>
                </tr>
                {expandedOrder === order._id && (
                  <tr>
                    <OrderDetails order={order} />
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-4 py-2 text-center">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
