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
      fetchOrders(); // Refresh list
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4" style={{color:"black"}}>Admin - Order Management</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="card mb-4"
            style={{
              wordBreak: "break-word",
              whiteSpace: "normal",
              writingMode: "horizontal-tb",
              width: "100%",
              maxWidth: "100%",
            }}
          >
            <div
              className="card-header fw-bold"
              style={{
                fontSize: "1.1rem",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                whiteSpace: "nowrap",
                overflowX: "auto",
              }}
            >
              <span>Order #{order.id}</span>
              <span>{order.customerEmail}</span>
            </div>

            <div className="card-body">
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Items:</strong>
              </p>

              <div className="row">
                {order.items.map((item, index) => (
                  <div key={index} className="col-md-6 mb-3">
                    <div className="card shadow-sm">
                      <div className="card-body d-flex">
                        {/* Optional Product Image */}
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.productName}
                            style={{
                              width: "80px",
                              height: "80px",
                              objectFit: "cover",
                              marginRight: "15px",
                              borderRadius: "5px",
                            }}
                          />
                        )}
                        {/* Product Info */}
                        <div>
                          <h6 className="mb-1">{item.productName}</h6>
                          {item.productId && (
                            <p className="mb-1">Product ID: {item.productId}</p>
                          )}
                          {item.price && (
                            <p className="mb-1">Price: ₹{item.price}</p>
                          )}
                          <p className="mb-1">Quantity: {item.quantity}</p>
                          {item.price && (
                            <p className="mb-0">
                              Total: ₹{item.quantity * item.price}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3">
                <button
                  className="btn btn-warning me-2"
                  onClick={() => updateStatus(order.id, "SHIPPED")}
                >
                  Mark as Shipped
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => updateStatus(order.id, "DELIVERED")}
                >
                  Mark as Delivered
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;
