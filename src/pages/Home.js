import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import productsData from '../assets/db/data'; // Assuming products data is imported correctly
import '../assets/styles/Home.css';
import Header from '../components/Header';

const Home = () => {
  const [query, setQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(productsData); // Initialize with all products

  // Handle input change for search query
  const handleInputChange = (event) => {
    const value = event.target.value.toLowerCase();
    setQuery(value);
    filterProducts(value);
  };

  // Filter products based on search query
  const filterProducts = (value) => {
    if (!value.trim()) {
      // If search query is empty, show all products
      setFilteredProducts(productsData);
    } else {
      // Filter products based on title containing the query
      const filtered = productsData.filter(product =>
        product.title.toLowerCase().includes(value)
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <>
    <Header/>
    <div className="home">
      <h1>Featured Products</h1>
      <div className="home__search">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={handleInputChange}
        />
      </div>
      <div className="home__products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
    </>
    
  );
};

export default Home;
