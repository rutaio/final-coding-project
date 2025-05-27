import '../../PopupContribute/popup.css';
import { useState, useEffect } from 'react';
import { User } from '../../../types/types';
import { Button } from '../../Buttons/Button';

interface PopupEditUserProps {
  onPopupClose: () => void;
  onSubmit: (formData: { role: string }) => Promise<void>;
  editUser: User | null;
}

export const PopupEditUser: React.FC<PopupEditUserProps> = ({
  editUser,
  onPopupClose,
  onSubmit,
}) => {
  const [role, setRole] = useState('');

  useEffect(() => {
    if (editUser) {
      setRole(editUser.role);
    }
  }, [editUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      role,
    };

    await onSubmit(formData);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="close" onClick={onPopupClose}>
          x
        </span>
        <h2>Update User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <Button type="submit" buttonType="secondary">
            Update User
          </Button>
        </form>
      </div>
    </div>
  );
};
