import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:9090/api/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:9090/api/orders/${orderId}/status`,
        null,
        {
          params: { status: newStatus },
        }
      );
      fetchOrders();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="admin-orders-container">
      <style>{`
        .order-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          margin-bottom: 20px;
          padding: 16px;
          background-color: #ffffff;
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          font-weight: bold;
          font-size: 18px;
          margin-bottom: 10px;
        }

        .order-item {
          display: flex;
          gap: 16px;
          align-items: center;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
          margin-bottom: 10px;
        }

        .order-item-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .order-buttons {
          margin-top: 12px;
          display: flex;
          gap: 10px;
        }

        .btn {
          padding: 8px 14px;
          font-weight: bold;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .btn-warning {
          background-color: #ffc107;
        }

        .btn-success {
          background-color: #28a745;
          color: white;
        }
          






      `}</style>

      <h2 style={{ textAlign: "center", color: "black" }}>Admin - Order Management</h2>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center" }}>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <span>Order #{order.id}</span>
              <span>{order.customerEmail}</span>
            </div>

            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Items:</strong></p>

            {order.items.length === 0 ? (
              <p>No items found in this order.</p>
            ) : (
              order.items.map((item, index) => (
                <div key={index} className="order-item">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }}
                    />
                  )}
                  <div className="order-item-details">
                    <span><strong>{item.productName}</strong></span>
                    <span>Product ID: {item.productId}</span>
                    <span>Price: ${item.price}</span>
                    <span>Quantity: {item.quantity}</span>
                    <span><strong>Total: ${item.price * item.quantity}</strong></span>
                  </div>
                </div>
              ))
            )}

            <div className="order-buttons">
              <button className="btn btn-warning" onClick={() => updateStatus(order.id, "SHIPPED")}>
                Mark as Shipped
              </button>
              <button className="btn btn-success" onClick={() => updateStatus(order.id, "DELIVERED")}>
                Mark as Delivered
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;
