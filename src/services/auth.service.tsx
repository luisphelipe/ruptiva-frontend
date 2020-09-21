import React, { useState, useEffect } from "react";
import AuthContext from "../contexts/auth.context";

import { login, signup } from "../api/auth.api";

const AuthService = ({ children }: { children: any }) => {
  const [token, setToken] = useState("");

  const _login = async (email: string, password: string) => {
    try {
      const res = await login(email, password);
      await setToken(res.data.token);
    } catch (err) {
      if (err.response.status === 406)
        return {
          errors: err.response.data.error.details.map(
            (error: any) => error.message
          ),
        };

      return { errors: [err.response.data.message] };
    }

    return { errors: false };
  };

  const _signup = async (email: string, password: string) => {
    try {
      const res = await signup(email, password);
      setToken(res.data.token);
    } catch (err) {
      if (err.response.status === 406)
        return {
          errors: err.response.data.error.details.map(
            (error: any) => error.message
          ),
        };

      return { errors: [err.response.data.message] };
    }

    return { errors: false };
  };

  const logout = async () => {
    setToken("");
    // TODO: Remove token from localStorage
  };

  useEffect(() => {
    // TODO: Load token from localStorage
    console.log("TODO: LOAD TOKEN FROM LOCAL STORAGE");
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, setToken, login: _login, signup: _signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthService;
