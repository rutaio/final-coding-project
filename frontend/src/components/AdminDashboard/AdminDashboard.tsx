import { useContext, useEffect, useState } from 'react';
import '../UserProfile/user-profile.css';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import { API_URL } from '../../constants/global';
import { Product, User } from '../../types/types';
import { AdminProductsList } from './components/AdminProductsList';
import { AllUsers } from './components/AllUsers';

type Tab = 'admin-all-products' | 'admin-all-users';

export const AdminDashboard = () => {
  const { user, access_token } = useContext(AuthContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('admin-all-products');
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (!isAdmin || !access_token) return;

    if (activeTab === 'admin-all-products') {
      fetchAdminProducts();
    } else if (activeTab === 'admin-all-users') {
      fetchUsers();
    }
  }, [isAdmin, access_token, activeTab]);

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
      const config = {
        headers: { Authorization: `Bearer ${access_token}` },
      };

      const response = await axios.get<User[]>(
        `${API_URL}/auth/all-users`,
        config
      );
      setUsers(response.data);
      setLoadingUsers(false);
    } catch (error) {
      console.error('Error fetching all users:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, {user?.name}!</p>
      </div>

      {isAdmin && (
        <div className="tabs">
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
