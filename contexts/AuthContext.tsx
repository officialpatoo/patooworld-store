
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, Address, Order, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'patoo_user_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load user session", e);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    // Mock login
    const mockUser: User = {
      id: 'usr_1',
      email,
      firstName: 'Alex',
      lastName: 'Patoo',
      addresses: [],
      orders: [],
      wishlist: [],
      // Adding missing required property 'role'
      role: 'customer'
    };
    setUser(mockUser);
  };

  const register = async (data: Partial<User>) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: data.email || '',
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      addresses: [],
      orders: [],
      wishlist: [],
      // Adding missing required property 'role'
      role: 'customer'
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateWishlist = (productId: string) => {
    if (!user) return;
    setUser(prev => {
      if (!prev) return null;
      const exists = prev.wishlist.includes(productId);
      return {
        ...prev,
        wishlist: exists 
          ? prev.wishlist.filter(id => id !== productId)
          : [...prev.wishlist, productId]
      };
    });
  };

  const isInWishlist = (productId: string) => {
    return user?.wishlist.includes(productId) || false;
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    if (!user) return;
    const newAddress: Address = { ...address, id: Math.random().toString(36).substr(2, 5) };
    setUser(prev => prev ? { ...prev, addresses: [...prev.addresses, newAddress] } : null);
  };

  const removeAddress = (addressId: string) => {
    if (!user) return;
    setUser(prev => prev ? { ...prev, addresses: prev.addresses.filter(a => a.id !== addressId) } : null);
  };

  const placeOrder = async (orderData: Omit<Order, 'id' | 'date' | 'status'>): Promise<string> => {
    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      ...orderData,
      id: orderId,
      date: new Date().toISOString(),
      status: 'processing'
    };
    
    if (user) {
      setUser(prev => prev ? { ...prev, orders: [newOrder, ...prev.orders] } : null);
    }
    
    return orderId;
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateWishlist,
      isInWishlist,
      addAddress,
      removeAddress,
      placeOrder
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
