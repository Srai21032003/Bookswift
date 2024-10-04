import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogin } from '../../components/utils';

function SuccessPage() {
    const navigate = useNavigate();
    return (
        <div className="success-container">
            <h1>Registration Successful!</h1>
            <p>Thank you for registering. You can now <a href="#" onClick={() => handleLogin(navigate)}>Login</a>.</p>
        </div>
    );
}

export default SuccessPage;
