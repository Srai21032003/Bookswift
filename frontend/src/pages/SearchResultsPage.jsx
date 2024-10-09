import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import '../../components/Explore.css';

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate for navigation
  const [results, setResults] = useState([]);

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query');
    const fetchResults = async () => {
      const response = await fetch('/.netlify/functions/searchBooks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        console.error('Error fetching search results:', response.statusText);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [location]);

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`); // Navigate on click
  };

  return (
    <div className="explore">
      <h1>Search Results</h1>
      <div className="book1s-grid">
        {results.length === 0 ? (
          <p>No results found.</p>
        ) : (
          results.map((book) => (
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
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
