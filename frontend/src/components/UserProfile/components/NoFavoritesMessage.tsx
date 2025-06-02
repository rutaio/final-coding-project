import { Button } from '../../Buttons/Button';
import { useNavigate } from 'react-router-dom';

export const NoFavoritesMessage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };
  
  return (
    <div>
      <p>No favorites yet.</p>
      <Button type="button" buttonType="primary" onClick={handleClick}>
        Explore Our Museum
      </Button>
    </div>
  );
};
