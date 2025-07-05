import React from "react";

const OrderDetails = ({ order }) => {
  return (
    <td colSpan="5" className="px-4 py-2 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">Order Items:</h3>
          <ul className="list-disc pl-6">
            {order.items.map((item, index) => (
              <li key={index} className="mt-2">
                {item.name} - {item.quantity} x ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Delivery Information:</h3>
          <div className="space-y-2">
            <p>
              <strong>Address:</strong> {order.deliveryAddress.street},{" "}
              {order.deliveryAddress.city}, {order.deliveryAddress.state}{" "}
              {order.deliveryAddress.zipCode}
            </p>
            <p>
              <strong>Payment Method:</strong> {order.paymentMethod}
            </p>
            <p>
              <strong>Payment Status:</strong> {order.paymentStatus}
            </p>
            <p>
              <strong>Delivery Instructions:</strong>{" "}
              {order.deliveryInstructions || "None"}
            </p>
            <p>
              <strong>Estimated Delivery:</strong>{" "}
              {new Date(order.estimatedDeliveryTime).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </td>
  );
};

export default OrderDetails;
