import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, setToken as saveToken, removeToken as removeStoredToken } from './auth';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => { },
  logout: () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getToken());

  const login = (token: string) => {
    saveToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeStoredToken();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    setIsAuthenticated(!!getToken());
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
