import React, { useState, useContext, useEffect } from 'react';
import { AiFillStar, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SavedItemsContext } from '../context/SavedItemsContext';
import '../assets/styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { savedItems, addSavedItem, removeSavedItem } = useContext(SavedItemsContext);
  const isSavedInitial = savedItems.some(item => item.id === product.id);
  const [isSaved, setIsSaved] = useState(isSavedInitial);

  useEffect(() => {
    setIsSaved(savedItems.some(item => item.id === product.id));
  }, [savedItems, product.id]);

  const handleSaveClick = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the heart icon
    if (isSaved) {
      removeSavedItem(product.id);
    } else {
      addSavedItem(product);
    }
    setIsSaved(!isSaved);
  };

  // Construct the path to the product detail page
  const productDetailPath = `/product/${product.id}`;

  return (
    <Link to={productDetailPath} className="product-card">
      <div className="product-card__image-container">
        <img src={product.img} alt={product.title} className="product-card__image" />
        <button className="product-card__save-btn" onClick={handleSaveClick}>
          {isSaved ? <AiFillHeart className="product-card__heart-icon saved" /> : <AiOutlineHeart className="product-card__heart-icon" />}
        </button>
      </div>
      <div className="product-card__info">
        <h2 className="product-card__title">{product.title}</h2>
        <div className="product-card__rating">
          {product.star} <AiFillStar className="rating-star" />
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
