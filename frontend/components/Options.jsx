import React from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure you're using React Router
import './Options.css'

const Options = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login'); // Redirect to Login component
  };

  const handleRegister = () => {
    navigate('/register'); // Redirect to Register component
  };

  return (
    <div className="options-container">
      <h2>Choose an Option</h2>
      <div className="options-buttons">
        <button className="btn-option" id='left' onClick={handleLogin}>
          Login
        </button>
        <button className="btn-option" id='right' onClick={handleRegister}>
          Signup
        </button>
      </div>
    </div>
  );
};

export default Options;
