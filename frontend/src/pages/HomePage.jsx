import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Navbarl from '../../components/Navbarl';
import Featured from '../../components/Featured';
import './HomePage.css';

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the token exists in either localStorage or sessionStorage
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    setIsLoggedIn(!!token); // Set true if token exists, false otherwise
  }, []);

  return (
    <div className="HomePage">
      {isLoggedIn ? <Navbarl /> : <Navbar />}
      <Featured />
    </div>
  );
}

export default HomePage;
