import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../assets/styles/Register.css';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      register(email, password)
        .then(() => {
          navigate('/login'); // Redirect to login page after successful registration
        })
        .catch((error) => {
          alert("Registration failed: " + error.message);
        });
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            required 
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            required 
          />
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            placeholder="Confirm Password" 
            required 
          />
          <button type="submit" className="btn">Register</button>
          <div className='links'>
            <Link to='/forgot-password'>Forgotten password</Link>
            <Link to='/login'>Have an Account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
