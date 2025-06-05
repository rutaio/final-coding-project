import './footer.css';
import { Link } from 'react-router-dom';

export const Footer = () => {
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
              <Link to="/">All</Link>
            </li>
            <li>
              <Link to="/products/public?category=audio">Sound</Link>
            </li>
            <li>
              <Link to="/products/public?category=visual">Sight</Link>
            </li>
          </ul>
        </div>
        <div className="column">
          <ul>
            <li>
              <Link to="/products/public?category=tactile">Touch</Link>
            </li>
            <li>
              <Link to="/products/public?category=edible">Taste</Link>
            </li>
            <li>
              <Link to="/products/public?category=scented">Smell</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
