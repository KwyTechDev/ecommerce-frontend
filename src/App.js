import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SavedItemsProvider } from './context/SavedItemsContext';
import Header from './components/Header';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Orders from './pages/Orders';
import SavedItems from './pages/SavedItems';
import productsData from './assets/db/data'; // Assuming productsData is imported here

const App = () => {
  const [query, setQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(productsData); // Initialize with all products

  // Handle input change for search query
  const handleInputChange = (event) => {
    const value = event.target.value.toLowerCase();
    setQuery(value);
    filterProducts(value);
  };

  // Filter products based on search query
  const filterProducts = (value) => {
    if (!value.trim()) {
      // If search query is empty, show all products
      setFilteredProducts(productsData);
    } else {
      // Filter products based on title containing the query
      const filtered = productsData.filter(product =>
        product.title.toLowerCase().includes(value)
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <AuthProvider>
      <SavedItemsProvider>
        <Router>
          <AuthRoutes handleInputChange={handleInputChange} /> {/* Pass handleInputChange to Header */}
        </Router>
      </SavedItemsProvider>
    </AuthProvider>
  );
};

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/login" />;
};

const AuthRoutes = ({ handleInputChange }) => {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  return (
    <>
      {isAuthenticated }
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route path="/shop" element={<PrivateRoute element={<Shop />} />} />
        <Route path="/product/:id" element={<PrivateRoute element={<ProductDetail />} />} />
        <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
        <Route path="/checkout" element={<PrivateRoute element={<Checkout />} />} />
        <Route path="/account" element={<PrivateRoute element={<Account />} />} />
        <Route path="/orders" element={<PrivateRoute element={<Orders />} />} />
        <Route path="/saved-items" element={<PrivateRoute element={<SavedItems />} />} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default App;
