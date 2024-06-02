// src/components/CategoryCard.js
import React from 'react';
import '../assets/styles/CategoryCard.css';

function CategoryCard({ category }) {
  return (
    <div className="category-card">
      <h2>{category.name}</h2>
      <p>{category.description}</p>
    </div>
  );
}

export default CategoryCard;
