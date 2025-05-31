import { useState } from 'react';
import { PopupContribute } from '../../PopupContribute/PopupContribute';

export const NoSubmissionMessage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <>
      <div className="no-submissions-message">
        <p>You don't have any submissions yet.</p>
        <button onClick={() => setIsPopupOpen(true)}>Contribute</button>
        {isPopupOpen && (
          <PopupContribute onPopupClose={() => setIsPopupOpen(false)} />
        )}
      </div>
    </>
  );
};
