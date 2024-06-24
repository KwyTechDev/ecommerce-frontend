import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Checkout.css';
import Header from '../components/Header';

const Checkout = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    paymentMethod: 'creditCard',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    paypalEmail: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form data, e.g., submit to backend, handle payment, etc.
    console.log('Form submitted:', formData);
    // Optionally, redirect to a success page or update UI accordingly
  };

  return (
    <>
    <Header/>
    <div className="checkout">
      <h1>Checkout</h1>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <label htmlFor="zip">ZIP Code:</label>
        <input
          type="text"
          id="zip"
          name="zip"
          value={formData.zip}
          onChange={handleChange}
          required
        />

        <h3>Payment Method</h3>
        <div>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="creditCard"
              checked={formData.paymentMethod === 'creditCard'}
              onChange={handleChange}
            />
            Credit Card
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={formData.paymentMethod === 'paypal'}
              onChange={handleChange}
            />
            PayPal
          </label>
        </div>

        {formData.paymentMethod === 'creditCard' && (
          <div className="credit-card-info">
            <label htmlFor="cardNumber">Card Number:</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              required
            />
            <label htmlFor="expirationDate">Expiration Date (MM/YY):</label>
            <input
              type="text"
              id="expirationDate"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              required
            />
            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {formData.paymentMethod === 'paypal' && (
          <div className="paypal-info">
            <label htmlFor="paypalEmail">PayPal Email:</label>
            <input
              type="email"
              id="paypalEmail"
              name="paypalEmail"
              value={formData.paypalEmail}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <button type="submit">Place Order</button>
      </form>
      <div className="checkout-summary">
        {/* Display order summary here, e.g., items, total price */}
        {/* For simplicity, you can link back to the cart */}
        <Link to="/cart">Back to Cart</Link>
      </div>
    </div>
    </>
    
  );
};

export default Checkout;
