import React from "react";
import {
  FlexColumnExpand,
  BookImage,
  FlexColumn,
  Input,
  Button,
  Link,
} from "../style";

const Login = () => {
  return (
    <FlexColumnExpand>
      <BookImage />
      <FlexColumn>
        <label htmlFor="email">E-mail</label>
        <Input id="email" name="email" type="email" required />
        <label htmlFor="password">Password</label>
        <Input id="password" name="password" type="password" required />
      </FlexColumn>
      <FlexColumn alignItems="center">
        <Button onClick={() => console.log("TODO: submit login")}>LOGIN</Button>
        <Link to="/signup">...OR SIGNUP</Link>
      </FlexColumn>
    </FlexColumnExpand>
  );
};

export default Login;
