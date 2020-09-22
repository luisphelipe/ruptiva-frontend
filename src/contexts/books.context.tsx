import { createContext } from 'react'

interface ContextProps {
  books: any[]
  page: number
  count: number
  getBook: (values: any) => any
  fetchBookPage: (values: any) => any
  createBook: (values: any) => any
  updateBook: (id: any, values: any) => any
  deleteBook: (id: any) => any
}

const BooksContext = createContext<ContextProps>({
  books: [],
  page: 1,
  count: 1,
  getBook: (id) => ({}),
  fetchBookPage: (id) => ({}),
  createBook: (values) => ({}),
  updateBook: (id, values) => ({}),
  deleteBook: (id) => ({})
})

export default BooksContext
