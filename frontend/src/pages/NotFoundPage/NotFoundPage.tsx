import { Button } from '../../components/Buttons/Button';
import { useNavigate } from 'react-router-dom';
import '../ContactPage/contact-page.css';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <main className="page-container">
      <h1>Page not found</h1>
      <p className="page-description">
        What you're looking for is not here. Try visiting our homepage instead?
      </p>

      <Button buttonType="secondary" type="button" onClick={handleBackClick}>
        Go to Homepage
      </Button>
    </main>
  );
};
