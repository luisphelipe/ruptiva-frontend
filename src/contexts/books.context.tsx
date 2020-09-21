import { createContext } from "react";

interface ContextProps {
  books: any[];
  createBook: (values: any) => any;
  deleteBook: (id: any) => any;
}

const BooksContext = createContext<ContextProps>({
  books: [],
  createBook: (values) => ({}),
  deleteBook: (id) => ({}),
});

export default BooksContext;
