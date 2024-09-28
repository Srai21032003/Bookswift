import React from 'react';

const SearchResults = ({ results }) => {
  return (
    <div className="search-results">
      {results.length === 0 ? (
        <div>No results found.</div>
      ) : (
        <ul>
          {results.map((result) => (
            <li key={result.id}>{result.title}</li> // Assuming each result has an id and a title
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
