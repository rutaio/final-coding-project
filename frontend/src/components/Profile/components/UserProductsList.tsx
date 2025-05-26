import { Product } from '../../../types/types';

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
    <div className="product-card">
      <h3>Your Submitted Objects</h3>
      {loading ? (
        <p>Loading your submitted objects...</p>
      ) : products.length === 0 ? (
        <p>You don't have any submitted objects yet.</p>
      ) : (
        <div className="products-list">
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Materials</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="product-image"
                    />
                  </td>
                  <td>{product.title}</td>
                  <td>{product.materials}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
