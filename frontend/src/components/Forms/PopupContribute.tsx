import './forms.css';
import axios from 'axios';
import { useState, useContext } from 'react';
import { API_URL } from '../../constants/global';
import { Button } from '../Buttons/Button';
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { ThanksMessage } from '../ThanksMessage/ThanksMessage';

interface PopupContributeProps {
  onPopupClose: () => void;
}

export const PopupContribute: React.FC<PopupContributeProps> = ({
  onPopupClose,
}) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [materials, setMaterials] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { access_token } = useContext(AuthContext);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!access_token) {
    return <Navigate to="/login" replace />;
  }

  const handleFormSubmit = async (event: React.FormEvent) => {
    event?.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      await axios.post(
        `${API_URL}/products`,
        {
          title,
          description,
          image,
          materials,
        },
        config
      );
      setIsSubmitted(true);
      setError(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || 'Error happened';
        setError(errorMessage);
      }
    }
  };

  return (
    <div className="overlay-container">
      {isSubmitted ? (
        <div className="popup-thanks-message">
          <ThanksMessage
            title="Thanks for your contribution!"
            message="Our museum curator is now carefully
              reviewing your submission. Wait for a few days until it is live on
              Museum of Rest!"
          />
          <Button onClick={onPopupClose} buttonType="primary">
            Close
          </Button>
        </div>
      ) : (
        <div className="form-wrapper">
          <h2>Contribute to the Museum of Rest</h2>
          <form onSubmit={handleFormSubmit} className="form">
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
              <label htmlFor="description">
                Describe how this object was used:
              </label>
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

            {error && <div className="error-message">{error}</div>}

            <div className="actions">
              <Button
                onClick={onPopupClose}
                buttonType="secondary"
                type="button"
              >
                Cancel
              </Button>

              <Button buttonType="primary" type="submit">
                Contribute
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
