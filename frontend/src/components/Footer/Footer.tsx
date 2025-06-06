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
                <FontAwesomeIcon icon={faEarthEurope} /> <span>All</span>
              </Link>
            </li>
            <li>
              <Link to="/?category=audio" aria-label="Audio category">
                <FontAwesomeIcon icon={faEarListen} /> <span>Sound</span>
              </Link>
            </li>
            <li>
              <Link to="/?category=visual" aria-label="Visual category">
                {' '}
                <FontAwesomeIcon icon={faEye} /> <span>Sight</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="column">
          <ul>
            <li>
              <Link to="/?category=tactile" aria-label="Tactile category">
                {' '}
                <FontAwesomeIcon icon={faHand} /> <span>Touch</span>
              </Link>
            </li>
            <li>
              <Link to="/?category=edible" aria-label="Edible category">
                {' '}
                <FontAwesomeIcon icon={faFaceGrinTongue} /> <span>Taste</span>
              </Link>
            </li>
            <li>
              <Link to="/?category=scented" aria-label="Scented category">
                {' '}
                <FontAwesomeIcon icon={faLeaf} /> <span>Smell</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
