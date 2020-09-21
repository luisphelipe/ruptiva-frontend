import React, { useState, useContext } from "react";
import AuthContext from "../../../contexts/auth.context";

import ErrorList from "../ErrorList";
import {
  FlexColumnExpand,
  BookImage,
  FlexColumn,
  Input,
  Button,
  Link,
} from "../style";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<false | string[]>(false);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const submitlogin = async () => {
    setLoading(true);

    const res = await login(email, password);

    setErrors(res.errors);
    setLoading(false);
  };

  return (
    <FlexColumnExpand>
      <BookImage />
      <FlexColumn>
        <label htmlFor="email">E-mail</label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ErrorList errors={errors} />
      </FlexColumn>
      <FlexColumn alignItems="center">
        <Button onClick={submitlogin} disabled={loading}>
          {loading ? "LOADING..." : "LOGIN"}
        </Button>
        <Link to="/signup">...OR SIGNUP</Link>
      </FlexColumn>
    </FlexColumnExpand>
  );
};

export default Login;
