import { useContext } from 'react';
import { Link } from 'react-router-dom';
import('../Forms/forms.css');
import { AuthContext } from '../../contexts/AuthContext';
import { LoginForm } from '../Forms/LoginForm';

export const Login = () => {
  const { login, error } = useContext(AuthContext);

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
  };

  return (
    <div className="auth-container">
      <div className="form-wrapper">
        <h2>Come Back to Your Profile</h2>

        <LoginForm onSubmit={handleLogin} error={error} />

        <div className="link">
          Don't have an account yet?{' '}
          <Link to="/register">Become Contributor</Link>
        </div>
      </div>
    </div>
  );
};
