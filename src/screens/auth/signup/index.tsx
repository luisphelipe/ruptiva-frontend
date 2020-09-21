import React, { useState, useContext } from "react";
import AuthContext from "../../../contexts/auth.context";

import ErrorList from "../../../components/ErrorList";
import {
  FlexColumnExpand,
  FlexColumn,
  BookImage,
  Input,
  Button,
} from "../../styles";
import { Link } from "../styles";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<false | string[]>(false);
  const [loading, setLoading] = useState(false);

  const { signup } = useContext(AuthContext);

  const submitSignup = async () => {
    setLoading(true);

    const res = await signup(email, password);

    setErrors(res.errors);
    setLoading(false);
  };

  return (
    <FlexColumnExpand justifyContent="space-around">
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
        <Button onClick={submitSignup} disabled={loading}>
          {loading ? "LOADING..." : "SIGNUP"}
        </Button>
        <Link to="/login">...OR LOGIN</Link>
      </FlexColumn>
    </FlexColumnExpand>
  );
};

export default Signup;
