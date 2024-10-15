import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for navigation
import './Navbar.css';
import { handleExplore, handleHome } from './utils';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // State for profile dropdown
  const [username, setUsername] = useState('Name'); // State to store the username
  const [userRole, setUserRole] = useState(''); // State to store the user's role
  const dropdownRef = useRef(null); // Ref to track dropdown for outside clicks
  const navigate = useNavigate();

  // Fetch the username and userRole when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken'); // Ensure to retrieve the token
      // console.log('Token:', token);
      if (token) {
        try {
          const response = await fetch('/.netlify/functions/getUser', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`, // Send token in Authorization header
            },
          });

          const data = await response.json();
          if (response.ok) {
            setUsername(data.username); // Set the username in state
            setUserRole(data.userType); // Set the user's role in state
          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };

    fetchUser(); // Call the fetchUser function
  }, []);

  // Log userRole whenever it changes
  // useEffect(() => {
  //   console.log('User Role:', userRole);
  // }, [userRole]); // This will trigger whenever userRole is updated

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

  const handleAbout = () => {
    navigate('/about'); // Redirect to the about page
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
    // Remove the token from localStorage
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');

    // Redirect to the homepage
    navigate('/');

    // Optionally, reload the page to ensure the state is rechecked
    window.location.reload();
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
      <img src="/assets/logo.png" alt="" className='logo' onClick={() => handleHome(navigate)}/>
      <ul className="nav-links">
        <li className="nav-item" onClick={() => handleHome(navigate)}>Home</li>
        <li className="nav-item" onClick={() => handleAbout(navigate)}>About</li>
        <li className="nav-item">Features</li>
        <li className="nav-item" onClick={() => handleExplore(navigate)}>Store</li>
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
              <h4 className='dropdown-item5' id='profile-name'>{username}</h4>
              <button  className="dropdown-item" onClick={() => navigate('/myorder')}>My Orders</button>
              <button  className="dropdown-item">Saved Adresses</button>
              <button onClick={handleEditProfile} className="dropdown-item">Edit Profile</button>
              {/* Conditionally render the "Manage Store" button for bookowners */}
              {userRole === 'bookowner' && (
                <button className="dropdown-item" onClick={() => navigate('/add-to-shop')}>Manage Store</button>
              )}
              <button onClick={handleLogout} className="dropdown-item">Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
