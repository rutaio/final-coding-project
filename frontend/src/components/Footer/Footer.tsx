import './footer.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEarListen } from '@fortawesome/free-solid-svg-icons';
import { faHand } from '@fortawesome/free-solid-svg-icons';
import { faFaceGrinTongue } from '@fortawesome/free-solid-svg-icons';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { faEarthEurope } from '@fortawesome/free-solid-svg-icons';

export const Footer = () => {
  return (
    <nav className="footer">
      <div className="footer-container">
        <div className="wide-column">
          <Link to="/" className="footer-logo">
            <span>Museum of Rest</span>
          </Link>
          <p>
            Discover a collection of things used by humans who have lived in
            21st century. Thsis collection is curated together with our
            community of curious people. This collection highlights the products
            that shaped human behaviour and prompted people to rest through
            relaxation or hobbies.
          </p>
          <p>
            Museum of Rest aka <i>muserest</i> is an artistic coding project by{' '}
            <a href="https://github.com/rutaio">Ruta Jakute</a>.
          </p>
        </div>
        <div className="column">
          <ul>
            <li>
              <Link to="/">
                <FontAwesomeIcon icon={faEarthEurope} /> All
              </Link>
            </li>
            <li>
              <Link to="/?category=audio">
                <FontAwesomeIcon icon={faEarListen} /> Sound
              </Link>
            </li>
            <li>
              <Link to="/?category=visual">
                {' '}
                <FontAwesomeIcon icon={faEye} /> Sight
              </Link>
            </li>
          </ul>
        </div>
        <div className="column">
          <ul>
            <li>
              <Link to="/?category=tactile">
                {' '}
                <FontAwesomeIcon icon={faHand} /> Touch
              </Link>
            </li>
            <li>
              <Link to="/?category=edible">
                {' '}
                <FontAwesomeIcon icon={faFaceGrinTongue} /> Taste
              </Link>
            </li>
            <li>
              <Link to="/?category=scented">
                {' '}
                <FontAwesomeIcon icon={faLeaf} /> Smell
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
