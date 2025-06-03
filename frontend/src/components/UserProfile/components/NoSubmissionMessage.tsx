import { useState } from 'react';
import { PopupContribute } from '../../Forms/PopupContribute';
import { Button } from '../../Buttons/Button';

export const NoSubmissionMessage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <div>
      <p>You don't have any submissions yet.</p>
      <Button
        type="button"
        buttonType="primary"
        onClick={() => setIsPopupOpen(true)}
      >
        Contribute
      </Button>

      {isPopupOpen && (
        <PopupContribute onPopupClose={() => setIsPopupOpen(false)} />
      )}
    </div>
  );
};
