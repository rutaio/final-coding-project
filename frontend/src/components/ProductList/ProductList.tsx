import './product-list.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/global';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/types';
import { ContributePopup } from '../Contribute/ContributePopup';
import { Button } from '../Buttons/Button';

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="hero">
        <h1>Museum of Rest</h1>
        <p>
          Discover a collection of things used by humans who have lived in 21st
          century. This collection is curated together with our community of
          curious people. This collection highlights the Products that Shaped
          Human Behaviour.
        </p>
        <Button buttonType="primary" onClick={() => setIsPopupVisible(true)}>
          Contribute
        </Button>
      </div>
      <div className="container">
        <div className="product-list">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
      {isPopupVisible && (
        <ContributePopup
          onPopupClose={() => setIsPopupVisible(false)}
          onSuccess={fetchProducts}
        />
      )}
    </>
  );
};
