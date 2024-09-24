import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for navigation
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/options'); // Redirect to the options page
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li className="nav-item">Home</li>
        <li className="nav-item">About</li>
        <li className="nav-item">Features</li>
        <li className="nav-item">Store</li>
      </ul>

      <div className="search-signup">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            className="search-input"
          />
          <span className="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.9 14.32a7 7 0 111.414-1.414l4.387 4.387a1 1 0 01-1.415 1.414l-4.386-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z" clipRule="evenodd" />
            </svg>
          </span>
        </div>

        <button className="signup-button" onClick={handleSignupClick}>
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
