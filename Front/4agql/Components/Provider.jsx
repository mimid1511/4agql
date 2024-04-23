// authContext.js

"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Vérifier si un token est stocké dans le localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Décodez le token pour obtenir les informations d'identification de l'utilisateur
      const userData = decodeToken(token);
      setUser(userData);
    }
  }, []);

  const login = (token) => {
    // Décodez le token pour obtenir les informations d'identification de l'utilisateur
    const userData = decodeToken(token);
    // Stockez le token dans le localStorage
    localStorage.setItem('token', token);
    // Mettez à jour l'état de l'utilisateur avec les informations d'identification
    setUser(userData);
  };

  const logout = () => {
    // Supprimez le token du localStorage
    localStorage.removeItem('token');
    // Réinitialisez l'état de l'utilisateur à null
    setUser(null);
  };

  const isAuthenticated = () => {
    // Vérifiez si l'utilisateur est authentifié en vérifiant s'il y a un utilisateur dans l'état
    return user !== null;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const decodeToken = (token) => {
  if (!token) { return; }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};
