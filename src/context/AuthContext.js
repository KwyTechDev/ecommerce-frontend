import React, { createContext, useState } from 'react';

// Create the AuthContext with default values
export const AuthContext = createContext({
  user: null,
  login: () => {},
  register: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Implement login logic here
    // For example:
    setUser({ email });
  };

  const register = (email, password) => {
    // Implement registration logic here
    // For example:
    setUser({ email });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
