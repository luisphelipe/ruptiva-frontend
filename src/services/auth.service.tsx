import React, { useState, useEffect } from "react";
import AuthContext from "../contexts/auth.context";

import { login, signup } from "../api/auth.api";
const TOKEN_STORAGE_PATH = "@ruptiva-luis-phelipe/token";

const AuthService = ({ children }: { children: any }) => {
  const [token, setToken] = useState("");

  const _login = async (email: string, password: string) => {
    try {
      const res = await login(email, password);
      await setToken(res.data.token);
      localStorage.setItem(TOKEN_STORAGE_PATH, res.data.token);
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
      localStorage.setItem(TOKEN_STORAGE_PATH, res.data.token);
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
    localStorage.setItem(TOKEN_STORAGE_PATH, "");
  };

  useEffect(() => {
    const storage_token = localStorage.getItem(TOKEN_STORAGE_PATH);
    if (storage_token) setToken(storage_token);
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
