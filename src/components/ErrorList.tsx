import React from "react";
import { UnorderedList, Error } from "./styles";

const ErrorList = ({ errors }: { errors: string[] | false }) => {
  return errors ? (
    <UnorderedList>
      {errors.map((error) => (
        <Error>{error}</Error>
      ))}
    </UnorderedList>
  ) : (
    <></>
  );
};

export default ErrorList;
