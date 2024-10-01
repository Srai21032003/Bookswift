import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { handleRegister } from '../../components/utils';

function Login() {
    const navigate = useNavigate(); // Initialize the hook

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const togglePassword = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/.netlify/functions/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Login successful!');
                navigate('/test'); // Redirect to the home page
            } else {
                alert(data.message || 'Invalid email or password!');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="logo">
                <img src="/assets/logo.png" alt="Book Swift" width="200" />
            </div>
            <h2>LOGIN</h2>
            <form id="loginForm" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">EMAIL</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">PASSWORD</label>
                    <div className="password-container">
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span className="toggle-password" onClick={togglePassword}>
                            👁
                        </span>
                    </div>
                </div>
                <div className="actions">
                    <label>
                        <input type="checkbox" /> Keep LogIn?
                    </label>
                    <a href="#">Forgot password</a>
                </div>
                <button type="submit" className="btn-login">
                    LOGIN
                </button>
            </form>
            <div className="signup">
                Don't have an account? <a href="#" onClick={()=>handleRegister(navigate)}>Sign Up</a>
            </div>
        </div>
    );
}

export default Login;
