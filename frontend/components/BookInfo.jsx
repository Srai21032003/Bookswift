import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Book.css';

const BookInfo = () => {
  const { book_id } = useParams(); // Get the book_id from the route parameters
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`/.netlify/functions/fetchBookDetails?book_id=${book_id}`);
        if (response.ok) {
          const data = await response.json();
          setBookDetails(data);
        } else {
          console.error('Error fetching book details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [book_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!bookDetails) {
    return <div>Book details not found.</div>;
  }

  return (
    <div className="book-info-container">
      <div className="book-image-container">
        <img src={bookDetails.cover_img_url || '/assets/default-cover.png'} alt="Book Cover" className="book-image" />
      </div>
      <div className="book-details-container">
        <h1 className="book-title">{bookDetails.title}</h1>
        <p className="book-author">Author: {bookDetails.author}</p>
        <p className="book-publisher">Publisher: {bookDetails.publisher}</p>
        <p className="book-genre">Genre: {bookDetails.genre}</p>
        <p className="book-price">
          Price: ${bookDetails.price.toFixed(2)}
        </p>
        <p className="book-quantity">Available Quantity: {bookDetails.quantity}</p>
        <p className="book-description">{bookDetails.description}</p>
      </div>
    </div>
  );
};

export default BookInfo;
