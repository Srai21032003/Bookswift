import React, { useState } from 'react';
import './Signup.css';

function Signup() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePassword = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const phone = event.target.phone.value;
        const userType = event.target['user-type'].value;
        // Add registration logic here
        alert('Registration successful!');
    };

    return (
        <div>
            <div className="register-container">
                <div className="logo">
                    <img src="../assets/logo.png" alt="Book Swift" width="200" />
                </div>
                <h2>REGISTER</h2>
                <form id="registerForm" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">NAME</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">EMAIL</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">PASSWORD</label>
                        <div className="password-container">
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                id="password"
                                name="password"
                                required
                            />
                            <span className="toggle-password" onClick={togglePassword}>
                                👁
                            </span>
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="phone">PHONE NUMBER</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            pattern="[0-9]{10}"
                            title="Please enter a valid 10-digit phone number"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="user-type">USER TYPE</label>
                        <select id="user-type" name="user-type" required>
                            <option value="">Select User Type</option>
                            <option value="customer">Customer</option>
                            <option value="bookowner">Book Owner</option>
                        </select>
                    </div>
                    <button type="submit" className="btn-register">REGISTER</button>
                </form>
                <div className="login">
                    Already have an Account? <a href="#">Login</a>
                </div>
            </div>
        </div>
    );
}

export default Signup;
