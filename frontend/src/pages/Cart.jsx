import React from 'react';
import './Cart.css'; // Make sure to create this CSS file

const Cart = () => {
    const cartItems = [
        {
            id: 1,
            title: 'Book Title 1',
            availability: 'In Stock',
            price: 19.99,
            image: '../assets/c1.png',
        },
        {
            id: 2,
            title: 'Book Title 2',
            availability: 'Out of Stock',
            price: 15.99,
            image: '../assets/c2.png',
        },
        {
            id: 3,
            title: 'Book Title 3',
            availability: 'Out of Stock',
            price: 15.99,
            image: '../assets/c3.png',
        },
    ];

    const handleShowDetails = (title) => {
        alert('Showing details for the book: ${title}');
    }

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);

    return (
        <div className="cart-container">
            <h1>Your Shopping Cart</h1>
            <div className="cart-items">
                {cartItems.map((item) => (
                    <div className="cart-item" key={item.id}>
                        <div class="wrapper">
          <div class="book">
          <div className="book__cover" style={{ backgroundImage: `url(${item.image})` }}>

            </div>
            <div class="book__page"></div>
         </div>
                            </div>
                        <div className="item-details">
                            <h3 className="item-title">{item.title}</h3>
                            <p className="item-availability">Availability: {item.availability}</p>
                            <p className="item-price">${item.price.toFixed(2)}</p>
                            <button className="show-me-btn" onClick={() => handleShowDetails(item.title)}>
                                Show Me
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="total">
                <h2>Total: ${totalPrice}</h2>
                <button className="checkout-btn">Proceed to Checkout</button>
            </div>
        </div>
    );
};

export default Cart;