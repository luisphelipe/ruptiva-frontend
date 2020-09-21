import React, { useState, useEffect } from "react";
import AuthContext from "../contexts/auth.context";

import { login, signup } from "../api/auth.api";
const TOKEN_STORAGE_PATH = "@ruptiva-luis-phelipe/token";
const USER_STORAGE_PATH = "@ruptiva-luis-phelipe/user";

interface User {
  id: string;
  email: string;
}

const AuthService = ({ children }: { children: any }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<User>({ id: "", email: "" });

  const _login = async (email: string, password: string) => {
    try {
      const res = await login(email, password);
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem(TOKEN_STORAGE_PATH, res.data.token);
      localStorage.setItem(USER_STORAGE_PATH, JSON.stringify(res.data.user));
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
      setUser(res.data.user);
      localStorage.setItem(TOKEN_STORAGE_PATH, res.data.token);
      localStorage.setItem(USER_STORAGE_PATH, JSON.stringify(res.data.user));
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
    localStorage.setItem(USER_STORAGE_PATH, "");
  };

  useEffect(() => {
    const stored_token = localStorage.getItem(TOKEN_STORAGE_PATH);
    if (stored_token) setToken(stored_token);

    const stored_user = localStorage.getItem(USER_STORAGE_PATH);
    if (stored_user) setToken(JSON.parse(stored_user));
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, setToken, login: _login, signup: _signup, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthService;
