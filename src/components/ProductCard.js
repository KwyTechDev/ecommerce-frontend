// src/components/ProductCard.js
import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../assets/styles/ProductCard.css';

const ProductCard = ({ product }) => {
  // Construct the path to the product detail page
  const productDetailPath = `/product/${product.id}`;

  return (
    <Link to={productDetailPath} className="product-card">
      <div className="product-card__image-container">
        <img src={product.img} alt={product.title} className="product-card__image" />
      </div>
      <div className="product-card__info">
        <h2 className="product-card__title">{product.title}</h2>
        <div className="product-card__rating">
          {product.star} <AiFillStar /> {/* Assuming AiFillStar is used for stars */}
          <span className="product-card__reviews">{product.reviews}</span>
        </div>
        <p className="product-card__company">{product.company}</p>
        <p className="product-card__category">{product.category}</p>
        <div className="product-card__price">
          <span className="product-card__prevPrice">{product.prevPrice}</span>
          <span className="product-card__newPrice">${product.newPrice}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
