import './footer.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export const Footer = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  return (
    <nav className="navigation">
      <div className="navigation-container">
        <div className="wide-column">
          <Link to="/" className="navigation-logo">
            <span>Museum of Rest</span>
          </Link>
          <p>
            Discover a collection of things used by humans who have lived in
            21st century. This collection is curated together with our community
            of curious people. This collection highlights the Products that
            Shaped Human Behaviour.
          </p>
        </div>
        <div className="column">
          <ul>
            <li>
              <Link to="/collection">Collection</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
        <div className="column">
          <ul>
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
      </div>
    </nav>
  );
};
