import './product-card.css';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types/types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-card-content">
        <img
          src={product.image}
          alt="Product cover image"
          className="product-card-image"
        />
      </div>
      <h3>{product.title}</h3>
      <h6>{product.materials.join(', ')}</h6>
    </div>
  );
};
