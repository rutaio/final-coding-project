import { useState } from 'react';
import { EditProduct } from '../../components/ProductActionsUnused/EditProduct';
import { ProductList } from '../../components/ProductList/ProductList';
import { API_URL } from '../../constants/global';
import axios from 'axios';

export const CollectionPage = ({ handleBackToHomeClick, productContent }) => {
  const [isEditing, setIsEditing] = useState(false);

  const deletePost = async () => {
    await axios.delete(`${API_URL}//products/${productContent._id}`);
    handleBackToHomeClick();
  };

  const handleReset = () => {
    setIsEditing(false);
  };

  return (
    <>
      <ProductList />
      {isEditing ? (
        <EditProduct
          productContent={productContent}
          handleCancelClick={handleReset}
        />
      ) : (
        <div className="product-page">
          <div className="product-details-buttons">
            <button onClick={handleBackToHomeClick}>Back to Home</button>

            <div className="product-details-controls">
              <button
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button onClick={deletePost} className="delete-button">
                Delete
              </button>
            </div>
          </div>

          <div className="product-details">
            <h2>{productContent.name}</h2>
            <p>{productContent.description}</p>
          </div>
        </div>
      )}
    </>
  );
};
