import React from 'react';
import './Book.css';

const BookInfo = () => {
  const bookDetails = {
    image:'../assets/c1.png',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    publisher: 'Scribner',
    price: 20.99,
    discount: 15,
    genre: 'Fiction',
    description:
      'The Great Gatsby is a novel written by American author F. Scott Fitzgerald. It tells the story of Jay Gatsby, a wealthy man who throws extravagant parties but hides a deep sadness.',
  };

  return (
    <div className="book-info-container">
      <div className="book-image-container">
        <img src={bookDetails.image} alt="Book Cover" className="book-image" />
      </div>
      <div className="book-details-container">
        <h1 className="book-title">{bookDetails.title}</h1>
        <p className="book-author">Author: {bookDetails.author}</p>
        <p className="book-publisher">Publisher: {bookDetails.publisher}</p>
        <p className="book-price">
          Price: ${bookDetails.price.toFixed(2)}{' '}
          <span className="book-discount">({bookDetails.discount}% off)</span>
        </p>
        <p className="book-genre">Genre: {bookDetails.genre}</p>
        <p className="book-description">{bookDetails.description}</p>
      </div>
    </div>
  );
};

export default BookInfo;
