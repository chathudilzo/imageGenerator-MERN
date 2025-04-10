import { createContext, useState, useContext, useEffect } from "react";

import axios from "axios";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        return;
      }

      try {
        const res = await axios.get("/api/auth/getUser", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
      } catch (error) {
        console.error("Invalid token", error.response?.data.message);
        localStorage.removeItem("token");
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
