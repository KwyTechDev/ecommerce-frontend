import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../assets/styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => {
        navigate('/'); // Redirect to home or dashboard after successful login
      })
      .catch((error) => {
        alert("Login failed: " + error.message);
      });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
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
          <button type="submit" className="btn">Login</button>
          <div className='links'>
            <Link to='/forgot-password'>Forgotten password</Link>
            <Link to='/register'>Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
