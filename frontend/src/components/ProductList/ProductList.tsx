import './product-list.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/global';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/types';
import { PopupContribute } from '../PopupContribute/PopupContribute';
import { Button } from '../Buttons/Button';

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
        <PopupContribute
          onPopupClose={() => setIsPopupVisible(false)}
          onSuccess={fetchProducts}
        />
      )}
    </>
  );
};
