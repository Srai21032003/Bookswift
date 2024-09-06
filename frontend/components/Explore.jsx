import React from 'react';
import './Explore.css';

const Explore = () => {
  return (
    <div className="explore">
      <h1>OUR BOOKS CATALOG</h1>
      <div className="category-menu">
        <button>All</button>
        <button>Fiction</button>
        <button>Non-Fiction</button>
        <button>Wellness</button>
        <button>Kids Books</button>
      </div>
      <div className="books-grid">
              <div className="book">
                  
          <div className="book-cover">
            <img className="book-top" src="../src/assets/c1.png" alt="Art Design" />
            <img className="book-side" src="https://raw.githubusercontent.com/atomic-variable/images-repo/e37f432405904a280858e5437ce1960753bc78a3/book-side.svg" alt="book-side" />
          </div>
          <div className="preface">
            <div className="header">
              <div className="title">The Diary of a Young Girl</div>
              <div className="icon">
                <i className="fas fa-chevron-down"></i>
              </div>
            </div>
            <div className="author">by Anne Frank</div>
            <div className="body">
              <p>also known as The Diary of Anne Frank...</p>
              <p>Anne calls her diary "Kitty", so almost all...</p>
            </div>
          </div>
        </div>
              {/* Add more book items similarly */}
              <div className="book">
                  
                  <div className="book-cover">
                    <img className="book-top" src="../src/assets/c1.png" alt="Art Design" />
                    <img className="book-side" src="https://raw.githubusercontent.com/atomic-variable/images-repo/e37f432405904a280858e5437ce1960753bc78a3/book-side.svg" alt="book-side" />
                  </div>
                  <div className="preface">
                    <div className="header">
                      <div className="title">The Diary of a Young Girl</div>
                      <div className="icon">
                        <i className="fas fa-chevron-down"></i>
                      </div>
                    </div>
                    <div className="author">by Anne Frank</div>
                    <div className="body">
                      <p>also known as The Diary of Anne Frank...</p>
                      <p>Anne calls her diary "Kitty", so almost all...</p>
                    </div>
                  </div>
                </div>
      </div>
    </div>
  );
};

export default Explore;
