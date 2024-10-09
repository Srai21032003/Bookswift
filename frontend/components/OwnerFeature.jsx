import React, { useState, useEffect } from 'react';
import './OwnerFeatured.css';
import { Link } from 'react-router-dom';

const OwnerFeature = () => {
    const [activeCategory, setActiveCategory] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setActiveCategory((prevCategory) => (prevCategory + 1) % 2);
      }, 3000); // Change category every 3 seconds
      return () => clearInterval(interval);
    }, []);
return(
  <div className="box1">
    <div className="Featured">
        <div className="top">Get your shop online</div>
        <div className="head">EASE YOUR <br /> FEATURED &<br /> SHIPPING</div>
        <div className="sub-description">Millions of books are offered for sale online by bookstores and booksellers on BOOK SWIFT.</div>
        <div><Link to="/AddBooks"><button id="AddNow">ADD NOW</button></Link></div>
        </div>
        <div className="model">
          <img src='../src/assets/shop2.png' alt="" />
        </div>
        <div className="catagories">
        {activeCategory === 0 && (
          <div className="catagory">
            <div><img id='catagory' src='../src/assets/cata.png' alt="" /></div>
            <div><img src='../src/assets/rectangle.png' alt="" /></div>
          </div>
        )}
        {activeCategory === 1 && (
          <div className="catagory">
            <div><img id='catagory' src='../src/assets/cata2.png' alt="" /></div>
            <div><img src='../src/assets/rectangle.png' alt="" /></div>
          </div>
        )}
      </div>
    </div>
);
};
export default OwnerFeature;