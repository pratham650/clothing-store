import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [version, setVersion] = useState(0); // 🔁 this triggers re-render

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser(decoded);
    setVersion((prev) => prev + 1); // 🔁 trigger context update
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setVersion((prev) => prev + 1); // 🔁 trigger context update
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        if (!isExpired) {
          setUser(decoded);
        } else {
          logout();
        }
      } catch (err) {
        console.error("Invalid token", err);
        logout();
      }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, version }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
