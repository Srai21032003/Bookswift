import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/cartContext';
import './Cart.css';

const Order = () => {
  const { cart, removeFromCart } = useCart(); // Destructure removeFromCart from context
  const [itemDetails, setItemDetails] = useState({});
  const [deliveryCharge] = useState(5.99); // Example flat delivery charge
  const [platformCharge] = useState(2.50); // Example platform charge

  useEffect(() => {
    const fetchInventoryDetails = async () => {
      const response = await fetch('/.netlify/functions/getInventoryDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookIds: cart.map(item => item.book_id) }),
      });
      const data = await response.json();
      setItemDetails(data);
    };
    fetchInventoryDetails();
  }, [cart]);

  const handleQuantityChange = (bookId, delta) => {
    setItemDetails(prevDetails => {
      const currentQuantity = prevDetails[bookId]?.quantity || 1;
      const newQuantity = Math.min(
        Math.max(currentQuantity + delta, 1),
        prevDetails[bookId]?.availableQuantity
      );
      return {
        ...prevDetails,
        [bookId]: { ...prevDetails[bookId], quantity: newQuantity },
      };
    });
  };

  const totalPriceWithoutCharges = cart.reduce((acc, item) => {
    const itemPrice = itemDetails[item.book_id]?.price || 0;
    const itemQuantity = itemDetails[item.book_id]?.quantity || 1;
    return acc + itemPrice * itemQuantity;
  }, 0).toFixed(2);

  const totalPrice = (parseFloat(totalPriceWithoutCharges) + deliveryCharge + platformCharge).toFixed(2);

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
                <p className="item-price">${(itemDetails[item.book_id]?.price || 0).toFixed(2)}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(item.book_id, -1)}>-</button>
                  <span>{itemDetails[item.book_id]?.quantity || 1}</span>
                  <button onClick={() => handleQuantityChange(item.book_id, 1)}>+</button>
                </div>
                <button onClick={() => removeFromCart(item.book_id)}>Remove</button> {/* Add Remove button */}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="charges">
        <h2>Charges</h2>
        <p>Delivery Charge: ${deliveryCharge.toFixed(2)}</p>
        <p>Platform Charge: ${platformCharge.toFixed(2)}</p>
      </div>
      <div className="total">
        <h2>Total: ${totalPrice}</h2>
        <button className="checkout-btn">Confirm Order</button>
      </div>
    </div>
  );
};

export default Order;
