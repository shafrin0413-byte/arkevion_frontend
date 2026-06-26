import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { authAPI } from '../api';
import { clearAuthSession, getAccessToken, getStoredUser, storeAuthSession } from './tokenStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());
  const [loading, setLoading] = useState(() => Boolean(getAccessToken()));

  const logout = useCallback(() => {
    clearAuthSession();
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    if (!getAccessToken()) {
      setLoading(false);
      return null;
    }

    try {
      const response = await authAPI.me();
      const nextUser = response.data.user;
      setUser(nextUser);
      return nextUser;
    } catch {
      logout();
      return null;
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = useCallback(async (role, credentials) => {
    const request = role === 'admin' ? authAPI.loginAdmin : authAPI.loginStudent;
    const response = await request(credentials);
    storeAuthSession(response.data);
    setUser(response.data.user);
    return response.data.user;
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    isAuthenticated: Boolean(user && getAccessToken()),
    login,
    logout,
    refreshUser,
  }), [loading, login, logout, refreshUser, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
