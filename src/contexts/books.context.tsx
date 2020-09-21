import { createContext } from "react";

interface ContextProps {
  books: any[];
  createBook: (values: any) => any;
}

const BooksContext = createContext<ContextProps>({
  books: [],
  createBook: (values) => ({}),
});

export default BooksContext;
