import { useContext, useEffect, useState } from 'react';
import '../UserProfile/user-profile.css';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import { API_URL } from '../../constants/global';
import { Product, User } from '../../types/types';
import { AdminProductsList } from './components/AdminProductsList';
import { AllUsers } from './components/AllUsers';
import { Tabs } from '../Tabs/Tabs';

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

  const handleDeleteProduct = async (_id: string) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this product?'
    );

    if (!confirm) {
      return;
    }

    if (!access_token) {
      alert('You are not authorized to perform this action.');
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    try {
      await axios.delete(`${API_URL}/products/${_id}`, config);
      setProducts(products.filter((product) => product._id !== _id));
    } catch (error) {
      console.error('Error in deleting a product:', error);
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
          <Tabs
            isActive={activeTab === 'admin-all-products'}
            onClick={() => setActiveTab('admin-all-products')}
          >
            Manage All Products
          </Tabs>

          <Tabs
            isActive={activeTab === 'admin-all-users'}
            onClick={() => setActiveTab('admin-all-users')}
          >
            Manage All Users
          </Tabs>
        </div>
      )}

      <div className="profile-content">
        {activeTab === 'admin-all-products' && (
          <AdminProductsList
            products={products}
            loading={loadingProducts}
            fetchAdminProducts={fetchAdminProducts}
            handleDeleteProduct={handleDeleteProduct}
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
