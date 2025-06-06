import './categories.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEarListen } from '@fortawesome/free-solid-svg-icons';
import { faHand } from '@fortawesome/free-solid-svg-icons';
import { faFaceGrinTongue } from '@fortawesome/free-solid-svg-icons';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { faEarthEurope } from '@fortawesome/free-solid-svg-icons';

export const ProductCategories = () => {
  return (
    <div className="categories-banner">
      <div className="categories-wrapper">
        <Link to="/" className="single-category-container">
          <FontAwesomeIcon icon={faEarthEurope} />
          <h3>All</h3>
        </Link>
        <Link to="/?category=audio" className="single-category-container">
          <FontAwesomeIcon icon={faEarListen} />
          <h3>Sound</h3>
        </Link>
        <Link to="/?category=visual" className="single-category-container">
          <FontAwesomeIcon icon={faEye} />
          <h3>Sight</h3>
        </Link>
        <Link to="/?category=tactile" className="single-category-container">
          <FontAwesomeIcon icon={faHand} />
          <h3>Touch</h3>
        </Link>
        <Link to="/?category=edible" className="single-category-container">
          <FontAwesomeIcon icon={faFaceGrinTongue} />
          <h3>Taste</h3>
        </Link>
        <Link to="/?category=scented" className="single-category-container">
          <FontAwesomeIcon icon={faLeaf} />
          <h3>Smell</h3>
        </Link>
      </div>
    </div>
  );
};
