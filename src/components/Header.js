import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Header.css';
import Sidebar from './Sidebar';
import Account from '../pages/Account';
import Orders from '../pages/Orders';


const Header = () => {

  


  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleAccountDropdown = () => {
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  return (
    <>
      <header className="header">
        <div className="header__hamburger" onClick={toggleSidebar}>
          ☰
        </div>
        <div className="header__logo">
          
        </div>
        <div className="header__search">
          <input type="text" placeholder="Search products, brands, categories..." />
          <button className="header__searchButton">Search</button>
        </div>
        <nav className="header__nav">
          <ul>
          <li className="header__account" onClick={toggleAccountDropdown}>
              Account
              {isAccountDropdownOpen && (
                <ul className="header__accountDropdown">
                  <li><Link to="/login" >Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                  <li><Link to="/SavedItems">Saved Items</Link></li>
                  <li><Link to="/Orders">Orders</Link></li>
                  <li><Link to="/Account">Account Settings</Link></li>
                </ul>
              )}
            </li>
            <li><Link to="/">Shop</Link></li>
            <li><Link to="/cart">Cart</Link></li>
           
          </ul>
        </nav>
      </header>
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Header;
