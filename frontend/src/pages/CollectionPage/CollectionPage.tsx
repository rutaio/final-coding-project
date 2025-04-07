import { useState } from 'react';
import { EditProduct } from '../../components/ProductActions/EditProduct';
import { apiForProducts } from '../../constants/globalProductsApi';
import axios from 'axios';

export const CollectionPage = ({ handleBackToHomeClick, blogContent }) => {
  const [isEditing, setIsEditing] = useState(false);

  const deletePost = async () => {
    await axios.delete(`${api}/${blogContent.id}`);
    handleBackToHomeClick();
  };

  const handleReset = () => {
    setIsEditing(false);
  };

  return (
    <>
      {/* norim paslepti visa page, todel cia rasome ternary operator: */}
      {isEditing ? (
        // ant to pacio elemento priimame callback'a, kuris ateina ant paspausto cancel mygtuko:
        <EditProduct
          blogContent={blogContent}
          handleCancelClick={handleReset}
        />
      ) : (
        <div className="blog-page">
          <div className="blog-details-buttons">
            <button onClick={handleBackToHomeClick}>Back to Home</button>

            <div className="blog-details-controls">
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

          <div className="blog-details">
            <h2>{blogContent.name}</h2>
            <p>{blogContent.description}</p>
          </div>
        </div>
      )}
    </>
  );
};
