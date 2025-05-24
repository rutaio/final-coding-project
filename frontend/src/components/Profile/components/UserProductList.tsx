import { Product } from '../../../types/types';
import { ProductDetails } from '../../ProductDetails/ProductDetails';

interface UserProductListProps {
  products: Product[];
  loading: boolean;
  deleteLoading: string | null;
}

export const UserProductList = ({
  products,
  loading,
}: UserProductListProps) => {
  return (
    <div className="product-card">
      <h3>Your Submitted Objects</h3>
      {loading ? (
        <p>Loading your submitted objects...</p>
      ) : products.length === 0 ? (
        <p>You don't have any submitted objects yet.</p>
      ) : (
        <div className="products-list">
          {products.map((product) => (
            <ProductDetails key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
