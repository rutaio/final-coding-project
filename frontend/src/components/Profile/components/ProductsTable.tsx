import { Product } from '../../../types/types';

interface ProductsTableProps {
  products: Product[];
}

export const ProductsTable = ({ products }: ProductsTableProps) => {
  return (
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
  );
};
