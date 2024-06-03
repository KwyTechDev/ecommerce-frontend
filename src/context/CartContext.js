// src/context/CartContext.js

import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addCartItem = (item) => {
    setCartItems((prevCartItems) => [...prevCartItems, item]);
  };

  const removeCartItem = (id, color) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => !(item.id === id && item.selectedColor === color))
    );
  };

  const updateCartItemQuantity = (id, color, quantity) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === id && item.selectedColor === color ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.newPrice * item.quantity, 0);
  };

  const cartTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addCartItem,
        removeCartItem,
        updateCartItemQuantity,
        clearCart,
        cartTotalPrice,
        cartTotalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
