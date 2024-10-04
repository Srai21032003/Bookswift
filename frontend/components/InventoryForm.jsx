import React, { useState } from 'react';
import './InventoryForm.css';
import { useNavigate } from 'react-router-dom';

function InventoryForm() {
    const navigate = useNavigate();
    const [price, setPrice] = useState('');
    
    const handleInventoryRedirect = () => {
        navigate('/Inventory-visit');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const bookName = event.target.bookName.value;
        const authorName = event.target.authorName.value;
        const price = event.target.price.value;
        const quantity = event.target.quantity.value;

        try {
            const response = await fetch('/.netlify/functions/addBook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookName, authorName, price, quantity }),
            });

            if (response.ok) {
                navigate('/success');
            } else {
                const errorData = await response.json();
                window.alert(errorData.message);
            }
        } catch (error) {
            window.alert(`An error occurred: ${error.message}`);
        }
    };

    return (
        <div className="form-layout">
            <div className="text-content">
                <div className="top">Get your shop online</div>
                <div className="head">EASE YOUR <br /> FEATURED &<br /> SHIPPING</div>
                <div className="sub-description">
                    Millions of books are offered for sale online by bookstores and booksellers on BOOK SWIFT.
                </div>
                <div className="learn-more">learn more about our terms and policy <a href="#">more</a></div>
            </div>
            <div className="register-container">
                <div className="logo">
                    <img src="/assets/logo.png" alt="Book Swift" width="200" />
                </div>
                <h2>ADD NEW BOOK</h2>
                <form id="registerForm" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="bookName">BOOK NAME</label>
                        <input type="text" id="bookName" name="bookName" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="authorName">AUTHOR NAME</label>
                        <input type="text" id="authorName" name="authorName" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="price">PRICE</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="quantity">QUANTITY</label>
                        <input type="number" id="quantity" name="quantity" required />
                    </div>
                    <button type="submit" className="btn-register">ADD BOOK</button>
                </form>
                <div className="already-added">
                    Go to your inventory <a href="#" onClick={handleInventoryRedirect}>Go to</a>
                </div>
            </div>
        </div>
    );
}

export default InventoryForm;
