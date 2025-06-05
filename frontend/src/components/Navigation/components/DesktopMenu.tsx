import { Link } from 'react-router-dom';
import { Button } from '../../Buttons/Button';
import { User } from '../../../types/types';

interface DesktopMenuProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: User;
  logout: () => void;
}

export const DesktopMenu = ({
  isAuthenticated,
  isAdmin,
  user,
  logout,
}: DesktopMenuProps) => {
  return (
    <ul className="desktop-menu">
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
  );
};
