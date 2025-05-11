import { useContext, useEffect, useState } from 'react';
import './profile.css';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import { API_URL } from '../../constants/global';
import { Product } from '../../types/types';
import { SubmittedProducts } from './SubmittedProducts';
import { AccountInfo } from './AccountInfo';

export const Profile = () => {
  const { user, access_token } = useContext(AuthContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      const response = await axios.get<Product[]>(
        `${API_URL}/products`,
        config
      );
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching user submitted products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (access_token) {
      fetchProducts();
    }
  }, [access_token]);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Your Profile</h1>
        <p>Welcome back, {user?.name}!</p>
      </div>

      <div className="submitted-products">
        <SubmittedProducts products={products} loading={loading} />
      </div>

      <div>
        <AccountInfo user={user} />
      </div>
    </div>
  );
};
