// src/pages/Cart.js
import React, { useState, useEffect } from 'react';
import '../assets/styles/Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  const handleRemoveItem = (id, color) => {
    const updatedCartItems = cartItems.filter(item => !(item.id === id && item.selectedColor === color));
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
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
  };

  const handleUpdateCart = () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // Optionally, you can show a success message or modal here
  };

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map(item => (
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
              <button onClick={handleUpdateCart}>Update</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
