import React, { useState } from 'react';

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardHolder: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="payment-container" style={styles.container}>
      <div className="payment-header" style={styles.header}>
        <p>Your payment is securely processed..</p>
      </div>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* <div className="payment-options" style={styles.options}>
          <img src="visa.png" alt="Visa" style={styles.cardIcon} />
          <img src="mastercard.png" alt="Mastercard" style={styles.cardIcon} />
          <img src="paypal.png" alt="PayPal" style={styles.cardIcon} />
          <img src="amex.png" alt="Amex" style={styles.cardIcon} />
        </div> */}
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
              {/* Add all months as options */}
              <option value="01">01</option>
              <option value="02">02</option>
              {/* Add more months */}
            </select>
            <select
              name="expiryYear"
              value={formData.expiryYear}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value="">Year</option>
              {/* Add all valid years as options */}
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              {/* Add more years */}
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
          <p style={styles.total}>You will be charged XXXX</p>
          <button type="submit" style={styles.submitButton}>
            Pay Now
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
  options: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  cardIcon: {
    width: '50px',
    height: '30px',
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