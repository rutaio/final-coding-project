import { Product } from '../../../types/types';
import { NoSubmissionMessage } from './NoSubmissionMessage';
import { Table } from '../../Table/Table';

interface UserProductsListProps {
  products: Product[];
  loading: boolean;
}

// This component is for Normal Users

export const UserProductsList = ({
  products,
  loading,
}: UserProductsListProps) => {


  // move back this inside return!
  if (loading) {
    return <p>Loading your submissions...</p>;
  }

  {
    !loading && products.length === 0 && <NoSubmissionMessage />;
  }

  return (
    <div>
      <h3>Your Submissions</h3>

      <Table
        headers={['Image', 'Title', 'Materials']}
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
          ],
        }))}
      />
    </div>
  );
};
