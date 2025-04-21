import { useContext } from 'react';
import './profile.css';
import { AuthContext } from '../../contexts/AuthContext';

// how to showcase submitted products here? thru props?
export const Profile = ({productContent}) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Your Profile</h1>
        <p className="welcome-text">Welcome back, {user?.name}!</p>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <h3>Your Details</h3>
          <div className="account-info">
            <p>
              <strong>Name:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Type of contributor:</strong> {user?.role}
            </p>
          </div>

          <div className="contributions-container">
            <h3>Your Contributions</h3>
            <div className="submitted-products-info">
              <p>
                <strong>Product Title:</strong> {product?.title}
              </p>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
