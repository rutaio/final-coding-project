import { useContext, useEffect, useState } from 'react';
import './profile.css';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import { API_URL } from '../../constants/global';
import { Product } from '../../types/types';
import { AdminProductsList } from './components/AdminProductsList';
import { AccountInfo } from './components/AccountInfo';
import { AllUsers } from './components/AllUsers';
import { UserProductsList } from './components/UserProductsList';

type Tab = 'user' | 'admin-all-products' | 'admin-all-users';

// The parent Profile fetches products and passes them to AdminProductsList

export const Profile = () => {
  const { user, access_token } = useContext(AuthContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('user');
  const isAdmin = user?.role === 'admin';

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      let response;
      if (isAdmin) {
        response = await axios.get<Product[]>(
          `${API_URL}/products/admin`,
          config
        );
      } else {
        response = await axios.get<Product[]>(`${API_URL}/products/my`, config);
      }
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
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

      {isAdmin && (
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'user' ? 'active' : ''}`}
            onClick={() => setActiveTab('user')}
          >
            Your Submitted Products
          </button>
          <button
            className={`tab-button ${
              activeTab === 'admin-all-products' ? 'active' : ''
            }`}
            onClick={() => setActiveTab('admin-all-products')}
          >
            Manage Submitted Products
          </button>
          <button
            className={`tab-button ${
              activeTab === 'admin-all-users' ? 'active' : ''
            }`}
            onClick={() => setActiveTab('admin-all-users')}
          >
            Manage Users
          </button>
        </div>
      )}

      <div className="profile-content">
        {activeTab === 'user' && (
          <>
            <AccountInfo user={user} />
            <UserProductsList products={products} loading={loading} />
          </>
        )}

        {activeTab === 'admin-all-products' && (
          <AdminProductsList
            products={products}
            loading={loading}
            fetchProducts={fetchProducts}
          />
        )}
        {activeTab === 'admin-all-users' && <AllUsers />}
      </div>
    </div>
  );
};
