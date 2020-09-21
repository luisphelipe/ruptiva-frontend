import React, { useState, useContext } from "react";

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
import BookDetailsModal from "./BookDetailsModal";

interface BookType {
  id: number;
  title: string;
  review: string | null;
  rating: number;
  image_url: string | null;
}

const BookList = () => {
  const { user, logout } = useContext(AuthContext);
  const { books, deleteBook } = useContext(BooksContext);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [book, setBook] = useState<BookType | {}>({});

  const showBookDetails = (id: number) => {
    // eslint-disable-next-line
    setBook(books.find((book) => book.id == id));
    setIsOpen(true);
  };

  const _deleteBook = () => {
    let valid_book = book as BookType;
    if (!valid_book.id) return;
    deleteBook(valid_book.id);
    setIsOpen(false);
  };

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
          <div
            key={book.id}
            style={{ width: "100%" }}
            onClick={() => {
              showBookDetails(book.id);
            }}
          >
            <BookDisplay book={book} />
          </div>
        ))}
      </FlexColumn>
      <FlexColumn>pagination</FlexColumn>
      <BookDetailsModal
        isOpen={modalIsOpen}
        closeModal={() => setIsOpen(false)}
        book={book}
        deleteBook={_deleteBook}
      />
    </FlexColumnExpand>
  );
};

export default BookList;
