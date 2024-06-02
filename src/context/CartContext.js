// src/context/CartContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a context object
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};

// CartProvider component to wrap your application and provide cart functionality
export const CartProvider = ({ children }) => {
  // State to store cart items
  const [cartItems, setCartItems] = useState([]);

  // Function to add item to cart
  const addToCart = (product, quantity, selectedColor) => {
    // Check if the item is already in the cart
    const existingItem = cartItems.find(item => item.id === product.id && item.selectedColor === selectedColor);

    if (existingItem) {
      // Update quantity of existing item
      const updatedCart = cartItems.map(item =>
        item.id === product.id && item.selectedColor === selectedColor ? { ...item, quantity: item.quantity + quantity } : item
      );
      setCartItems(updatedCart);
    } else {
      // Add new item to cart
      const newItem = {
        id: product.id,
        title: product.title,
        img: product.img,
        price: product.newPrice,
        quantity,
        selectedColor,
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  // Function to remove item from cart
  const removeFromCart = (productId, selectedColor) => {
    const updatedCart = cartItems.filter(item => !(item.id === productId && item.selectedColor === selectedColor));
    setCartItems(updatedCart);
  };

  // Function to increase quantity of item in cart
  const increaseQuantity = (productId, selectedColor) => {
    const updatedCart = cartItems.map(item =>
      item.id === productId && item.selectedColor === selectedColor ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  // Function to decrease quantity of item in cart
  const decreaseQuantity = (productId, selectedColor) => {
    const updatedCart = cartItems.map(item =>
      item.id === productId && item.selectedColor === selectedColor && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCart);
  };

  // Function to calculate total price of items in cart
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Value provided by CartContext.Provider
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
