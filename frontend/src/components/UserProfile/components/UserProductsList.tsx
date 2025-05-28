import { Product } from '../../../types/types';
import { NoSubmissionMessage } from './NoSubmissionMessage';
import { Table } from '../../Table/Table';

interface UserProductsListProps {
  products: Product[];
  loading: boolean;
}

// This component is for Normal Users

// DOES NOT SHOW PRODUCTS YET

export const UserProductsList = ({
  products,
  loading,
}: UserProductsListProps) => {
  return (
    <div>
      <h3>Your Submissions</h3>

      {loading ? (
        <p>Loading your submissions...</p>
      ) : products.length === 0 ? (
        <NoSubmissionMessage />
      ) : (
        <Table
          headers={['Image', 'Title', 'Materials', 'Status']}
          data={products.map((product) => ({
            key: product._id,
            cells: [
              <img
                src={product.image}
                alt={product.title}
                style={{ width: 50, height: 50, objectFit: 'cover' }}
              />,
              product.title,
              product.materials.join(', '),
              product.status,
            ],
          }))}
        />
      )}
    </div>
  );
};
