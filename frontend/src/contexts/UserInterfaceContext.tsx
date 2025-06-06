import { createContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types/types';

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
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem('favoriteProducts');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // save favorites to localStorage:
  useEffect(() => {
    try {
      localStorage.setItem(
        'favoriteProducts',
        JSON.stringify(favoriteProducts)
      );
    } catch (error) {
      console.error('Failed to save favorites to localStorage:', error);
    }
  }, [favoriteProducts]);

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
