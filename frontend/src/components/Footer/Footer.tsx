import './footer.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Button } from '../Buttons/Button';

export const Footer = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  return (
    <nav className="footer">
      <div className="footer-container">
        <div className="wide-column">
          <Link to="/" className="footer-logo">
            <span>muserest.com</span>
          </Link>
          <p>
            Discover a collection of things used by humans who have lived in
            21st century. Thsis collection is curated together with our
            community of curious people. This collection highlights the products
            that shaped human behaviour and prompted people to rest through
            relaxation or hobbies.
          </p>
          <p>
            Museum of Rest aka <i>muserest</i> is an artistic coding project by
            Ruta Jakute.
          </p>
        </div>
        <div className="column">
          <ul>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="column">
          <ul>
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
                  <Button onClick={logout} type="button" buttonType="small">
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
      </div>
    </nav>
  );
};
