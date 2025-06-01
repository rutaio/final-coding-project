import './product-details.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/global';
import { Product } from '../../types/types';
import { Button } from '../Buttons/Button';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { favoriteProducts, addToFavorites, removeFromFavorites } =
    useContext(AuthContext);

  let isFavorite;

  // if product has loaded:
  if (product) {
    // some() - works like a loop; checks if in both lists exists the same product
    isFavorite = favoriteProducts.some(
      (favorite) => favorite._id === product._id
    );
  } else {
    isFavorite = false;
  }

  const handleFavoriteClick = () => {
    if (!product) return;

    if (isFavorite) {
      removeFromFavorites(product._id);
    } else {
      addToFavorites(product);
    }
  };

  const handleBackClick = () => {
    navigate('/collection');
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCars();
  }, [id]);

  if (!product) {
    return <div>No such a product in our collection!</div>;
  }

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        <div className="product-detail-left">
          <img
            src={product.image}
            alt="Product cover image"
            className="product-detail-image"
          />
        </div>

        <div className="product-detail-right">
          <div className="product-header">
            <h2>{product.title}</h2>
          </div>
          <div className="product-description">
            <p>{product.description}</p>
          </div>
          <div className="product-materials">
            <p>{product.materials.join(', ')}</p>
          </div>
          <div className="product-actions">
            <Button
              buttonType="primary"
              type="button"
              onClick={handleFavoriteClick}
            >
              {isFavorite ? 'Remove from favorites' : 'Save to your favorites'}
            </Button>

            <Button
              buttonType="secondary"
              type="button"
              onClick={handleBackClick}
            >
              Go back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
