import { Product } from '../../../types/types';
import { useState } from 'react';
import { ApproveProductPopup } from './ApproveProductPopup';

interface AdminProductsListProps {
  products: Product[];
  loading: boolean;
  fetchProducts: () => void;
}

// This component is for Admin

export const AdminProductsList = ({
  products,
  loading,
  fetchProducts,
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
                  <td>{product.materials}</td>
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
        <ApproveProductPopup
          product={popupProduct}
          onPopupClose={() => setPopupProduct(null)}
          onSuccess={() => {
            setPopupProduct(null);
            fetchProducts();
          }}
        />
      )}
    </div>
  );
};
