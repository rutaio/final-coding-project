import '../../PopupContribute/popup.css';
import axios from 'axios';
import { useState, useContext } from 'react';
import { API_URL } from '../../../constants/global';
import { Button } from '../../Buttons/Button';
import { AuthContext } from '../../../contexts/AuthContext';
import { Product } from '../../../types/types';

interface PopupApproveProductProps {
  product: Product;
  onPopupClose: () => void;
  onSuccess: () => void;
}

export const PopupApproveProduct: React.FC<PopupApproveProductProps> = ({
  product,
  onPopupClose,
  onSuccess,
}) => {
  const [title, setTitle] = useState<string>(product.title);
  const [description, setDescription] = useState<string>(product.description);
  const [materials, setMaterials] = useState<string>(
    product.materials.join(', ')
  );
  const [error, setError] = useState<string | null>(null);
  const { access_token } = useContext(AuthContext);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event?.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      await axios.patch(
        `${API_URL}/products/${product._id}/approve`,
        {
          title,
          description,
          materials: materials.split(',').map((m) => m.trim()),
          isApproved: true,
        },
        config
      );
      onPopupClose();
      onSuccess();
      setError(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || 'Error happened';
        setError(errorMessage);
      }
    }
  };

  return (
    <>
      <div className="popup-overlay">
        <div className="popup-content">
          <h2>Edit and Approve This Submission</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="title">Name this object:</label>
              <input
                type="text"
                id="title"
                required
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">
                Describe how this object was used:
              </label>
              <textarea
                id="description"
                rows={3}
                required
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="materials">Materials it is made of:</label>
              <input
                type="text"
                id="materials"
                required
                value={materials}
                onChange={(event) => setMaterials(event.target.value)}
              />
            </div>

            {error && <div className="error-container">{error}</div>}

            <div className="popup-actions">
              <Button
                onClick={onPopupClose}
                buttonType="secondary"
                type="button"
              >
                Cancel
              </Button>

              <Button buttonType="primary" type="submit">
                Save and Approve
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
