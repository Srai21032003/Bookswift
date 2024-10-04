import React, { useState, useEffect } from 'react';
import './SearchResult.css'; // Import the CSS file for styling
import { useParams } from 'react-router-dom';

const Book = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:3000/book/${id}`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-details">
      <h1>{book.title}</h1>
      <img src={book.cover_img_url} alt={book.title} />
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Publisher:</strong> {book.publisher}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Description:</strong> {book.description}</p>
    </div>
  );
};

export default SearchResult;
