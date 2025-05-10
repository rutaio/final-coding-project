import { useContext } from 'react';
import './profile.css';
import { AuthContext } from '../../contexts/AuthContext';

// how to showcase submitted products here? thru props?
export const Profile = () => {
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
          </div>
        </div>
        <div className="contributions-container">
          <h3>Your Contributions</h3>
          <div className="submitted-products-info">
            <img src=""></img>
            <h2>
              <strong>Title:</strong>
            </h2>
            <p>
              <strong>Description:</strong>
            </p>
            <h6>Materials:</h6>
            <button>Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};
