// import React from 'react';
// import './Cart.css'; // Make sure to create this CSS file

// const Cart = () => {
//     const cartItems = [
//         {
//             id: 1,
//             title: 'Book Title 1',
//             availability: 'In Stock',
//             price: 19.99,
//             image: '../assets/c1.png',
//         },
//         {
//             id: 2,
//             title: 'Book Title 2',
//             availability: 'Out of Stock',
//             price: 15.99,
//             image: '../assets/c2.png',
//         },
//         {
//             id: 3,
//             title: 'Book Title 3',
//             availability: 'Out of Stock',
//             price: 15.99,
//             image: '../assets/c3.png',
//         },
//     ];

//     const handleShowDetails = (title) => {
//         alert('Showing details for the book: ${title}');
//     }

//     const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);
//     const makepayment = async() => {
//         const stripe = await loadstripe("pk_test_51Q7ilUBHYeZiSVujy5tIu6saSOpsFOOSyQgpSj82cQ8QHNiEN5YSbgJU2QeZwJjZEvw18bMqOBTRgCziELXhvIze003SFhOQ8O");
//         const body = {
//           products:Cart
//         }
//         const headers= {
//           "content-type":"application/json"
//         }
//         const response = await fetch("http://localhost://7000/api/create-checkout-session",{
//           method:"POST",
//           headers:headers,
//           body:JSON.stringify(body)
//         });
//         const session=await response.json();
//         const result = stripe.redirectToCheckout({
//           sessionId:session.id
//         } );
//         if(result.error){
//           console.log(result.error);
//         }
//       };
//     return (
//         <div className="cart-container">
//             <h1>Your Shopping Cart</h1>
//             <div className="cart-items">
//                 {cartItems.map((item) => (
//                     <div className="cart-item" key={item.id}>
//                         <div class="wrapper">
//           <div class="book">
//           <div className="book__cover" style={{ backgroundImage: `url(${item.image})` }}>

//             </div>
//             <div class="book__page"></div>
//          </div>
//                             </div>
//                         <div className="item-details">
//                             <h3 className="item-title">{item.title}</h3>
//                             <p className="item-availability">Availability: {item.availability}</p>
//                             <p className="item-price">${item.price.toFixed(2)}</p>
//                             <button className="show-me-btn" onClick={() => handleShowDetails(item.title)}>
//                                 Show Me
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <div className="total">
//                 <h2>Total: ${totalPrice}</h2>
//                 <button className="checkout-btn"  onclick = {makepayment}>Proceed to Checkout</button>
//             </div>
//         </div>
//     );
// };

// export default Cart;

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';  // Import the loadStripe function
import './Cart.css';  // Ensure this file exists and styles are applied

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
        alert(`Showing details for the book: ${title}`);
    }

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);

    const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51Q7ilUBHYeZiSVujy5tIu6saSOpsFOOSyQgpSj82cQ8QHNiEN5YSbgJU2QeZwJjZEvw18bMqOBTRgCziELXhvIze003SFhOQ8O");
        
        const body = {
            products: cartItems  // Send cartItems instead of Cart
        };
        const headers = {
            "Content-Type": "application/json"
        };
        
        try {
            // Use correct URL for the backend (replace this with your Netlify function URL or localhost during development)
            const response = await fetch("/.netlify/functions/create-payment-intent", {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            });

            const session = await response.json();
            
            const result = await stripe.redirectToCheckout({
                sessionId: session.id
            });
            
            if (result.error) {
                console.log(result.error.message);
            }
        } catch (error) {
            console.error("Error creating checkout session:", error);
        }
    };

    return (
        <div className="cart-container">
            <h1>Your Shopping Cart</h1>
            <div className="cart-items">
                {cartItems.map((item) => (
                    <div className="cart-item" key={item.id}>
                        <div className="wrapper">
                            <div className="book">
                                <div className="book__cover" style={{ backgroundImage: `url(${item.image})` }}>
                                </div>
                                <div className="book__page"></div>
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
                <button className="checkout-btn" onClick={makePayment}>Proceed to Checkout</button>
            </div>
        </div>
    );
};

export default Cart;
