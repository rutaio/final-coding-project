import './filters.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEarListen } from '@fortawesome/free-solid-svg-icons';
import { faHand } from '@fortawesome/free-solid-svg-icons';
import { faFaceGrinTongue } from '@fortawesome/free-solid-svg-icons';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { faEarthEurope } from '@fortawesome/free-solid-svg-icons';

interface ProductFiltersProps {
  onChosenCategory: (category: string | null) => void;
}

export const ProductFilters = ({ onChosenCategory }: ProductFiltersProps) => {
  return (
    <div className="container">
      <h2>Filter objects by senses</h2>
      <div className="wrapper">
        <div id="all" className="card" onClick={() => onChosenCategory(null)}>
          <FontAwesomeIcon icon={faEarthEurope} />
          <h3>All</h3>
        </div>
        <div
          id="audio"
          className="card"
          onClick={() => onChosenCategory('audio')}
        >
          <FontAwesomeIcon icon={faEarListen} />
          <h3>Sound</h3>
        </div>
        <div
          id="visual"
          className="card"
          onClick={() => onChosenCategory('visual')}
        >
          <FontAwesomeIcon icon={faEye} />
          <h3>Sight</h3>
        </div>
        <div
          id="tactile"
          className="card"
          onClick={() => onChosenCategory('tactile')}
        >
          <FontAwesomeIcon icon={faHand} />
          <h3>Touch</h3>
        </div>
        <div
          id="edible"
          className="card"
          onClick={() => onChosenCategory('edible')}
        >
          <FontAwesomeIcon icon={faFaceGrinTongue} />
          <h3>Taste</h3>
        </div>
        <div
          id="scented"
          className="card"
          onClick={() => onChosenCategory('scented')}
        >
          <FontAwesomeIcon icon={faLeaf} />
          <h3>Smell</h3>
        </div>
      </div>
    </div>
  );
};
