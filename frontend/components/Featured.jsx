{/*
import './Featured.css';
const Featured = () => {
    return (
        <div className="Featured">
            <div className="description">
                <div className="top">Fast Shipping Worldwide</div>
                <div className="head">ONE <br /> DAY <br /> DELIVERY</div>
                <div className="sub-description">Millions of books are offered for sale online by bookstores and booksellers on BOOK SWIFT.</div>
                <div><button id="shopnow">SHOP NOW</button></div>
            </div>
            <div className="model">
                <img src='../src/assets/girl.png' alt="" />
            </div>
            <div className="catagories">
                <div className="catagory">
                    <div><img id='catagory' src='../src/assets/cata.png' alt="" /></div>
                    <div><img src='../src/assets/rectangle.png' alt="" /></div>
                </div>
                <div className="catagory">
                <div><img id='catagory' src='../src/assets/cata2.png' alt="" /></div>
                    <div><img src='../src/assets/rectangle.png' alt="" /></div>
                </div>
            </div>
        </div>
    );
  };
  
export default Featured;
*/}

import React, { useState, useEffect } from 'react';
import './Featured.css';
import { Link } from 'react-router-dom';


const Featured = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory((prevCategory) => (prevCategory + 1) % 2);
    }, 3000); // Change category every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="Featured">
      <div className="description">
        <div className="top">Fast Shipping Worldwide</div>
        <div className="head">ONE <br /> DAY <br /> DELIVERY</div>
        <div className="sub-description">Millions of books are offered for sale online by bookstores and booksellers on BOOK SWIFT.</div>
        <div><Link to="/explore"><button id="shopnow">SHOP NOW</button></Link></div>
      </div>
      <div className="model">
        <img src='/assets/girl.png' alt="" />
      </div>
      <div className="catagories">
        {activeCategory === 0 && (
          <div className="catagory">
            <div><img id='catagory' src='/assets/cata.png' alt="" /></div>
            <div><img src='/assets/rectangle.png' alt="" /></div>
          </div>
        )}
        {activeCategory === 1 && (
          <div className="catagory">
            <div><img id='catagory' src='/assets/cata2.png' alt="" /></div>
            <div><img src='/assets/rectangle.png' alt="" /></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Featured;
