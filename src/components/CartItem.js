// src/components/CartItem.js
import React from 'react';
import '../assets/styles/CartItem.css';

const CartItem = ({ item, increaseQuantity, decreaseQuantity, removeFromCart }) => {
  return (
    <div className="cart-item">
      <img src={item.img} alt={item.title} className="cart-item__image" />
      <div className="cart-item__details">
        <h3 className="cart-item__title">{item.title}</h3>
        <p className="cart-item__color">Color: {item.selectedColor}</p>
        <p className="cart-item__price">${item.price}</p>
        <div className="cart-item__quantity">
          <button className="quantity-btn" onClick={decreaseQuantity}>-</button>
          <span className="quantity">{item.quantity}</span>
          <button className="quantity-btn" onClick={increaseQuantity}>+</button>
        </div>
        <button className="remove-btn" onClick={removeFromCart}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
