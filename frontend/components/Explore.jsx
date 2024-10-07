import React, { useEffect, useState } from 'react';
import { useCart } from '../src/contexts/cartContext'; // Import useCart hook
import './Explore.css';

const Explore = () => {
  const { addToCart } = useCart(); // Destructure addToCart from context
  const [books, setBooks] = useState([]);

  useEffect(() => {
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

  return (
    <div className="explore">
      <div className="blank"></div>
      <h1>OUR BOOKS CATALOG</h1>
      <div className="category-menu">
        <button>All</button>
        <button>Fiction</button>
        <button>Non-Fiction</button>
        <button>Wellness</button>
        <button>Kids books</button>
      </div>
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
                <img
                  className="book1-side"
                  src="https://raw.githubusercontent.com/atomic-variable/images-repo/e37f432405904a280858e5437ce1960753bc78a3/book-side.svg"
                  alt="book-side"
                />
              </div>
              <div className="preface">
                <div className="header">
                  <div className="title">{book.title}</div>
                  <div className="icon">
                    <i className="fas fa-chevron-down"></i>
                  </div>
                </div>
                <div className="author">by {book.author}</div>
                <div className="body">
                  <p>{book.description ? book.description.slice(0, 100) : 'No description available.'}...</p>
                  <button onClick={() => addToCart(book)}>
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
