import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../contexts/auth.context";
import BooksContext from "../contexts/books.context";

import { createBook } from "../api/book.api";

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

  useEffect(() => {
    console.log("book list updated");
    console.log(books);
  }, [books]);

  return (
    <BooksContext.Provider value={{ books, createBook: _createBook }}>
      {children}
    </BooksContext.Provider>
  );
};

export default AuthService;
