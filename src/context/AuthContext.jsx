import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    // ✅ Restore User & Role from Local Storage on Page Refresh
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedRole = localStorage.getItem("role");

    if (storedUser && storedRole) {
      setUser(storedUser);
      setRole(storedRole);
    }
  }, []);

  const loginUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("role", userData.role);
    setUser(userData);
    setRole(userData.role);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setUser(null);
    setRole(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, role, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
