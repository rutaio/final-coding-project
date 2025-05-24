import { User } from '../../../types/types';
import { AuthContext } from '../../../contexts/AuthContext';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../constants/global';

export const AllUsers = () => {
  const { access_token } = useContext(AuthContext);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${access_token}` },
      };

      const response = await axios.get<User[]>(
        `${API_URL}/auth/all-users`,
        config
      );
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching all users:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [access_token]);

  return (
    <div>
      {loading ? (
        <p>Loading all users...</p>
      ) : users.length === 0 ? (
        <p>The museum does not have any contributors yet..</p>
      ) : (
        <div>
          <h3>All Contributors</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>

                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
