import { useContext, useEffect, useState } from 'react';
import './user-profile.css';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import { API_URL } from '../../constants/global';
import { Product } from '../../types/types';
import { AccountInfo } from './components/AccountInfo';
import { UserProductsList } from './components/UserProductsList';
import { Tabs } from '../Tabs/Tabs';

type Tab = 'user-info' | 'user-products';

// DOES NOT SHOW PRODUCTS YET

export const UserProfile = () => {
  const { user, access_token } = useContext(AuthContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('user-info');

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

  useEffect(() => {
    if (!access_token) return;

    if (activeTab === 'user-products') {
      fetchUserProducts();
    }
  }, [access_token, activeTab]);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Your Profile</h1>
        <p>Welcome back, {user?.name}!</p>
      </div>

      <div className="tabs">
        <Tabs
          isActive={activeTab === 'user-info'}
          onClick={() => setActiveTab('user-info')}
        >
          Your Info
        </Tabs>

        <Tabs
          isActive={activeTab === 'user-products'}
          onClick={() => setActiveTab('user-products')}
        >
          Your Submissions
        </Tabs>
      </div>

      <div className="profile-content">
        {activeTab === 'user-info' && (
          <>
            {user ? (
              <AccountInfo user={user} />
            ) : (
              <p>Loading account info...</p>
            )}
          </>
        )}

        {activeTab === 'user-products' && (
          <UserProductsList products={products} loading={loadingProducts} />
        )}
      </div>
    </div>
  );
};
