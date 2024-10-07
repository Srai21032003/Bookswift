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
        const genre = event.target.genre.value;
        const publisher = event.target.publisher.value;
        const description = event.target.description.value;
        const img_url = event.target.img_url.value;

        try {
            const response = await fetch('/.netlify/functions/addBook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookName, authorName, price, quantity, genre, publisher, description, img_url }),
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
            <div className="inventory-container">
             <h2>Your inventory</h2>
                           <div className="inventory">
                            <div className="book1">
                                <div className="book-image" style={{ backgroundImage: `url('../assets/c1.png')` }}></div>
                          <div className="details">
                           <p>Book Title 1</p>
                           <p>$19.99</p> 
                           <p>2</p>
                           </div>
                            </div>
                            <div className="book1">
                                <div className="book-image" style={{ backgroundImage: `url('../assets/c1.png')` }}></div>
                          <div className="details">
                          <p>Book Title 1</p>
                           <p>$19.99</p> 
                           <p>2</p>
                            </div>
                            </div>
                            </div>
    
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
                    <div className="input-group">
                        <label htmlFor="genre">GENRE</label>
                        <input type="text" id="genre" name="genre" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="publisher">PUBLISHER</label>
                        <input type="text" id="publisher" name="publisher" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="description">DESCRIPTION</label>
                        <textarea id="description" name="description" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="img_url">IMAGE URL</label>
                        <input type="text" id="img_url" name="img_url" required />
                    </div>
                    <button type="submit" className="btn-register">ADD BOOK</button>
                </form>
                {/* <div className="already-added">
                    Go to your inventory <a href="#" onClick={handleInventoryRedirect}>Go to</a>
                </div> */}
            </div>
        </div>
    );
}

export default InventoryForm;
