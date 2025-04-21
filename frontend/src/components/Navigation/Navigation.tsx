import './navigation.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

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
          <li>
            <Link to="/collection">Collection</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={logout} className="logout-button">
                  Logout
                </button>
              </li>
              {user?.role === 'admin' && (
                <li className="admin-item">
                  <Link to="/admin">Admin</Link>
                </li>
              )}
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
