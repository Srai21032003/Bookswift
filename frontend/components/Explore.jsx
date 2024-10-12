import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import { useCart } from '../src/contexts/cartContext';
import './Explore.css';

const Explore = () => {
  const { addToCart } = useCart();
  const [books, setBooks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // useNavigate for navigation

  useEffect(() => {
    // Check if the user is logged in by checking for a token in localStorage or sessionStorage
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists

    const fetchBooks = async () => {
      try {
        const response = await fetch('/.netlify/functions/fetchBooks');
        if (response.ok) {
          const data = await response.json();
          setBooks(data);
        } else {
          console.error('Error fetching books:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`); // Navigate to book detail page
  };

  // const handleAddToCart = (book) => {
  //   if (isLoggedIn) {
  //     addToCart(book); // If user is logged in, add the item to the cart
  //   } else {
  //     alert('Please log in to add items to your cart.'); // Prompt user to log in
  //     navigate('/login'); // Navigate to login page
  //   }
  // };

  const handleAddToCart = async (book) => {
    // Retrieve token from localStorage
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    
    if (!token) {
      console.error('No token found, user is not logged in.');
      return;
    }

    try {
      const response = await fetch('/.netlify/functions/addToCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include token in Authorization header
        },
        body: JSON.stringify({ bookId: book.book_id })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Book added to cart:', data);
        if (isLoggedIn) {
          addToCart(book); // If user is logged in, add the item to the cart
        } else {
          alert('Please log in to add items to your cart.'); // Prompt user to log in
          navigate('/login'); // Navigate to login page
        }
        // addToCart(book); // Add to cart context after successful response
      } else {
        console.error('Failed to add book to cart:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="explore">
      <h1>OUR BOOKS CATALOG</h1>
      <div className="book1s-grid">
        {books.length === 0 ? (
          <p>No books found.</p>
        ) : (
          books.map((book) => (
            <div className="book1" key={book.book_id}>
              <div className="book1-cover">
                <img
                  className="book1-top"
                  src={book.cover_img_url || '/assets/default-cover.png'}
                  alt={book.title}
                />
              </div>
              <div className="preface">
                <div className="header">
                  <div
                    className="title"
                    onClick={() => handleBookClick(book.book_id)}
                  >
                    {book.title}
                  </div>
                </div>
                <div className="author">by {book.author}</div>
                <div className="body">
                  <p>{book.description.slice(0, 100)}...</p>
                  <button onClick={() => handleAddToCart(book)}>
                    <i className="fa fa-shopping-cart"></i> Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Explore;
