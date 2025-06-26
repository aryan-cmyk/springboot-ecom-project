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
      <style>{`
        .order-card {
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.06);
          background-color: #ffffff;
        }

        .order-header {
          font-weight: bold;
          font-size: 1.2rem;
          display: flex;
          justify-content: space-between;
          color: #343a40;
          margin-bottom: 12px;
        }

        .order-meta {
          color: #555;
          font-size: 0.95rem;
          margin-bottom: 10px;
        }

        .order-items-container {
          display: flex;
          flex-wrap: nowrap;
          overflow-x: auto;
          gap: 16px;
          padding-top: 8px;
          padding-bottom: 4px;
        }

        .order-item-card {
          min-width: 220px;
          flex: 0 0 auto;
          border: 1px solid #ccc;
          border-radius: 10px;
          padding: 12px;
          background-color: #f8f9fa;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .order-item-card h6 {
          font-size: 1rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }

        .order-item-card p {
          font-size: 0.9rem;
          color: #555;
          margin-bottom: 4px;
        }

        .order-history-title {
          font-size: 1.75rem;
          font-weight: bold;
          margin-bottom: 20px;
          color: #4b4bff;
        }

        /* Scrollbar for horizontal scroll */
        .order-items-container::-webkit-scrollbar {
          height: 8px;
        }

        .order-items-container::-webkit-scrollbar-thumb {
          background: #aaa;
          border-radius: 4px;
        }
      `}</style>

      <h2 className="order-history-title">Your Order History</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <span>Order #{order.id}</span>
              <span>Status: {order.status}</span>
            </div>

            <div className="order-meta">
              <p><strong>Date:</strong> {new Date(order.orderTime).toLocaleString()}</p>
              <p><strong>Address:</strong> {order.address}</p>
            </div>

            <div className="order-items-container">
              {order.items?.map((item, index) => (
                <div key={index} className="order-item-card">
                  <h6>{item.productName}</h6>
                  <p>Product ID: {item.productId}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price}</p>
                  <p><strong>Total: ${item.quantity * item.price}</strong></p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
