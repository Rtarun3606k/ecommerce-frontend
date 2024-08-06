import React, { createContext, useState, useEffect } from "react";
import { get_cookies_data, delete_cookies_storedata } from "./Utility/Auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const token = get_cookies_data(false, true);
    setIsTokenValid(!!token);
  }, []);

  const logout = () => {
    delete_cookies_storedata();
    setIsTokenValid(false);
  };

  return (
    <AuthContext.Provider value={{ isTokenValid, setIsTokenValid, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
