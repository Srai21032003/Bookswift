import React from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure you're using React Router
import './Options.css';
import { handleLogin,handleRegister } from './utils';

const Options = () => {
  const navigate = useNavigate();
  return (
    <div className="options-container">
      <h2>Choose an Option</h2>
      <div className="options-buttons">
      <button className="btn-option" id='left' onClick={() => handleLogin(navigate)}>
          Login
        </button>
        <button className="btn-option" id='right' onClick={() => handleRegister(navigate)}>
          Signup
        </button>
      </div>
    </div>
  );
};

export default Options;
