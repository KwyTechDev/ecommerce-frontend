import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../assets/styles/Register.css';
import { Link } from 'react-router-dom';
import Login from './Login';

const Register = () => {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      register(email, password);
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required />
          <button type="submit" className="btn">Register</button>
          <div className='links'>
          <Link to = ''>Forgotten password</Link>
          <Link to = '/Login'>Have an Account</Link>
          </div>
          


        </form>
      </div>
    </div>
  );
};

export default Register;
