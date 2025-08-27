import './product-list.css';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../constants/global';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/types';
import { PopupContribute } from '../Forms/PopupContribute';
import { Button } from '../Buttons/Button';
import { ProductCategories } from '../ProductFilters/ProductCategories';
import { Hero } from '../Hero/Hero';

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const [searchParams] = useSearchParams();
  const categoryFromURL = searchParams.get('category');

  // needed for Footer links to scroll to the correct place:
  const productListRef = useRef<HTMLDivElement | null>(null);

  const fetchProducts = async (category: string | null) => {
    try {
      const url =
        !category || category === 'all'
          ? `${API_URL}/products/public`
          : `${API_URL}/products/public?category=${category}`;

      const response = await axios.get<Product[]>(url);
      // no need to filter in frontend, if filtering happens in backend. :)
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts(categoryFromURL);

    // needed for Footer links to scroll to the correct place:
    if (categoryFromURL && productListRef.current) {
      productListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [categoryFromURL]);

  return (
    <>
      <Hero>
        <h1>How do humans rest?</h1>
        <p>
          Discover things that have shaped human behaviour and encouraged rest
          in 21st century. This collection is curated together with our
          community of curious people.
        </p>
        <Button buttonType="primary" onClick={() => setIsPopupVisible(true)}>
          Contribute
        </Button>
      </Hero>

      {/* needed for Footer links to scroll to the correct place: */}
      <div ref={productListRef}>
        <ProductCategories />
      </div>

      <div className="product-list-container">
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
