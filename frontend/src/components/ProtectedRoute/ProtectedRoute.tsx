import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { User } from '../../types/types';

interface ProtectedRouteProps {
  requiredRole?: string;
}

export const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useContext(AuthContext) as {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
  };

  // Wait until loading is done before checking auth:
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && (!user || user.role !== requiredRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
