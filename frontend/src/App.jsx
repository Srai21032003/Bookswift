import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExplorePage from '../components/Explore';
import './App.css';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import SuccessPage from './pages/SuccessPage';
import SearchResultsPage from './pages/SearchResultsPage';
import Register from './pages/Signup';
import Options from '../components/Options';
import Cart from './pages/Cart';
import About from './pages/about';
import { CartProvider } from './contexts/cartContext.jsx';
import InventoryForm from '../components/InventoryForm.jsx';
import BookInfo from '../components/BookInfo.jsx'; // Correct import
import Profile from '../src/pages/Profile.jsx'
import Tracking from '../src/pages/Tracking.jsx'
import Order from '../src/pages/Order.jsx'
import PaymentForm from './pages/PaymentForm.jsx';


function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api")
      .then(res => res.json()) // Call json() as a function
      .then(data => {
        console.log(data); // Now you should see the actual JSON data
        setData(data); // Store the data in your component state if needed
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/search-results" element={<SearchResultsPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/options" element={<Options />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/add-to-shop" element={<InventoryForm />} />
          {/* Correct path for book detail page */}
          <Route path="/book/:book_id" element={<BookInfo />} />
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/tracking' element={<Tracking />}></Route>
          <Route path='/order' element={<Order/>}></Route>
          <Route path='/card-pay' element={<PaymentForm/>}></Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
