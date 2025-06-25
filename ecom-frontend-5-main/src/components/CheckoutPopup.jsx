import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CheckoutPopup = ({ show, handleClose, cartItems, totalPrice, handleCheckout }) => {
  const [username, setUsername] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const sendOtp = async () => {
    try {
      const response = await fetch("http://localhost:9090/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
        credentials: "include"
      });

      const data = await response.json();
      setMessage(data.message);
      setOtpSent(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
      setMessage('Failed to send OTP. Try again.');
    }
  };

  const verifyOtpAndCheckout = async () => {
    if (!customerName || !username || !address || !otp) {
      alert("Please fill all details before placing order.");
      return;
    }

    try {
      const response = await fetch("http://localhost:9090/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
        credentials: "include"
      });

      const data = await response.json();
      setMessage(data.message);

      if (data.message.toLowerCase().includes('success')) {
        const orderPayload = {
          customerName,
          customerEmail: username,
          address,
          status: "PENDING",
          orderTime: new Date(),
          items: cartItems.map(item => ({
            productId: item.id,
            productName: item.name,
            quantity: item.quantity,
            price: item.price
          }))
        };

        const orderResponse = await fetch('http://localhost:9090/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload),
        });

        if (orderResponse.ok) {
          handleCheckout();   // clear cart & update stock
          handleClose();      // close modal
          alert("✅ Order placed successfully!");
        } else {
          alert("❌ Order could not be placed. Try again.");
        }
      } else {
        alert("❌ Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error('Error verifying OTP or placing order:', error);
      setMessage('❌ Failed to verify OTP or place order.');
    }
  };

  return (
    <div className="checkoutPopup">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="checkout-items">
            {cartItems.map((item) => (
              <div key={item.id} className="checkout-item" style={{ display: 'flex', marginBottom: '10px' }}>
                <img src={item.imageUrl} alt={item.name} style={{ width: '120px', marginRight: '10px' }} />
                <div>
                  <b><p>{item.name}</p></b>
                  <p>Qty: {item.quantity}</p>
                  <p>Subtotal: ${item.price * item.quantity}</p>
                </div>
              </div>
            ))}
            <h5 style={{ color: 'black', textAlign: 'center', fontSize: '1.3rem', fontWeight: 'bold' }}>
              Total: ${totalPrice}
            </h5>
          </div>

          {/* Customer Details */}
          <Form.Group className="mt-3">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name"
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Email or Phone</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="example@email.com or +91..."
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Delivery Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter delivery address"
            />
          </Form.Group>

          {/* OTP Section */}
          {!otpSent ? (
            <Button variant="primary" className="mt-3 w-100" onClick={sendOtp}>
              Send OTP
            </Button>
          ) : (
            <>
              <Form.Group className="mt-3">
                <Form.Label>Enter OTP</Form.Label>
                <Form.Control
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter the OTP sent to you"
                />
              </Form.Group>
              <Button variant="success" className="mt-2 w-100" onClick={verifyOtpAndCheckout}>
                Verify OTP & Confirm Order
              </Button>
            </>
          )}

          {message && (
            <div className="mt-3 text-info">
              {message}
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CheckoutPopup;
