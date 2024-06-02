// src/pages/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import products from '../assets/db/data'; // Assuming products data is imported from a JSON file
import Modal from '../components/Modal'; // Import the Modal component
import '../assets/styles/ProductDetail.css'; // Import your custom CSS for ProductDetail

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for showing the modal

  // Fetch product details on component mount
  useEffect(() => {
    const fetchedProduct = products.find(prod => prod.id === parseInt(id));
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      // Simulate fetching related products (products from the same category)
      const fetchedRelatedProducts = products.filter(prod => prod.category === fetchedProduct.category && prod.id !== fetchedProduct.id);
      setRelatedProducts(fetchedRelatedProducts.slice(0, 4)); // Limit to 4 related products
    }
    // Simulate recently viewed products (store last 5 viewed products)
    const viewedProducts = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    if (!viewedProducts.some(prod => prod.id === parseInt(id))) {
      viewedProducts.unshift(fetchedProduct);
      if (viewedProducts.length > 5) {
        viewedProducts.pop();
      }
      localStorage.setItem('recentlyViewed', JSON.stringify(viewedProducts));
    }
    setRecentlyViewed(viewedProducts);
  }, [id]);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleAddToCart = () => {
    // Implement add to cart functionality here
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id && item.selectedColor === selectedColor);

    if (existingItemIndex >= 0) {
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      cartItems.push({
        ...product,
        quantity,
        selectedColor,
      });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    setShowModal(true); // Show the modal
    // Reset quantity and color after adding to cart
    setQuantity(1);
    setSelectedColor('');
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    const newComment = {
      id: comments.length + 1,
      text: comment,
      // You can add more fields like user, timestamp, etc. if needed
    };
    setComments([...comments, newComment]);
    setComment('');
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail">
      <img src={product.img} alt={product.title} className="product-detail__image" />
      <div className="product-detail__info">
        <h1 className="product-detail__title">{product.title}</h1>
        <div className="product-detail__rating">
          {product.star} <span className="rating-star">&#9733;</span> {/* Assuming product.star is the star rating */}
          <span>({product.reviews} reviews)</span>
        </div>
        <p className="product-detail__company">By {product.company}</p>
        <p className="product-detail__category">{product.category}</p>
        <div className="product-detail__price">
          <span className="product-detail__prevPrice">{product.prevPrice}</span>
          <span className="product-detail__newPrice">${product.newPrice}</span>
        </div>
        <p className="product-detail__description">
          {product.description}
        </p>

        {/* Quantity Selector */}
        <div className="product-detail__quantity">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>

        {/* Color Selector */}
        <div className="product-detail__color">
          <label htmlFor="color">Color:</label>
          <select
            id="color"
            name="color"
            value={selectedColor}
            onChange={handleColorChange}
          >
            <option value="">Select Color</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            {/* Add more color options as needed */}
          </select>
        </div>

        {/* Add to Cart Button */}
        <button className="product-detail__add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>

        {/* Comments Section */}
        <div className="product-detail__comments">
          <h2>Product Reviews & Comments</h2>
          <form onSubmit={handleSubmitComment}>
            <textarea
              id="comment"
              name="comment"
              placeholder="Write a review..."
              value={comment}
              onChange={handleCommentChange}
              rows="4"
              cols="50"
            />
            <br />
            <button type="submit">Submit</button>
          </form>
          <ul>
            {comments.map(comment => (
              <li key={comment.id}>{comment.text}</li>
            ))}
          </ul>
        </div>

        {/* Delivery and Pick-up Locations */}
        <div className="product-detail__delivery-info">
          <h2>Delivery Information</h2>
          <label htmlFor="deliveryLocation">Delivery Location:</label>
          <input type="text" id="deliveryLocation" name="deliveryLocation" placeholder="Enter your location" />

          <label htmlFor="deliveryCity">Delivery City:</label>
          <input type="text" id="deliveryCity" name="deliveryCity" placeholder="Enter your city" />

          <label htmlFor="deliveryRegion">Delivery Region:</label>
          <input type="text" id="deliveryRegion" name="deliveryRegion" placeholder="Enter your region" />

          <label htmlFor="pickStation">Pick-up Station:</label>
          <input type="text" id="pickStation" name="pickStation" placeholder="Enter pick-up station" />
        </div>

        {/* Related Products */}
        <div className="product-detail__related-products">
          <h2>You May Also Like</h2>
          <div className="related-products">
            {relatedProducts.map(related => (
              <div key={related.id} className="related-product">
                <img src={related.img} alt={related.title} />
                <p>{related.title}</p>
                <p>${related.newPrice}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Viewed Products */}
        <div className="product-detail__recently-viewed">
          <h2>Recently Viewed</h2>
          <div className="recently-viewed">
            {recentlyViewed.map(viewed => (
              <div key={viewed.id} className="viewed-product">
                <img src={viewed.img} alt={viewed.title} />
                <p>{viewed.title}</p>
                <p>${viewed.newPrice}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2>Success!</h2>
        <p>Product added to cart successfully.</p>
      </Modal>
    </div>
  );
};

export default ProductDetail;
