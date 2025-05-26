import { useContext, useEffect, useState } from 'react';
import './profile.css';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import { API_URL } from '../../constants/global';
import { Product, User } from '../../types/types';
import { AdminProductsList } from './components/AdminProductsList';
import { AccountInfo } from './components/AccountInfo';
import { AllUsers } from './components/AllUsers';
import { UserProductsList } from './components/UserProductsList';

type Tab = 'user' | 'admin-all-products' | 'admin-all-users';

export const Profile = () => {
  const { user, access_token } = useContext(AuthContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('user');
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (!access_token) return;

    if (activeTab === 'user') {
      fetchUserProducts();
    } else if (activeTab === 'admin-all-products') {
      fetchAdminProducts();
    } else if (activeTab === 'admin-all-users') {
      fetchUsers();
    }
  }, [access_token, activeTab]);

  const fetchUserProducts = async () => {
    setLoadingProducts(true);
    try {
      const config = { headers: { Authorization: `Bearer ${access_token}` } };
      const response = await axios.get<Product[]>(
        `${API_URL}/products/my`,
        config
      );
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchAdminProducts = async () => {
    setLoadingProducts(true);
    try {
      const config = { headers: { Authorization: `Bearer ${access_token}` } };
      const response = await axios.get<Product[]>(
        `${API_URL}/products/admin`,
        config
      );
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const config = { headers: { Authorization: `Bearer ${access_token}` } };
      const response = await axios.get<User[]>(
        `${API_URL}/auth/all-users`,
        config
      );
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching all users:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

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
            Your Submissions
          </button>
          <button
            className={`tab-button ${
              activeTab === 'admin-all-products' ? 'active' : ''
            }`}
            onClick={() => setActiveTab('admin-all-products')}
          >
            Manage User Products
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
            {user ? (
              <AccountInfo user={user} />
            ) : (
              <p>Loading account info...</p>
            )}
            <UserProductsList products={products} loading={loadingProducts} />
          </>
        )}

        {activeTab === 'admin-all-products' && (
          <AdminProductsList
            products={products}
            loading={loadingProducts}
            fetchAdminProducts={fetchAdminProducts}
          />
        )}

        {activeTab === 'admin-all-users' && (
          <AllUsers
            users={users}
            loading={loadingUsers}
            fetchUsers={fetchUsers}
          />
        )}
      </div>
    </div>
  );
};
