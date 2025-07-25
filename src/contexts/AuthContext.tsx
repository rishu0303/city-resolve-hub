
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'superAdmin' | 'departmentAdmin' | 'fieldAgent' | 'serviceProvider';
  department?: 'electrical' | 'sanitation' | 'roads' | 'water' | 'parks';
  availability?: boolean; // for fieldAgent and serviceProvider
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
        role: 'user' as const
      };
      setUser(mockUser);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Enhanced role system with demo users
      let mockUser;
      
      if (email === 'admin@example.com') {
        mockUser = {
          id: 'admin1',
          email,
          name: 'Super Admin',
          role: 'superAdmin' as const
        };
      } else if (email === 'electrical@example.com') {
        mockUser = {
          id: 'dept1',
          email,
          name: 'Electrical Admin',
          role: 'departmentAdmin' as const,
          department: 'electrical' as const
        };
      } else if (email === 'agent@example.com') {
        mockUser = {
          id: 'agent1',
          email,
          name: 'Field Agent',
          role: 'fieldAgent' as const,
          availability: true
        };
      } else if (email === 'provider@example.com') {
        mockUser = {
          id: 'provider1',
          email,
          name: 'Service Provider',
          role: 'serviceProvider' as const,
          department: 'electrical' as const,
          availability: true
        };
      } else {
        mockUser = {
          id: '1',
          email,
          name: 'John Doe',
          role: 'user' as const
        };
      }
      
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
        role: 'user' as const
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
