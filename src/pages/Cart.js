import React, { useState, useEffect } from 'react';
import '../assets/styles/Cart.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
    calculateTotals(storedCartItems);
  }, []);

  const calculateTotals = (items) => {
    let totalPrice = 0;
    let totalQuantity = 0;
    items.forEach(item => {
      totalPrice += item.newPrice * item.quantity;
      totalQuantity += item.quantity;
    });
    setTotalPrice(totalPrice);
    setTotalQuantity(totalQuantity);
  };

  const handleRemoveItem = (id, color) => {
    const updatedCartItems = cartItems.filter(item => !(item.id === id && item.selectedColor === color));
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    calculateTotals(updatedCartItems);
  };

  const handleQuantityChange = (e, id, color) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === id && item.selectedColor === color) {
        return { ...item, quantity: parseInt(e.target.value) };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    calculateTotals(updatedCartItems);
  };

  const handleUpdateCart = () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  const handleCheckout = () => {
    localStorage.setItem('checkoutCartItems', JSON.stringify(cartItems));
    localStorage.setItem('checkoutTotalPrice', totalPrice.toFixed(2));
    localStorage.setItem('checkoutTotalQuantity', totalQuantity);
    navigate('/checkout'); // Use navigate to redirect
  };

  return (
    <>
    <Header/>
    <div className="cart">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id + item.selectedColor} className="cart-item">
              <img src={item.img} alt={item.title} className="cart-item__image" />
              <div className="cart-item__details">
                <h2>{item.title}</h2>
                <p>Color: {item.selectedColor}</p>
                <p>Price: ${item.newPrice}</p>
                <label htmlFor={`quantity-${item.id}-${item.selectedColor}`}>Quantity:</label>
                <input
                  type="number"
                  id={`quantity-${item.id}-${item.selectedColor}`}
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(e, item.id, item.selectedColor)}
                  min="1"
                />
                <button onClick={() => handleRemoveItem(item.id, item.selectedColor)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <p>Total Quantity: {totalQuantity}</p>
            <button onClick={handleCheckout}>Checkout</button>
            <button onClick={handleUpdateCart}>Update Cart</button>
          </div>
        </>
      )}
    </div>
    </>
    
  );
};

export default Cart;
