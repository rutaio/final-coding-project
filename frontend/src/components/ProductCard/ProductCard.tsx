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
      <img
        src={product.image}
        alt="Product cover image"
        className="product-card-image"
      />
      <div className="product-card-content">
        <h5>{product.category}</h5>
        <h3>{product.title}</h3>
        <h6>{product.materials}</h6>
        <p>{product.description}</p>
      </div>
    </div>
  );
};
