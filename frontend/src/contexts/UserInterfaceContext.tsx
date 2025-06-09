import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import { Product } from '../types/types';
import { AuthContext } from './AuthContext';

interface UserInterfaceContextType {
  favoriteProducts: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
}

export const UserInterfaceContext = createContext<UserInterfaceContextType>({
  favoriteProducts: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
});

interface UserInterfaceProviderProps {
  children: ReactNode;
}

export const UserInterfaceProvider = ({
  children,
}: UserInterfaceProviderProps) => {
  // needed when using localStorage to store favorites:
  const { user } = useContext(AuthContext);
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  // needed to show favorites --> from localStorage to loggedin user:
  useEffect(() => {
    if (!user) return;

    try {
      const stored = localStorage.getItem(`favoriteProducts_${user._id}`);
      setFavoriteProducts(stored ? JSON.parse(stored) : []);
    } catch {
      setFavoriteProducts([]);
    }
  }, [user]);

  // needed to save favorites --> to localStorage:
  useEffect(() => {
    if (!user) return;

    try {
      localStorage.setItem(
        `favoriteProducts_${user._id}`,
        JSON.stringify(favoriteProducts)
      );
    } catch (error) {
      console.error('Failed to save favorites to localStorage:', error);
    }
  }, [favoriteProducts, user]);

  const addToFavorites = (product: Product) => {
    setFavoriteProducts((prev) => {
      if (!prev.some((fav) => fav._id === product._id)) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromFavorites = (productId: string) => {
    setFavoriteProducts((prev) => prev.filter((fav) => fav._id !== productId));
  };

  return (
    <UserInterfaceContext.Provider
      value={{
        favoriteProducts,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </UserInterfaceContext.Provider>
  );
};
