import { createContext, useState, useEffect, ReactNode } from 'react';
import { API_URL } from '../constants/global';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/types';

interface AuthContextType {
  user: User | null;
  access_token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  access_token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  register: async () => {},
  login: async () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('access_token') || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          setIsLoading(true);

          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const response = await axios.get(`${API_URL}/auth/user`, config);

          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.log(error);
          localStorage.removeItem('access_token');
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
          setError('Oops, authentication failed. Log in again?');
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, [token]);

  // REGISTER
  const register = async (name: string, email: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });

      localStorage.setItem('access_token', response.data.access_token);

      setToken(response.data.access_token);
      setUser(response.data.user);
      setIsAuthenticated(true);
      navigate('/profile');
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : 'Oops, your email or password is not right. Try again?';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // LOGIN
  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem('access_token', response.data.access_token);

      setToken(response.data.access_token);
      setUser(response.data.user);
      setIsAuthenticated(true);

      // Admins should go to Dashboard, Users to Profile:
      if (response.data.user.role === 'admin') {
        navigate('/admin');
      } else navigate('/profile');
    } catch (error) {
      console.error('Login error:', error);
      setError('Oops, your email or password is not right. Try again?');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        access_token: token,
        isAuthenticated,
        isLoading,
        error,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
