import { User } from '../../../types/types';
import { PopupEditUser } from './PopupEditUser';
import { API_URL } from '../../../constants/global';
import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { Table } from '../../Table/Table';
import { formatDate } from '../../../utils/date';
import { Button } from '../../Buttons/Button';

interface AllUsersProps {
  users: User[];
  loading: boolean;
  fetchUsers: () => void;
}

export const AllUsers = ({ users, loading, fetchUsers }: AllUsersProps) => {
  const { access_token } = useContext(AuthContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const editUserRole = async (newRole: string) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${access_token}` },
      };

      await axios.put(
        `${API_URL}/auth/edit-role/${selectedUser?._id}`,
        { role: newRole },
        config
      );
      setIsPopupOpen(false);
      setSelectedUser(null);
      await fetchUsers();
    } catch (error) {
      console.error('Error editing user role:', error);
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsPopupOpen(true);
  };

  return (
    <div>
      {loading ? (
        <p>Loading all users...</p>
      ) : users.length === 0 ? (
        <p>The museum does not have any contributors yet..</p>
      ) : (
        <div>
          <h3>All Contributors</h3>
          <Table
            headers={['Name', 'Email', 'Role', 'Joined', 'Actions']}
            data={users.map((user) => ({
              key: user._id,
              cells: [
                user.name,
                user.email,
                user.role,
                formatDate(user.createdAt),
                <Button
                  type="button"
                  buttonType="small"
                  onClick={() => handleEdit(user)}
                >
                  Edit Role
                </Button>,
              ],
            }))}
          />
        </div>
      )}
      {isPopupOpen && (
        <PopupEditUser
          editUser={selectedUser}
          onSubmit={(formData) => editUserRole(formData.role)}
          onPopupClose={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  );
};
