import './filters.css';

interface ProductFiltersProps {
  onChosenCategory: (category: string) => void;
}

export const ProductFilters = ({ onChosenCategory }: ProductFiltersProps) => {
  return (
    <div>
      <h2>Filter Objects by Senses</h2>
      <div className="wrapper">
        <div
          id="audio"
          className="card"
          onClick={() => onChosenCategory('audio')}
        >
          <div>ear icon</div>
          <h4>Hearing</h4>
        </div>
        <div
          id="visual"
          className="card"
          onClick={() => onChosenCategory('visual')}
        >
          <div>eye icon</div>
          <h4>Sight</h4>
        </div>
        <div
          id="tactile"
          className="card"
          onClick={() => onChosenCategory('tactile')}
        >
          <div>hand icon</div>
          <h4>Touch</h4>
        </div>
        <div
          id="edible"
          className="card"
          onClick={() => onChosenCategory('edible')}
        >
          <div>mouth icon</div>
          <h4>Taste</h4>
        </div>
        <div
          id="scented"
          className="card"
          onClick={() => onChosenCategory('scented')}
        >
          <div>nose icon</div>
          <h4>Smell</h4>
        </div>
      </div>
    </div>
  );
};
