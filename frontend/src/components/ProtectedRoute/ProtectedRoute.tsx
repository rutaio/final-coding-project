import { useContext } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    navigate('/login');
    return null;
  }
};
