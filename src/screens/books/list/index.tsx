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
import BooksContext from "../../../contexts/books.context";
import BookDisplay from "./BookDisplay";

const BookList = () => {
  const { user, logout } = useContext(AuthContext);
  const { books } = useContext(BooksContext);

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

      <FlexColumn
        flexGrow="1"
        width="90%"
        justifyContent="flex-start"
        gap="20px"
      >
        {books.map((book) => (
          <BookDisplay book={book} />
        ))}
      </FlexColumn>
      <FlexColumn>pagination</FlexColumn>
    </FlexColumnExpand>
  );
};

export default BookList;
