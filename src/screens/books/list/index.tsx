import React, { useContext } from "react";

import {
  FlexColumnExpand,
  FlexColumn,
  FlexRow,
  Button,
  Text,
} from "../../styles";
import { LinkButton } from "../styles";
import AuthContext from "../../../contexts/auth.context";

const BookList = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <FlexColumnExpand justifyContent="flex-start">
      <FlexRow>
        <Text fontSize="12px">Logged in as {user.email}</Text>
        <Button
          fontSize="12px"
          height="18px"
          width="100px"
          padding="2px"
          onClick={logout}
        >
          logout
        </Button>
      </FlexRow>
      <FlexRow>
        <Text>YOUR BOOK LIST</Text>
        <LinkButton to="/new" width="100px">
          CREATE
        </LinkButton>
      </FlexRow>
      <FlexColumn flexGrow="1">list of books</FlexColumn>
      <FlexColumn>pagination</FlexColumn>
    </FlexColumnExpand>
  );
};

export default BookList;
