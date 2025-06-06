import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../Buttons/Button';

interface MobileMenuProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  logout: () => void;
}

export const MobileMenu = ({
  isAuthenticated,
  isAdmin,
  logout,
}: MobileMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <button onClick={toggleMenu} className="hamburger-icon">
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
      </button>

      {isMenuOpen && (
        <ul className="mobile-menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          {isAuthenticated ? (
            <>
              {isAdmin ? (
                <li>
                  <Link to="/admin">Admin</Link>
                </li>
              ) : (
                <li>
                  <Link to="/profile">Your Profile</Link>
                </li>
              )}
              <li>
                <Button onClick={logout} buttonType="small" type="button">
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">
                <Button buttonType="small" type="button">
                  Login
                </Button>
              </Link>
            </li>
          )}
        </ul>
      )}
    </>
  );
};
