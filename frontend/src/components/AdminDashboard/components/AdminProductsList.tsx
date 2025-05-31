import { Product } from '../../../types/types';
import { useState } from 'react';
import { PopupEditProduct } from './PopupApproveProduct';
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
            headers={['Title', 'Image', 'Materials', 'Status', 'Actions']}
            data={products.map((product) => ({
              key: product._id,
              cells: [
                product.title,
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ width: 30, height: 30, objectFit: 'cover' }}
                />,
                product.materials.join(', '),
                product.category,
                product.status,
                <button onClick={() => setPopupProduct(product)}>Edit</button>,
              ],
            }))}
          />

          {popupProduct && (
            <PopupEditProduct
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
