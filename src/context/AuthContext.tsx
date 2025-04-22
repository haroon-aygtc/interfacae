import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the User type
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

// Define the AuthContext interface
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  logout: () => {},
  register: async () => false,
  updateProfile: async () => false,
});

// Define props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Create the AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, you would check for a token in localStorage
        // and validate it with your backend
        const token = localStorage.getItem('auth_token');
        
        if (token) {
          // For demo purposes, we'll just set a mock user
          // In a real app, you would fetch the user data from your API
          setUser({
            id: '1',
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'Administrator',
            avatar: '',
          });
        }
      } catch (error) {
        console.error('Authentication error:', error);
        localStorage.removeItem('auth_token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // In a real app, you would make an API call to your backend
      // For demo purposes, we'll just check for a hardcoded credential
      if (email === 'admin@example.com' && password === 'password') {
        // Mock successful login
        const mockUser = {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'Administrator',
          avatar: '',
        };
        
        // Store token in localStorage
        localStorage.setItem('auth_token', 'mock_token_12345');
        
        // Set user in state
        setUser(mockUser);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  // Register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // In a real app, you would make an API call to your backend
      // For demo purposes, we'll just simulate a successful registration
      const mockUser = {
        id: '2',
        name,
        email,
        role: 'User',
        avatar: '',
      };
      
      // Store token in localStorage
      localStorage.setItem('auth_token', 'mock_token_67890');
      
      // Set user in state
      setUser(mockUser);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Update profile function
  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // In a real app, you would make an API call to your backend
      // For demo purposes, we'll just update the user in state
      if (user) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Update profile error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Create the context value
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
