import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    // Simulate login logic (replace with actual authentication logic)
    if (email === 'user@mail.com' && password === 'pass123') {
      setUser({ email });
      return { email };
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const register = async (email, password) => {
    // Simulate register logic (replace with actual registration logic)
    setUser({ email });
    return { email };
  };

  const logout = async () => {
    // Simulate logout logic (replace with actual logout logic)
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
