import './navigation.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Button } from '../Buttons/Button';

export const Navigation = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  return (
    <nav className="navigation">
      <div className="navigation-container">
        <Link to="/" className="navigation-logo">
          <span>Museum of Rest</span>
        </Link>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                {user?.role === 'admin' ? (
                  <Link to="/admin">Admin Dashboard</Link>
                ) : (
                  <Link to="/profile">Profile</Link>
                )}
              </li>
              <li>
                <Button onClick={logout} type="button" buttonType="secondary">
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <>
              <li className="login-item">
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
