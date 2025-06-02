
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'User' | 'Admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Simulate token validation - in real app, verify with backend
      const mockUser = {
        id: '1',
        email: 'user@example.com',
        name: 'John Doe',
        role: 'User' as const
      };
      setUser(mockUser);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: email === 'admin@example.com' ? 'admin1' : '1',
        email,
        name: email === 'admin@example.com' ? 'Admin User' : 'John Doe',
        role: email === 'admin@example.com' ? 'Admin' as const : 'User' as const
      };
      
      localStorage.setItem('token', 'mock-jwt-token');
      setUser(mockUser);
      toast.success('Login successful!');
      return true;
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: Date.now().toString(),
        email,
        name,
        role: 'User' as const
      };
      
      localStorage.setItem('token', 'mock-jwt-token');
      setUser(mockUser);
      toast.success('Registration successful!');
      return true;
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
