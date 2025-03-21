import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/cartContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const [itemDetails, setItemDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchInventoryDetails = async () => {
      try {
        const response = await fetch('/.netlify/functions/getInventoryDetails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // // Pass token here if needed for inventory details
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ bookIds: cart.map(item => item.book_id) }),
        });

        if (response.ok) {
          const data = await response.json();
          setItemDetails(data);
          setLoading(false);
        } else {
          throw new Error('Failed to fetch inventory details');
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (cart.length > 0) {
      fetchInventoryDetails();
    } else {
      setLoading(false); // No cart items to fetch, stop loading
    }
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

  const handleRemoveFromCart = async (bookId) => {
    const token = localStorage.getItem('authToken')|| sessionStorage.getItem('authToken');
    if (!token) {
      console.error('No token found for remove from cart action');
      return;
    }

    await removeFromCart(bookId, token); // Pass the token to removeFromCart
  };

  const totalPrice = cart.reduce((acc, item) => {
    const itemPrice = parseFloat(itemDetails[item.book_id]?.price) || 0;
    const itemQuantity = itemDetails[item.book_id]?.quantity || 1;
    return acc + itemPrice * itemQuantity;
  }, 0).toFixed(2);

  const proceedToCheckout = () => {
    const deliveryCharge = 50; // Example delivery charge
    const platformCharge = 4.99; // Example platform charge

    // Navigate to the order page with the cart, delivery charge, and platform charge
    navigate('/order', {
      state: {
        cart,
        itemDetails,
        totalPrice,
        deliveryCharge,
        platformCharge,
      },
    });
  };

  if (loading) {
    return <p>Loading cart...</p>;
  }

  if (error) {
    return <p>Error loading cart: {error}</p>;
  }

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>
      <div className="cart-items">
        {cart.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item.book_id}>
              <div className="wrapper">
                <div className="book">
                  <div className="book__cover" style={{ backgroundImage: `url(${item.cover_img_url || '/assets/default-cover.png'})` }} />
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
                <button onClick={() => handleRemoveFromCart(item.book_id)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
      {cart.length > 0 && (
        <div className="total">
          <h2>Total: ₹{totalPrice}</h2>
          <button className="checkout-btn" onClick={proceedToCheckout}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
