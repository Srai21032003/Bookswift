import React, { useState } from 'react';
import { useCart } from '../contexts/cartContext';
import { useLocation, useNavigate } from 'react-router-dom';  // Import useNavigate
import './Cart.css';

const Order = () => {
  const { removeFromCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();  // Initialize useNavigate
  const { cart, itemDetails, totalPrice, deliveryCharge, platformCharge } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);

  const handleQuantityChange = (bookId, delta) => {
    // Handle quantity change logic
  };

  const handleConfirmOrder = async () => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (!token) {
        console.error('No token found, user is not logged in.');
        return;
    }

    const totalAmount = (parseFloat(totalPrice) + deliveryCharge + platformCharge).toFixed(2);
    const status = "Pending"; // Initial order status

    // Prepare the order data to pass to the PaymentForm
    const orderData = {
        totalAmount,
        status,
        cart, // Pass the cart for processing in PaymentForm
        token // Pass the token for authentication
    };

    // Navigate to PaymentForm with order data
    navigate('/card-pay', { state: orderData });
};


  const finalTotalPrice = (parseFloat(totalPrice) + deliveryCharge + platformCharge).toFixed(2);

  return (
    <div className="cart-container">
      <h1>Order Confirmation</h1>
      <div className="cart-items">
        {cart.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item.book_id}>
              <div className="wrapper">
                <div className="book">
                  <div className="book__cover" style={{ backgroundImage: `url(${item.cover_img_url || '/assets/default-cover.png'})` }}>
                  </div>
                  <div className="book__page"></div>
                </div>
              </div>
              <div className="item-details">
                <h3 className="item-title">{item.title}</h3>
                <p className="item-price">₹{Number(itemDetails[item.book_id]?.price || 0).toFixed(2)}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(item.book_id, -1)}>-</button>
                  <span>{itemDetails[item.book_id]?.quantity || 1}</span>
                  <button onClick={() => handleQuantityChange(item.book_id, 1)}>+</button>
                </div>
                <button onClick={() => removeFromCart(item.book_id)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="charges">
        <h2>Charges</h2>
        <p>Delivery Charge: ₹{deliveryCharge.toFixed(2)}</p>
        <p>Platform Charge: ₹{platformCharge.toFixed(2)}</p>
      </div>
      <div className="total">
        <h2>Total: ₹{finalTotalPrice}</h2>
        <button className="checkout-btn" onClick={handleConfirmOrder} disabled={isLoading}>
          {/* {isLoading ? 'Confirming...' : 'Confirm Order'} */}
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default Order;
