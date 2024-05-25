"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { userInfo } from "../(WithCommonLayout)/actions/auth";

export const AuthContext = createContext<any>({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);

  const x = async () => {
    const res = await userInfo();
    setUser(res);
  };

  useEffect(() => {
    x();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
