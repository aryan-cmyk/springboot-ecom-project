import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:9090/api/orders");
        setOrders(response.data);
        console.log("Fetched Orders:", response.data);

      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mt-4">
      <style>
        {`
          .card {
            max-width: 100%;
            margin-bottom: 1rem;
            word-wrap: break-word;
            overflow-wrap: break-word;
          }

          .card-header,
          .card-body {
            writing-mode: horizontal-tb !important;
            text-orientation: mixed !important;
            transform: none !important;
            display: block !important;
            white-space: normal !important;
          }

          .card-header b {
            margin-right: 10px;
          }

          h2 {
            font-weight: bold;
            color: #4b4bff;
          }
        `}
      </style>

      <h2>Your Order History</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="card">
            <div className="card-header">
              <b>Order ID:</b> {order.id} | <b>Status:</b> {order.status}
            </div>
            <div className="card-body">
              <p><b>Date:</b> {new Date(order.orderTime).toLocaleString()}</p>
              <p><b>Address:</b> {order.address}</p>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.productName} - Qty: {item.quantity} - ${item.price}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
