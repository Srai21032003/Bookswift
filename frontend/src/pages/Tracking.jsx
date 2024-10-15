import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';  // For navigation and getting passed state
import './Tracking.css';

const OrderStatus = () => {
  const location = useLocation();
  const navigate = useNavigate(); // To navigate back or track order
  
  // Check if order details are available, otherwise initialize with fallback values
  const orderData = location.state || {};
  const { order_id, order_date, status } = orderData;

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleTrackClick = () => {
    console.log('Tracking clicked');
    // Navigate to the tracking page or display the tracking information
  };

  const handleHome = () => {
    navigate('/')
    // Update order status to "Delivered" (e.g., make a backend call here)
  };

  // Convert order_date to a human-readable format
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="order-status-container">
      <div className="order-header">
        <button className="back-button" onClick={handleBackClick}>&larr;</button>
        <h2>Order Status</h2>
      </div>

      <p className='invoice'>ORDER ID: {order_id || 'N/A'}</p>
      <div className="order-content">
        {/* Vertical line container */}
        <div className="status-item1">
          <img src='../assets/book1.webp' alt="Book Icon" className="book-icon" />
        </div>

        <div className="status-line">
          <div className="status-item">
            <div className="status-icon clock-icon"></div>
            <div className="status-text">
              <h4>Order received</h4>
              <p>{order_date ? formatDate(order_date) : 'N/A'}</p>
            </div>
          </div>

          <div className="status-item">
            <div className="status-icon truck-icon"></div>
            <div className="status-text">
              <h4>On the way</h4>
              <p>{status === 'On the way' ? formatDate(order_date) : 'Expected soon'}</p>
              <button className="tracking-btn" onClick={handleTrackClick}>Tracking</button>
            </div>
          </div>

          <div className="status-item">
            <div className="status-icon check-icon"></div>
            <div className="status-text">
              <h4>Delivered</h4>
              <p>{status === 'Delivered' ? formatDate(order_date) : 'Pending Delivery'}</p>
            </div>
          </div>
        </div>
      </div>

      {status !== 'Delivered' && (
        <button className="confirm-btn" onClick={handleHome}>Go to Home</button>
      )}
    </div>
  );
};

export default OrderStatus;
