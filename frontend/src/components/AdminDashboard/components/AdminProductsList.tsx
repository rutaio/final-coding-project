import { Product } from '../../../types/types';
import { useState } from 'react';
import { PopupEditProduct } from './PopupEditProduct';
import { Table } from '../../Table/Table';
import { Button } from '../../Buttons/Button';

interface AdminProductsListProps {
  products: Product[];
  loading: boolean;
  fetchAdminProducts: () => void;
  handleDeleteProduct: (_id: string) => void;
}

export const AdminProductsList = ({
  products,
  loading,
  fetchAdminProducts,
  handleDeleteProduct,
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
          <Table
            headers={[
              'Title',
              'Image',
              'Materials',
              'Category',
              'Status',
              'Edit',
              'Delete',
            ]}
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
                <Button
                  type="button"
                  buttonType="small"
                  onClick={() => setPopupProduct(product)}
                >
                  Edit
                </Button>,
                <Button
                  type="button"
                  buttonType="small"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Delete
                </Button>,
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
