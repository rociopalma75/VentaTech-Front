import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData); // Guardar datos del usuario
  };

  const logout = () => {
    setUser(null); // Cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);