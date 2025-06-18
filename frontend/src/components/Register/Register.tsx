import { useContext } from 'react';
import { Link } from 'react-router-dom';
import('../Forms/forms.css');
import { AuthContext } from '../../contexts/AuthContext';
import { RegisterForm } from '../Forms/RegisterForm';

export const Register = () => {
  const { register, error } = useContext(AuthContext);

  const handleRegister = async (
    name: string,
    email: string,
    password: string
  ) => {
    await register(name, email, password);
  };

  return (
    <div className="auth-container">
      <div className="form-wrapper">
        <h2>Become a Contributor</h2>

        <RegisterForm onSubmit={handleRegister} error={error} />

        <div className="link">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
};
