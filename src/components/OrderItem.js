import React from 'react';
import './OrderItem.css';

const OrderItem = ({ item }) => {
  return (
    <div className="order-item">
      <img src={item.product.imageUrl} alt={item.product.name} />
      <div className="order-item__details">
        <h3>{item.product.name}</h3>
        <p>Quantity: {item.quantity}</p>
        <p>Price: ${item.product.price}</p>
      </div>
    </div>
  );
};

export default OrderItem;
