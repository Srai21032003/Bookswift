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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
      </Routes>
    </Router>
  );
}

export default App;