import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../assets/styles/Login.css';
import { Link } from 'react-router-dom';
import Register from './Register'

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <button type="submit" className="btn">Login</button>
          
          <div className='links'>
          <Link to = ''>Forgotten password</Link>
          <Link to = '/Register'>Sign up</Link>
          </div>
          

        </form>
      </div>
    </div>
  );
};

export default Login;
