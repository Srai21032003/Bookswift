import React from 'react';
import { useNavigate } from 'react-router-dom';

function SuccessPage() {
    const navigate = useNavigate();
    const handleLoginRedirect = () => {
        navigate('/login'); // Redirect to the login page
      };
    return (
        <div className="success-container">
            <h1>Registration Successful!</h1>
            <p>Thank you for registering. You can now <a href="#" onClick={handleLoginRedirect}>Login</a>.</p>
        </div>
    );
}

export default SuccessPage;
