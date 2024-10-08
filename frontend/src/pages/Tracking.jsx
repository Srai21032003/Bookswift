import React from 'react';
import './Tracking.css';

const OrderStatus = () => {
  return (
    <div className="order-status-container">
      <div className="order-header">
        <button className="back-button">&larr;</button>
        <h2>Order Status</h2>
       
      </div>
      <p className='invoice'>ORDER ID: 12A394</p>
      <div className="order-content">
        {/* Vertical line container */}
        <div className="status-item1">
            <img src='../assets/book1.webp' alt="Food Icon" className="food-icon" />
          </div>
        <div className="status-line">
        
          <div className="status-item">
            <div className="status-icon clock-icon"></div>
            <div className="status-text">
              <h4>Order received</h4>
              <p>08:00 AM, 5 May 2019</p>
            </div>
          </div>
          <div className="status-item">
            <div className="status-icon truck-icon"></div>
            <div className="status-text">
              <h4>On the way</h4>
              <p>09:00 AM, 5 May 2019</p>
              <button className="tracking-btn">Tracking</button>
            </div>
          </div>
          <div className="status-item">
            <div className="status-icon check-icon"></div>
            <div className="status-text">
              <h4>Delivered</h4>
              <p>09:30 AM, 5 May 2019</p>
            </div>
          </div>
        </div>
      </div>

      <button className="confirm-btn">Confirm Delivery</button>
    </div>
  );
};

export default OrderStatus;
