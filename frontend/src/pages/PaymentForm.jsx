import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const orderData = location.state || {};
    const { totalAmount, status, cart, token } = orderData;

    const [formData, setFormData] = useState({
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        cardHolder: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/.netlify/functions/confirmOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    token,
                    totalAmount,
                    status,
                    book_ids: cart.map(item => item.book_id), // Assuming multiple books
                    quantities: cart.map(item => item.quantity) // Include quantities
                }),
            });

            if (response.ok) {
                const orderDataResponse = await response.json();
                navigate('/');
                alert("Order Placed Successfully!!")
            } else {
                console.error('Failed to confirm order:', response.statusText);
            }
        } catch (error) {
            console.error('Error confirming order:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="payment-container" style={styles.container}>
            <div className="payment-header" style={styles.header}>
                <p>Your payment is securely processed..</p>
            </div>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div className="form-group">
                    <label>Card number*</label>
                    <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div className="form-group">
                    <label>Card expiration date*</label>
                    <div style={styles.expiryDate}>
                        <select
                            name="expiryMonth"
                            value={formData.expiryMonth}
                            onChange={handleChange}
                            required
                            style={styles.select}
                        >
                            <option value="">Month</option>
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i + 1} value={String(i + 1).padStart(2, '0')}>{String(i + 1).padStart(2, '0')}</option>
                            ))}
                        </select>
                        <select
                            name="expiryYear"
                            value={formData.expiryYear}
                            onChange={handleChange}
                            required
                            style={styles.select}
                        >
                            <option value="">Year</option>
                            {Array.from({ length: 10 }, (_, i) => {
                                const year = new Date().getFullYear() + i;
                                return <option key={year} value={year}>{year}</option>;
                            })}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label>CVV2/CVC2 code*</label>
                    <input
                        type="password"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div className="form-group">
                    <label>Card holder name*</label>
                    <input
                        type="text"
                        name="cardHolder"
                        value={formData.cardHolder}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div className="submit-section" style={styles.submitSection}>
                    <p style={styles.total}>You will be charged ₹{totalAmount}</p>
                    <button type="submit" style={styles.submitButton} disabled={isLoading}>
                        {isLoading ? 'Processing...' : 'Pay Now'}
                    </button>
                </div>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    header: {
        marginBottom: '20px',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        padding: '10px',
        marginBottom: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
    },
    expiryDate: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    select: {
        width: '48%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    submitSection: {
        marginTop: '20px',
        textAlign: 'center',
    },
    total: {
        marginBottom: '10px',
        fontWeight: 'bold',
    },
    submitButton: {
        padding: '12px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default PaymentForm;
