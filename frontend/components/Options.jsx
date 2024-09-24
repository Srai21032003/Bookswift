import React from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure you're using React Router

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
        <button className="btn-option" onClick={handleLogin}>
          Login
        </button>
        <button className="btn-option" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Options;
