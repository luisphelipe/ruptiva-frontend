import React, { useState } from "react";
import AuthContext from "../contexts/auth.context";

import { login, signup } from "../api/auth.api";

const AuthService = ({ children }: { children: any }) => {
  const [token, setToken] = useState("");

  const _login = async (email: string, password: string) => {
    try {
      const res = await login(email, password);
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

  return (
    <AuthContext.Provider
      value={{ token, setToken, login: _login, signup: _signup }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthService;
