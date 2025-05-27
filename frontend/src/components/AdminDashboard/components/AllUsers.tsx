import { User } from '../../../types/types';

interface AllUsersProps {
  users: User[];
  loading: boolean;
  fetchUsers: () => void;
}

export const AllUsers = ({ users, loading }: AllUsersProps) => {

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
