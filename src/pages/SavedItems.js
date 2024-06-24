import React, { useContext } from 'react';
import { SavedItemsContext } from '../context/SavedItemsContext';
import ProductCard from '../components/ProductCard';
import '../assets/styles/SavedItems.css'; // Add styles if necessary

const SavedItems = () => {
  const { savedItems } = useContext(SavedItemsContext);

  return (
    <div className="saved-items">
      <h1>Saved Items</h1>
      {savedItems.length > 0 ? (
        <div className="saved-items__grid">
          {savedItems.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No saved items yet.</p>
      )}
    </div>
  );
};

export default SavedItems;
