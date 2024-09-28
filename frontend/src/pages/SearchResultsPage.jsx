import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../components/Explore.css'; // Ensure you import the CSS for styling

const SearchResultsPage = () => {
  const location = useLocation();
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

  return (
    <div className="explore">
      <h1>Search Results</h1>
      <div className="category-menu">
        <button>All</button>
        <button>Fiction</button>
        <button>Non-Fiction</button>
        <button>Wellness</button>
        <button>Kids Books</button>
      </div>
      <div className="books-grid">
        {results.length === 0 ? (
          <p>No results found.</p>
        ) : (
          results.map((book) => (
            <div className="book" key={book.book_id}> {/* Assuming book.book_id is the unique identifier */}
              <div className="book-cover">
                <img className="book-top" src={book.cover_img_url || '/assets/c1.png'} alt={book.title} />
                <img className="book-side" src="https://raw.githubusercontent.com/atomic-variable/images-repo/e37f432405904a280858e5437ce1960753bc78a3/book-side.svg" alt="book-side" />
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
                  <p>{book.description || 'No description available.'}</p>
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
