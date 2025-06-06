import './navigation.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { MobileMenu } from './components/MobileMenu';
import { DesktopMenu } from './components/DesktopMenu';

export const Navigation = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const isAdmin = user?.role === 'admin';

  return (
    <nav className="navigation">
      <div className="navigation-container">
        <div className="navigation-logo-container">
          <Link to="/" className="navigation-logo">
            Museum of Rest
          </Link>
        </div>

        <div className="desktop-nav">
          <DesktopMenu
            isAuthenticated={isAuthenticated}
            isAdmin={isAdmin}
            logout={logout}
          />
        </div>
        <div className="mobile-nav">
          <MobileMenu
            isAuthenticated={isAuthenticated}
            isAdmin={isAdmin}
            logout={logout}
          />
        </div>
      </div>
    </nav>
  );
};
