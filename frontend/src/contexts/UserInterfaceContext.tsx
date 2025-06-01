import { createContext, useState, ReactNode } from 'react';
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
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

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
