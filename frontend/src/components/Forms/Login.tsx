import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './forms.css';
import { AuthContext } from '../../contexts/AuthContext';
import { Button } from '../Buttons/Button';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, error } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="auth-container">
      <div className="form-wrapper">
        <h2>Come Back to Your Profile</h2>

        <form onSubmit={handleSubmit} className="form">
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

          {error && <div className="error-message">{error}</div>}

          <Button buttonType="primary" type="submit">
            Login
          </Button>
        </form>

        <div className="link">
          Don't have an account yet?{' '}
          <Link to="/register">Become Contributor</Link>
        </div>
      </div>
    </div>
  );
};
