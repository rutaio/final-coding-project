import { Button } from '../../components/Buttons/Button';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../../components/Hero/Hero';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <Hero className='container-min-height'>
      <h1>Page not found</h1>
      <p>
        What you're looking for is not here. Try visiting our homepage instead?
      </p>

      <Button buttonType="secondary" type="button" onClick={handleBackClick}>
        Go to Homepage
      </Button>
    </Hero>
  );
};
