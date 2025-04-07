import './navigation.css';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="navigation-container">
        <Link to="/" className="navigation-logo">
          <span>MOR</span>
        </Link>
        <ul>
          <li>
            <Link to="/">Homepage</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/login">Contribute</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};