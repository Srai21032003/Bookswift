import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InventoryForm.css';
import Navbar from './Navbar';
import Navbarl from './Navbarl';

function InventoryForm() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [inventory, setInventory] = useState([]); // State for inventory
    const [price, setPrice] = useState('');
    const [shopId, setShopId] = useState('');

    useEffect(() => {
        // Check if the token exists in either localStorage or sessionStorage
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
        if (token) {
            setIsLoggedIn(true);
            const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the JWT to get the payload
            setShopId(decodedToken.userId); // Using userId as shop_id
            // console.log(decodedToken.userId);
            fetchInventory(decodedToken.userId); // Fetch the inventory using userId
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const fetchInventory = async (shopId) => {
        try {
            const response = await fetch(`/.netlify/functions/getInventory?shop_id=${shopId}`);
            if (response.ok) {
                const data = await response.json();
                setInventory(data); // Set the inventory state with fetched data
            } else {
                window.alert('Failed to fetch inventory');
            }
        } catch (error) {
            window.alert(`An error occurred: ${error.message}`);
        }
    };

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
                body: JSON.stringify({ shopId, bookName, authorName, price, quantity, genre, publisher, description, img_url }),
            });

            if (response.ok) {
                // navigate('/success');
                window.alert("Book Added Successfully");
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
            {isLoggedIn ? <Navbarl /> : <Navbar />}
            <div className="inventory-container">
                <h2>Your Inventory</h2>
                <div className="inventory">
                    {inventory.length > 0 ? (
                        inventory.map((book) => (
                            <div className="inventory-book" key={book.inventory_id}>
                                <div className="inventory-book-image" style={{ backgroundImage: `url('${book.img_url}')` }}></div>
                                <div className="details">
                                    <p>{book.book_name}</p>
                                    <p>₹{parseFloat(book.price).toFixed(2)}</p>
                                    <p>{book.quantity}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No books in your inventory.</p>
                    )}
                </div>
            </div>

            <div className="inventory-register-container">
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
            </div>
        </div>
    );
}

export default InventoryForm;
