import { Button } from '../Buttons/Button';

export const MemberCard = () => {
  return (
    <div className="product-detail">
      <div className="product-detail-container">
        <div className="product-detail-hero">
          <img
            src="https://placehold.co/600x400/png"
            alt="Activity cover image"
            className="product-detail-image"
          />
        </div>

        <div className="product-detail-text">
          <div className="product-header">
            <h2>Permission to Rest</h2>
          </div>
          <div className="product-description">
            <p>
              This is a virtual membership at our museum. Buy it for yourself as
              an achor to pause or as a present for loved ones.
            </p>
            <p>
              Each card receives a unique random set of colors as your talisman
              throughout the journey to balanced life.
            </p>
          </div>

          <div className="product-actions">
            <Button buttonType="secondary" type="button">
              Buy This
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
