import React, { useState } from 'react';
import '../assets/styles/Login.css/AddressForm.css';

const AddressForm = ({ onSubmit }) => {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(address);
  };

  return (
    <form className="address-form" onSubmit={handleSubmit}>
      <input type="text" name="street" value={address.street} onChange={handleChange} placeholder="Street" required />
      <input type="text" name="city" value={address.city} onChange={handleChange} placeholder="City" required />
      <input type="text" name="state" value={address.state} onChange={handleChange} placeholder="State" required />
      <input type="text" name="zip" value={address.zip} onChange={handleChange} placeholder="ZIP Code" required />
      <input type="text" name="country" value={address.country} onChange={handleChange} placeholder="Country" required />
      <button type="submit" className="btn">Save Address</button>
    </form>
  );
};

export default AddressForm;
