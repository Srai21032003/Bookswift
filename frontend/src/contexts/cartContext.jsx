// import React, { createContext, useContext, useState } from 'react';

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   const addToCart = async (book) => {
//     try {
//       const token = localStorage.getItem('authToken');
//       if (!token) {
//         console.error('No token found, user is not logged in.');
//         return;
//       }

//       const response = await fetch('/.netlify/functions/addToCart', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`, // Include token
//         },
//         body: JSON.stringify({ book_id: book.book_id }),
//       });

//       if (response.ok) {
//         const updatedCart = await response.json();
//         setCart(updatedCart); // Update the cart in context
//       } else {
//         console.error('Failed to add book to cart:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//     }
//   };

//   // New function to remove item from cart
//   const removeFromCart = async (bookId) => {
//     try {
//       const token = localStorage.getItem('authToken');
//       if (!token) {
//         console.error('No token found, user is not logged in.');
//         return;
//       }

//       const response = await fetch('/.netlify/functions/removeFromCart', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`, // Include token
//         },
//         body: JSON.stringify({ book_id: bookId }),
//       });

//       if (response.ok) {
//         const updatedCart = await response.json();
//         setCart(updatedCart); // Update the cart in context
//       } else {
//         console.error('Failed to remove book from cart:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error removing from cart:', error);
//     }
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = async (book) => {
    try {
      const token = localStorage.getItem('authToken')||sessionStorage.getItem('authToken');
      if (!token) {
        console.error('No token found, user is not logged in.');
        return;
      }

      const response = await fetch('/.netlify/functions/addToCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ book_id: book.book_id }),
      });

      if (response.ok) {
        const updatedCart = await response.json();
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      } else {
        console.error('Failed to add book to cart:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = (bookId) => {
    const updatedCart = cart.filter(item => item.book_id !== bookId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
