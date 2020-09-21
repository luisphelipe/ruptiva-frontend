import { createContext } from "react";

interface AuthProps {
  errors: string[] | false;
}

interface ContextProps {
  token: string;
  setToken: (a: string) => void;
  login: (e: string, p: string) => Promise<AuthProps>;
  signup: (e: string, p: string) => Promise<AuthProps>;
  logout: () => void;
  user: { id: string; email: string };
}

const auth_request = (e: string, p: string) => {
  return new Promise<AuthProps>((resolve, reject) => {
    resolve({ errors: false });
  });
};

const AuthContext = createContext<ContextProps>({
  token: "",
  setToken: (a) => {},
  login: auth_request,
  signup: auth_request,
  logout: () => {},
  user: { id: "", email: "" },
});

export default AuthContext;
