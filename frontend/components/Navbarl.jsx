import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for navigation
import './Navbar.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // State for profile dropdown
  const dropdownRef = useRef(null); // Ref to track dropdown for outside clicks
  const navigate = useNavigate();

  // Search function
  const handleSearch = async (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      if (searchQuery.trim() === '') {
        return; // Do nothing if the search query is empty
      }
      // Navigate to the search results page with the query
      navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Toggle profile dropdown
  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen); // Toggle the dropdown visibility
  };

  const handleSignupClick = () => {
    navigate('/options'); // Redirect to the options page
  };
  
  const handleCartClick = () => {
    navigate('/cart'); // Redirect to the cart page
  };

  const handleEditProfile = () => {
    console.log('Edit Profile Clicked');
    setIsProfileDropdownOpen(false); // Close the dropdown after clicking
  };

  const handleLogout = () => {
    console.log('Logout Clicked');
    setIsProfileDropdownOpen(false); // Close the dropdown after clicking
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false); // Close dropdown if clicked outside
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
      <nav className="navbar">
          <img src="/assets/logo.png" alt="" className='logo'/>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearch} // Handle Enter key press
          />
          <span className="search-icon" onClick={handleSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.9 14.32a7 7 0 111.414-1.414l4.387 4.387a1 1 0 01-1.415 1.414l-4.386-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z" clipRule="evenodd" />
            </svg>
          </span>
        </div>

        <div className='icon-container'>
          {/* Cart Icon */}
          <a className='w3' href="#" onClick={handleCartClick}>
            <i className="fa fa-shopping-cart" style={{ fontSize: '36px' }}></i>
          </a>

          {/* Profile Icon with Dropdown */}
          <a className='w3' href="#" onClick={toggleProfileDropdown}>
            <i className="fa fa-user" style={{ fontSize: '36px' }}></i>
          </a>

          {/* Profile Dropdown */}
          {isProfileDropdownOpen && (
                      <div className="profile-dropdown" ref={dropdownRef}>
                       <h4 className='dropdown-item' id='profile-name'> Name </h4>
              <button onClick={handleEditProfile} className="dropdown-item">Edit Profile</button>
              <button onClick={handleLogout} className="dropdown-item">Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
