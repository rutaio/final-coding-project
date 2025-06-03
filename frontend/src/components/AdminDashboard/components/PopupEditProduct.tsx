import '../../Forms/forms.css';
import axios from 'axios';
import { useState, useContext } from 'react';
import { API_URL } from '../../../constants/global';
import { Button } from '../../Buttons/Button';
import { AuthContext } from '../../../contexts/AuthContext';
import { Product } from '../../../types/types';
import { toast, Zoom } from 'react-toastify';

interface PopupEditProductProps {
  product: Product;
  onPopupClose: () => void;
  onSuccess: () => void;
}

export const PopupEditProduct: React.FC<PopupEditProductProps> = ({
  product,
  onPopupClose,
  onSuccess,
}) => {
  const [title, setTitle] = useState<string>(product.title);
  const [description, setDescription] = useState<string>(product.description);
  const [materials, setMaterials] = useState<string>(
    product.materials.join(', ')
  );
  const [status, setStatus] = useState<string>(product.status);
  const [category, setCategory] = useState<string>(product.category);
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
        `${API_URL}/products/${product._id}`,
        {
          title,
          description,
          materials: materials.split(',').map((m) => m.trim()),
          category,
          status,
        },
        config
      );
      onPopupClose();
      onSuccess();
      toast(`${product.title} was updated!`, {
        type: 'success',
        position: 'top-left',
        autoClose: 1000,
        transition: Zoom,
      });
      setError(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || 'Error happened';
        setError(errorMessage);
        toast(`${product.title} has an error!`, {
          type: 'info',
          position: 'top-left',
          autoClose: 5000,
          transition: Zoom,
        });
      }
    }
  };

  return (
    <div className="overlay-container">
      <div className="form-wrapper">
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

          <div className="form-group">
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="visual">Visual</option>
              <option value="audio">Audio</option>
              <option value="tactile">Tactile</option>
              <option value="scented">Scented</option>
              <option value="edible">Edible</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="under-review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="actions">
            <Button onClick={onPopupClose} buttonType="secondary" type="button">
              Cancel
            </Button>

            <Button buttonType="primary" type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
