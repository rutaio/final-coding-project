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
  const handleClick = () => setIsMenuOpen(false);

  return (
    <>
      <button onClick={toggleMenu} className="hamburger-icon">
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
      </button>

      {isMenuOpen && (
        <ul className="mobile-menu">
          <li>
            <Link to="/" onClick={handleClick}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={handleClick}>
              Contact
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              {isAdmin ? (
                <li>
                  <Link to="/admin" onClick={handleClick}>
                    Admin
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/profile" onClick={handleClick}>
                    Profile
                  </Link>
                </li>
              )}
              <li>
                <Button
                  onClick={() => {
                    logout(), handleClick();
                  }}
                  buttonType="small"
                  type="button"
                >
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" onClick={handleClick}>
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
