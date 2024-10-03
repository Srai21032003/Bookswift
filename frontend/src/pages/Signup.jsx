import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import { handleHome, handleLogin } from '../../components/utils';

function Signup() {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [userType, setUserType] = useState(''); // Track the selected user type

    const togglePassword = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const phone = event.target.phone.value;
        const userType = event.target['user-type'].value;
        const storeName = event.target.storeName?.value || ''; // Conditionally get store name
        const address = event.target.address?.value || ''; // Conditionally get address

        try {
            const response = await fetch('/.netlify/functions/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, phone, userType, storeName, address }),
            });

            if (response.ok) {
                navigate('/success');
            } else if (response.status === 409) {
                const errorData = await response.json();
                window.alert(errorData.message);
            } else {
                const errorData = await response.json();
                setMessage(`Registration failed: ${errorData.message}`);
            }
        } catch (error) {
            setMessage(`An error occurred: ${error.message}`);
        }
    };

    const handleUserTypeChange = (event) => {
        setUserType(event.target.value); // Update the user type when changed
    };

    return (
        <div>
            <div className="register-container">
                <div className="logo">
                    <img src="/assets/logo.png" alt="Book Swift" width="200" onClick={() => handleHome(navigate)}/>
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
                        <select id="user-type" name="user-type" onChange={handleUserTypeChange} required>
                            <option value="">Select User Type</option>
                            <option value="customer">Customer</option>
                            <option value="bookowner">Book Owner</option>
                        </select>
                    </div>

                    {/* Conditionally render extra fields if user type is 'bookowner' */}
                    {userType === 'bookowner' && (
                        <>
                            <div className="input-group">
                                <label htmlFor="storeName">STORE NAME</label>
                                <input type="text" id="storeName" name="storeName" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="address">ADDRESS</label>
                                <input type="text" id="address" name="address" required />
                            </div>
                        </>
                    )}

                    <button type="submit" className="btn-register">REGISTER</button>
                </form>
                <div className="login">
                    Already have an Account? <a href="#" onClick={() => handleLogin(navigate)}>Login</a>
                </div>
            </div>
        </div>
    );
}

export default Signup;
