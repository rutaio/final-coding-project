import { Product } from '../../../types/types';
import { useState } from 'react';
import { PopupApproveProduct } from './PopupApproveProduct';

interface AdminProductsListProps {
  products: Product[];
  loading: boolean;
  fetchAdminProducts: () => void;
}

export const AdminProductsList = ({
  products,
  loading,
  fetchAdminProducts,
}: AdminProductsListProps) => {
  const [popupProduct, setPopupProduct] = useState<Product | null>(null);

  return (
    <div>
      {loading ? (
        <p>Loading contributions...</p>
      ) : products.length === 0 ? (
        <p>No contributions yet.</p>
      ) : (
        <div>
          <h3>All Submitted Products</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Materials</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.title}</td>
                  <td>{product.materials.join(', ')}</td>
                  <td>
                    {!product.isApproved ? (
                      <button onClick={() => setPopupProduct(product)}>
                        Edit and Approve
                      </button>
                    ) : (
                      <span>Approved</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {popupProduct && (
        <PopupApproveProduct
          product={popupProduct}
          onPopupClose={() => setPopupProduct(null)}
          onSuccess={() => {
            setPopupProduct(null);
            fetchAdminProducts();
          }}
        />
      )}
    </div>
  );
};
