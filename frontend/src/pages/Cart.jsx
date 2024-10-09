// import React, { useState, useEffect } from 'react';
// import { useCart } from '../contexts/cartContext';
// import './Cart.css';

// const Cart = () => {
//   const { cart, removeFromCart } = useCart();
//   const [itemDetails, setItemDetails] = useState({});

//   useEffect(() => {
//     const fetchInventoryDetails = async () => {
//       const response = await fetch('/.netlify/functions/getInventoryDetails', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ bookIds: cart.map(item => item.book_id) }),
//       });
//       const data = await response.json();
//       setItemDetails(data);
//     };
//     fetchInventoryDetails();
//   }, [cart]);

//   const handleQuantityChange = (bookId, delta) => {
//     setItemDetails(prevDetails => {
//       const currentQuantity = prevDetails[bookId]?.quantity || 1;
//       const newQuantity = Math.min(
//         Math.max(currentQuantity + delta, 1),
//         prevDetails[bookId]?.availableQuantity
//       );
//       return {
//         ...prevDetails,
//         [bookId]: { ...prevDetails[bookId], quantity: newQuantity },
//       };
//     });
//   };

//   const totalPrice = cart.reduce((acc, item) => {
//     const itemPrice = itemDetails[item.book_id]?.price || 0;
//     const itemQuantity = itemDetails[item.book_id]?.quantity || 1;
//     return acc + itemPrice * itemQuantity;
//   }, 0).toFixed(2);

//   return (
//     <div className="cart-container">
//       <h1>Your Shopping Cart</h1>
//       <div className="cart-items">
//         {cart.map((item) => (
//           <div className="cart-item" key={item.book_id}>
//             <div className="wrapper">
//               <div className="book">
//                 <div className="book__cover" style={{ backgroundImage: `url(${item.cover_img_url || '/assets/default-cover.png'})` }} />
//                 <div className="book__page"></div>
//               </div>
//             </div>
//             <div className="item-details">
//               <h3 className="item-title">{item.title}</h3>
//               <p className="item-price">${(itemDetails[item.book_id]?.price || 0).toFixed(2)}</p>
//               <div className="quantity-controls">
//                 <button onClick={() => handleQuantityChange(item.book_id, -1)}>-</button>
//                 <span>{itemDetails[item.book_id]?.quantity || 1}</span>
//                 <button onClick={() => handleQuantityChange(item.book_id, 1)}>+</button>
//               </div>
//               {/* Remove Button */}
//               <button 
//                 className="remove-btn" 
//                 onClick={() => removeFromCart(item.book_id)}>
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="total">
//         <h2>Total: ${totalPrice}</h2>
//         <button className="checkout-btn">Proceed to Checkout</button>
//       </div>
//     </div>
//   );
// };

// export default Cart;
import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/cartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const [itemDetails, setItemDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debugging: Log the cart state when the component renders
  useEffect(() => {
    console.log("Cart items:", cart);
  }, [cart]);

  useEffect(() => {
    const fetchInventoryDetails = async () => {
      try {
        console.log("Fetching inventory details for cart:", cart);

        const response = await fetch('/.netlify/functions/getInventoryDetails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ bookIds: cart.map(item => item.book_id) }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched inventory details:", data); // Debugging: Log fetched data
          setItemDetails(data);
          setLoading(false);
        } else {
          throw new Error('Failed to fetch inventory details');
        }
      } catch (error) {
        console.error("Error while fetching inventory details:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (cart.length > 0) {
      fetchInventoryDetails();
    } else {
      console.log("Cart is empty, no inventory to fetch");
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

  const totalPrice = cart.reduce((acc, item) => {
    const itemPrice = parseFloat(itemDetails[item.book_id]?.price) || 0;
    const itemQuantity = itemDetails[item.book_id]?.quantity || 1;
    return acc + itemPrice * itemQuantity;
  }, 0).toFixed(2);
  console.log("Item details:", itemDetails);
  
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
                <p className="item-price">${Number(itemDetails[item.book_id]?.price || 0).toFixed(2)}</p>
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
      {cart.length > 0 && (
        <div className="total">
          <h2>Total: ${totalPrice}</h2>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
