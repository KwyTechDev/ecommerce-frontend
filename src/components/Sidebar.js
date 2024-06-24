import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSignInAlt, FaUserPlus, FaThLarge , FaHeart } from 'react-icons/fa';
import '../assets/styles/Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul>
        <li><Link to="/" onClick={toggleSidebar}><FaThLarge /> Shop</Link></li>
        <li><Link to="/cart" onClick={toggleSidebar}><FaShoppingCart /> Cart</Link></li>
        <li><Link to="/account" onClick={toggleSidebar}><FaUser /> Account</Link></li>
        <li><Link to="/login" onClick={toggleSidebar}><FaSignInAlt /> Login</Link></li>
        <li><Link to="/register" onClick={toggleSidebar}><FaUserPlus /> Register</Link></li>
        <li><Link to="/SavedItems" onClick={toggleSidebar}><FaHeart /> Saved Items</Link></li>
        <li><Link to="/category1" onClick={toggleSidebar}>Category 1</Link></li>
        <li><Link to="/category2" onClick={toggleSidebar}>Category 2</Link></li>
        <li><Link to="/category3" onClick={toggleSidebar}>Category 3</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
