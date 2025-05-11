import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../Registration/register.css';
import { AuthContext } from '../../contexts/AuthContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="register-container">
      <div className="register-form-wrapper">
        <h2>Come Back to Your Profile</h2>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="register-button">
            {'Login'}
          </button>
        </form>

        <div className="login-link">
          Don't have an account yet? <Link to="/register">Become Contributor</Link>
        </div>
      </div>
    </div>
  );
};