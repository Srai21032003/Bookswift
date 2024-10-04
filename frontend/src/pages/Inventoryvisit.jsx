import React from 'react';
import './Inventoryvisit.css';

const Inventoryvisit = () => {
    const cartItems = [
        {
            id: 1,
            title: 'Book Title 1',
            price: 19.99,
            quantity: 2,
            image: '../assets/c1.png',
        },
        {
            id: 2,
            title: 'Book Title 2',
            price: 15.99,
            quantity: 1,
            image: '../assets/c2.png',
        },
        {
            id: 3,
            title: 'Book Title 3',
            price: 22.49,
            quantity: 3,
            image: '../assets/c3.png',
        },
    ];

    return (
        <div className="cart-container">
            <h1>Your Inventory</h1>
            <table className="cart-table">
                <thead>
                    <tr>
                        <th>Book Image</th>
                        <th>Book Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <div
                                    className="book-image"
                                    style={{ backgroundImage: `url(${item.image})` }}
                                ></div>
                            </td>
                            <td>{item.title}</td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>{item.quantity}</td>
                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Inventoryvisit;
