import { createContext } from "react";

interface ContextProps {
  books: any[];
  getBook: (values: any) => any;
  createBook: (values: any) => any;
  updateBook: (id: any, values: any) => any;
  deleteBook: (id: any) => any;
}

const BooksContext = createContext<ContextProps>({
  books: [],
  getBook: (id) => ({}),
  createBook: (values) => ({}),
  updateBook: (id, values) => ({}),
  deleteBook: (id) => ({}),
});

export default BooksContext;
