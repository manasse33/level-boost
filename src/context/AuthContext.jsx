// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import api  from '../api/axios'; // ou ton chemin API

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('lb_token');
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const data = await api('/me');
      setUser(data.user);
    } catch (error) {
      localStorage.removeItem('lb_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const data = await api('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem('lb_token', data.token);
    setUser(data.user);
    return data;
  };

  const register = async (userData) => {
    const data = await api('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    localStorage.setItem('lb_token', data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('lb_token');
    setUser(null);
    window.location.hash = '#/';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout, 
      isAuth: !!user,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be within AuthProvider');
  return context;
};
