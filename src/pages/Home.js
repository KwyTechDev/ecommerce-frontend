// src/pages/Home.js
import React from 'react';
import ProductCard from '../components/ProductCard';
import products from '../assets/db/data';
import '../assets/styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <h1>Featured Products</h1>
      <div className="home__products">
        {products && products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
