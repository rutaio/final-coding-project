import './product-list.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/global';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/types';
import { PopupContribute } from '../PopupContribute/PopupContribute';
import { Button } from '../Buttons/Button';
import { ProductFilters } from '../ProductFilters/ProductFilters';

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>(`${API_URL}/products/public`);
      const approvedProducts = response.data.filter(
        (product) => product.status === 'approved'
      );
      setProducts(approvedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductsByCategory = async (category: string | null) => {
    if (!category || category === 'all') {
      fetchProducts();
      return;
    }
    try {
      const response = await axios.get<Product[]>(
        `${API_URL}/products/public?category=${category}`
      );
      const approvedProducts = response.data.filter(
        (p) => p.status === 'approved'
      );
      setProducts(approvedProducts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="hero">
        <h1>How do humans rest?</h1>
        <p>
          Discover things that have shaped human behaviour and encouraged rest
          in 21st century. This collection is curated together with our
          community of curious people.
        </p>
        <Button buttonType="primary" onClick={() => setIsPopupVisible(true)}>
          Contribute
        </Button>
      </div>

      <ProductFilters onChosenCategory={fetchProductsByCategory} />

      <div className="container">
        <div className="product-list">
          {products.length === 0 ? (
            <p>No products found. Check back soon!</p>
          ) : (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
      {isPopupVisible && (
        <PopupContribute onPopupClose={() => setIsPopupVisible(false)} />
      )}
    </>
  );
};
