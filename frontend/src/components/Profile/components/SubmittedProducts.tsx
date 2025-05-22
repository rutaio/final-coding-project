import { Product } from '../../../types/types';

interface SubmittedProductsList {
  products: Product[];
  loading: boolean;
}

export const SubmittedProducts = ({
  products,
  loading,
}: SubmittedProductsList) => {
  return (
    <div>
      {loading ? (
        <p>Loading your contributions...</p>
      ) : products.length === 0 ? (
        <p>You don't have any contributions yet.</p>
      ) : (
        <div>
          <h3>Your Contributions</h3>
          <table className="products-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Materials</th>
                <th>Actions</th>
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
                  <td>
                    <button>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
