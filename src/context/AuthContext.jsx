import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

function decodeToken(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('accessToken'));
  const [userId, setUserId] = useState(() => {
    const t = localStorage.getItem('accessToken');
    return t ? (decodeToken(t)?.id ?? null) : null;
  });

  const login = (newToken) => {
    localStorage.setItem('accessToken', newToken);
    setToken(newToken);
    const payload = decodeToken(newToken);
    setUserId(payload?.id ?? null);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setToken(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ token, userId, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
