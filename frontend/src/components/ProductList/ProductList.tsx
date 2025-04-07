import './product-list.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiForProducts } from '../../constants/globalProductsApi';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/ProductTypes';

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(apiForProducts);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <div className="hero">
        <h1>Museum of Rest</h1>
        <p>
          Discover a collection of things used by humans who have lived in 21st century. This collection is curated together with our community of curious people. This collection highlights the Products that Shaped Human Behaviour.
        </p>
      </div>
      <div className="section">
        <div className="product-list">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};
