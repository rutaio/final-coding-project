import { useState } from 'react';
import { ContributePopup } from '../../ContributePopup/ContributePopup';

export const NoSubmissionMessage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <>
      <div className="no-submissions-message">
        <p>You don't have any submissions yet.</p>
        <button onClick={() => setIsPopupOpen(true)}>Contribute</button>
        {isPopupOpen && (
          <ContributePopup
            onPopupClose={() => setIsPopupOpen(false)}
            onSuccess={() => {
              setIsPopupOpen(false);
            }}
          />
        )}
      </div>
    </>
  );
};
