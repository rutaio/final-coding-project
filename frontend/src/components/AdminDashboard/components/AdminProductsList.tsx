import { Product } from '../../../types/types';
import { useState } from 'react';
import { PopupApproveProduct } from './PopupApproveProduct';
import { Table } from '../../Table/Table';

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
          <Table
            headers={['Title', 'Materials', 'Actions']}
            data={products.map((product) => ({
              key: product._id,
              cells: [
                product.title,
                product.materials.join(', '),
                !product.isApproved ? (
                  <button onClick={() => setPopupProduct(product)}>
                    Edit & Approve
                  </button>
                ) : (
                  <span>Approved</span>
                ),
              ],
            }))}
          />

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
      )}
    </div>
  );
};
