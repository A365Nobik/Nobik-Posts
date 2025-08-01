import { createContext, useState, useEffect, useContext } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  const value = {
    user,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>
    {children}
  </UserContext.Provider>;
}

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};
