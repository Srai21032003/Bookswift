// import React from 'react';
// import './Explore.css';

// const Explore = () => {
//   return (
//     <div className="explore">
//       <h1>OUR BOOKS CATALOG</h1>
//       <div className="category-menu">
//         <button>All</button>
//         <button>Fiction</button>
//         <button>Non-Fiction</button>
//         <button>Wellness</button>
//         <button>Kids books</button>
//       </div>
//       <div className="book1s-grid">
//               <div className="book1">
                  
//           <div className="book1-cover">
//             <img className="book1-top" src="/assets/c1.png" alt="Art Design" />
//             <img className="book1-side" src="https://raw.githubusercontent.com/atomic-variable/images-repo/e37f432405904a280858e5437ce1960753bc78a3/book-side.svg" alt="book-side" />
//           </div>
//           <div className="preface">
//             <div className="header">
//               <div className="title">The Diary of a Young Girl</div>
//               <div className="icon">
//                 <i className="fas fa-chevron-down"></i>
//               </div>
//             </div>
//             <div className="author">by Anne Frank</div>
//             <div className="body">
//               <p>also known as The Diary of Anne Frank...</p>
//               <p>Anne calls her diary "Kitty", so almost all...</p>
//             </div>
//           </div>
//         </div>
//               {/* Add more book1 items similarly */}
//               <div className="book1">
                  
//                   <div className="book1-cover">
//                     <img className="book1-top" src="/assets/c1.png" alt="Art Design" />
//                     <img className="book1-side" src="https://raw.githubusercontent.com/atomic-variable/images-repo/e37f432405904a280858e5437ce1960753bc78a3/book-side.svg" alt="book-side" />
//                   </div>
//                   <div className="preface">
//                     <div className="header">
//                       <div className="title">The Diary of a Young Girl</div>
//                       <div className="icon">
//                         <i className="fas fa-chevron-down"></i>
//                       </div>
//                     </div>
//                     <div className="author">by Anne Frank</div>
//                     <div className="body">
//                       <p>also known as The Diary of Anne Frank...</p>
//                       <p>Anne calls her diary "Kitty", so almost all...</p>
//                     </div>
//                   </div>
//                 </div>
//       </div>
//     </div>
//   );
// };

// export default Explore;

import React, { useEffect, useState } from 'react';
import './Explore.css';

const Explore = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books from the serverless function
    const fetchBooks = async () => {
      try {
        const response = await fetch('/.netlify/functions/fetchBooks');
        if (response.ok) {
          const data = await response.json();
          setBooks(data); // Set the books state with the fetched data
        } else {
          console.error('Error fetching books:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks(); // Call the function to fetch books on component mount
  }, []);

  return (
    <div className="explore">
      <h1>OUR BOOKS CATALOG</h1>
      <div className="category-menu">
        <button>All</button>
        <button>Fiction</button>
        <button>Non-Fiction</button>
        <button>Wellness</button>
        <button>Kids books</button>
      </div>
      <div className="book1s-grid">
        {/* Check if books are available */}
        {books.length === 0 ? (
          <p>No books found.</p>
        ) : (
          books.map((book) => (
            <div className="book1" key={book.book_id}>
              <div className="book1-cover">
                <img
                  className="book1-top"
                  src={book.cover_img_url || '/assets/default-cover.png'} // Assuming the book cover URL is available
                  alt={book.title}
                />
                <img
                  className="book1-side"
                  src="https://raw.githubusercontent.com/atomic-variable/images-repo/e37f432405904a280858e5437ce1960753bc78a3/book-side.svg"
                  alt="book-side"
                />
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
                  <p>{book.description ? book.description.slice(0, 100) : 'No description available.'}...</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Explore;
