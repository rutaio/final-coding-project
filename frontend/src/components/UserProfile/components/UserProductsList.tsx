import { Product } from '../../../types/types';
import { ProductsTable } from './ProductsTable';
import { NoSubmissionMessage } from './NoSubmissionMessage';

interface UserProductsListProps {
  products: Product[];
  loading: boolean;
}

// This component is for Normal Users

export const UserProductsList = ({
  products,
  loading,
}: UserProductsListProps) => {
  return (
    <>
      {(loading || products.length > 0) && (
        <div className="product-card">
          <h3>Your Submissions</h3>
          {loading ? (
            <p>Loading your submissions...</p>
          ) : (
            <ProductsTable products={products} />
          )}
        </div>
      )}

      {!loading && products.length === 0 && <NoSubmissionMessage />}
    </>
  );
};
