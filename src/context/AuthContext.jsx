import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios'; // Assurez-vous que le chemin est bon

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // 1. Initialisation PARESSEUSE (Lazy) pour éviter la redirection immédiate
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  // Si on a un user dans le storage, on ne charge pas, sinon oui
  const [loading, setLoading] = useState(!localStorage.getItem('token'));

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    // On utilise 'token' car c'est ce que axios.js attend
    const token = localStorage.getItem('token');
    
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // Axios s'utilise comme ça (pas de 'method' ou 'body')
      const response = await api.get('/me');
      
      // Mise à jour avec les données fraîches du serveur
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      console.error("Session expirée", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    // Syntaxe correcte pour Axios
    const response = await api.post('/login', { email, password });
    
    const { token, user } = response.data;

    // IMPORTANT : On utilise 'token' pour matcher axios.js
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    setUser(user);
    return response.data;
  };

  const register = async (userData) => {
    const response = await api.post('/register', userData);
    
    const { token, user } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    setUser(user);
    return response.data;
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (e) {
      // On ignore l'erreur de logout côté serveur si le token est déjà invalide
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      window.location.href = '/login';
    }
  };

  // Rôles autorisés pour l'admin (correspond à votre AdminRoute)
  const allowedAdminRoles = ['admin', 'cm', 'da', 'sales'];
  const isAdmin = user && allowedAdminRoles.includes(user.role);

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser, // Ajouté au cas où
      loading, 
      login, 
      register, 
      logout, 
      isAuth: !!user,
      isAdmin
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