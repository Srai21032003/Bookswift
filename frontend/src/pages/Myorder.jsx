import React from 'react';
import './Myorder.css';

const Myorder = () => {
  const orders = [
    {
      orderId: '#12345',
      date: 'September 12, 2024',
      status: 'Delivered',
      deliveryDate: 'September 15, 2024',
      total: '$29.99',
      items: [
        { title: 'Powerless', quantity: 1, image: '/assets/c2.png' }
      ]
    },
    {
      orderId: '#12346',
      date: 'October 3, 2024',
      status: 'In Progress',
      deliveryDate: 'October 10, 2024',
      total: '$15.99',
      items: [
        { title: 'Another Fiction Book', quantity: 1, image: '/assets/c1.png' }
      ]
    },
    {
      orderId: '#12347',
      date: 'August 24, 2024',
      status: 'Shipped',
      deliveryDate: 'August 30, 2024',
      total: '$19.99',
      items: [
        { title: 'Thriller Mystery', quantity: 2, image: '/assets/c3.png' }
      ]
    },
    // Add more mock orders as needed to test scrollable feature
  ];

  return (
    <div className="my-orders-container">
      <h2>My Orders</h2>
      <div className="orders-scrollable">
        {orders.map((order, index) => (
          <div key={index} className="order-card">
            <div className="order-header">
              <span className="order-id">Order {order.orderId}</span>
              <span className="order-date">Placed on {order.date}</span>
            </div>
            <div className="order-items">
              {order.items.map((item, idx) => (
                <div key={idx} className="order-item">
                  <img src={item.image} alt={item.title} />
                  <div>
                    <p>{item.title}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="order-footer">
              <p className="order-status">{order.status}</p>
              <p className="order-delivery">Estimated Delivery: {order.deliveryDate}</p>
              <p className="order-total">Total: {order.total}</p>
              <div className="order-actions">
                <button>Track Order</button>
                <button>View Details</button>
                {order.status === 'In Progress' && <button className="cancel-order">Cancel Order</button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myorder;
