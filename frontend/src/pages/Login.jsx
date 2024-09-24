import React, { useState } from 'react';
import './Login.css';

function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const togglePassword = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (email === 'user@example.com' && password === 'password123') {
            alert('Login successful!');
            // Redirect or further logic here
        } else {
            alert('Invalid email or password!');
        }
    };

    return (
        <div className="login-container">
            <div className="logo">
                <img src="image.png" alt="Book Swift" width="200" />
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
                Don't have an account? <a href="#">Sign Up</a>
            </div>
        </div>
    );
}

export default Login;
