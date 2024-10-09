{/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './pages/HomePage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <HomePage />
    </div>
  )
}

export default App
*/}
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExplorePage from '../components/Explore';
import './App.css'
import { useEffect, useState } from 'react';
import Login from './pages/Login';  // Import Login Component
import SuccessPage from './pages/SuccessPage';
import SearchResultsPage from './pages/SearchResultsPage';
import Register from './pages/Signup';  // Import Register Component
import Options from '../components/Options';  // Import Options Component
import Cart from './pages/Cart';
import Test from './pages/HomePagel';
import Inventory from './pages/Inventory';
import Inventoryvisit from './pages/Inventoryvisit';
import Book from './pages/Book';
import Tracking from './pages/Tracking';
import Profile from './pages/Profile';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
function App() {
  const [data, setData] = useState(null)
  useEffect(() => { 
    fetch("http://localhost:3001/api")
    .then(res => res.json()) // Call json() as a function
    .then(data => {
      console.log(data); // Now you should see the actual JSON data
      setData(data); // Store the data in your component state if needed
    })
    .catch(err => console.log(err))
  },[])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/search-results" element={<SearchResultsPage />} /> {/* New search results page */}
          <Route path="/register" element={<Register />} />
        <Route path="/options" element={<Options />} />
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="/inventory" element={<Inventory />}></Route>
        <Route path="/inventory-visit" element={<Inventoryvisit />}></Route>
        <Route path="/book" element={<Book />}></Route>
        <Route path="/tracking" element={<Tracking />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/success" element={<Success />}></Route>
        <Route path="/cancel" element={<Cancel/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;