import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  forgotPassword: async () => false,
  resetPassword: async () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing authentication on component mount
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (token) {
          // In a real app, you would validate the token with your backend
          // For this mock, we'll just assume the token is valid if it exists
          setUser({
            id: "1",
            name: "Admin User",
            email: "admin@example.com",
            role: "admin",
          });
        }
      } catch (error) {
        console.error("Authentication error:", error);
        localStorage.removeItem("authToken");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      // In a real app, this would make an API call to your backend
      // For this mock, we'll just simulate a successful login for specific credentials
      if (email === "admin@example.com" && password === "password") {
        // Simulate successful login
        const user = {
          id: "1",
          name: "Admin User",
          email,
          role: "admin",
        };

        // Store token and user info
        localStorage.setItem("authToken", "mock-jwt-token");
        setUser(user);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      // In a real app, this would make an API call to your backend
      // For this mock, we'll just simulate a successful registration
      const user = {
        id: "1",
        name,
        email,
        role: "user",
      };

      // Store token and user info
      localStorage.setItem("authToken", "mock-jwt-token");
      setUser(user);
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    // In a real app, this would make an API call to trigger a password reset email
    return true;
  };

  const resetPassword = async (token: string, password: string): Promise<boolean> => {
    // In a real app, this would make an API call to reset the password using the token
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
