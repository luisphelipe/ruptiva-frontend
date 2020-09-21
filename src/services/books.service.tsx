import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../contexts/auth.context";
import BooksContext from "../contexts/books.context";

import { createBook, updateBook, deleteBook, getBooks } from "../api/book.api";

const AuthService = ({ children }: { children: any }) => {
  const { token } = useContext(AuthContext);
  const [books, setBooks] = useState<any[]>([]);

  const _createBook = async (values: any) => {
    try {
      const res = await createBook(values, token);
      const new_book = res.data.book;
      setBooks((oldBooks) => [new_book, ...oldBooks]);
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

  const _updateBook = async (id: any, values: any) => {
    try {
      const res = await updateBook(id, values, token);
      const new_book = res.data.book;

      setBooks((oldBooks) => {
        const book_list = oldBooks.filter((book) => book.id !== new_book.id);
        return [new_book, ...book_list];
      });
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

  const _getBook = (id: any) => {
    // eslint-disable-next-line
    return books.find((book) => book.id == id);
  };

  const _deleteBook = async (id: any) => {
    try {
      const res = await deleteBook(id, token);
      console.log("response from delete book", res.data);
      setBooks((oldBooks) => {
        return oldBooks.filter((book) => book.id !== id);
      });
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

  useEffect(() => {
    if (!token || books.length > 0) return;

    (async () => {
      try {
        const res = await getBooks(token);
        setBooks(res.data);
      } catch (err) {
        console.log("Failed to get books");
        console.log(err.response);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    console.log("book list updated");
    console.log(books);
  }, [books]);

  return (
    <BooksContext.Provider
      value={{
        books,
        getBook: _getBook,
        createBook: _createBook,
        updateBook: _updateBook,
        deleteBook: _deleteBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export default AuthService;
