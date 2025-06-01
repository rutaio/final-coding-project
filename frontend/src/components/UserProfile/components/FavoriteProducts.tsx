import { Table } from '../../Table/Table';
import { Button } from '../../Buttons/Button';
import { NoFavoritesMessage } from './NoFavoritesMessage';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserInterfaceContext } from '../../../contexts/UserInterfaceContext';

export const FavoriteProducts = () => {
  const navigate = useNavigate();
  const { favoriteProducts } = useContext(UserInterfaceContext);

  return (
    <div>
      <h3>Favorites</h3>

      {favoriteProducts.length === 0 ? (
        <NoFavoritesMessage />
      ) : (
        <Table
          headers={['Image', 'Title', 'Description', 'Links']}
          data={favoriteProducts.map((product) => ({
            key: product._id,
            cells: [
              <img
                src={product.image}
                alt={product.title}
                style={{ width: 50, height: 50, objectFit: 'cover' }}
              />,
              product.title,
              product.description,
              <Button
                type="button"
                buttonType="small"
                onClick={() => navigate(`/products/${product._id}`)}
              >
                View
              </Button>,
            ],
          }))}
        />
      )}
    </div>
  );
};
