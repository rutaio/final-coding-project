import './contribute-popup.css';
import axios from 'axios';
import { useState } from 'react';
import { API_URL } from '../../../constants/global';

interface ContributePopupProps {
  onPopupClose: () => void;
  onSuccess: () => void;
}

export const ContributePopup: React.FC<ContributePopupProps> = ({
  onPopupClose,
  onSuccess,
}) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [materials, setMaterials] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event?.preventDefault();
    try {
      await axios.post(`${API_URL}/products`, {
        title,
        description,
        image,
        materials,
      });
      // if request is successful, call a function from a parent CollectionPage:
      onPopupClose();
      // when form is sent, call an additional props:
      onSuccess();
      setError(null);
    } catch (error) {
      // add an error that came back:
      if (axios.isAxiosError(error)) {
        // I'm going deeper through the objects:
        const errorMessage = error.response?.data?.error || 'Error happened';
        setError(errorMessage);
      }
    }
  };

  return (
    <>
      <div className="popup-overlay">
        <div className="popup-content">
          <h2>Contribute to the Museum of Rest</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="title">What's the name of the object?</label>
              <input
                type="text"
                id="title"
                required
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Describe how this object was used:</label>
              <textarea
                id="description"
                rows={3}
                required
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Please add the image as a link:</label>
              <input
                id="image"
                required
                onChange={(event) => setImage(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="materials">What is it made of?</label>
              <input
                type="text"
                id="materials"
                placeholder="e.g. plastic, leather, etc."
                required
                onChange={(event) => setMaterials(event.target.value)}
              />
            </div>

            {error && <div className="error-container">{error}</div>}

            <div className="popup-actions">
              <button type="button" onClick={onPopupClose}>
                Cancel
              </button>
              <button type="submit">Contribute</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};