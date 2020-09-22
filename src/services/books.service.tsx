import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../contexts/auth.context'
import BooksContext from '../contexts/books.context'
import queryString from 'query-string'

import {
  createBook,
  updateBook,
  deleteBook,
  getBooks,
  fetchBookPage
} from '../api/book.api'

const AuthService = ({ children }: { children: any }) => {
  const [books, setBooks] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(1)

  const { token } = useContext(AuthContext)

  const buildPagination = (pg: number) => `?page=${pg}&limit=6`

  const _createBook = async (values: any) => {
    try {
      const res = await createBook(values, token)
      const new_book = res.data.book
      setBooks((oldBooks) => [new_book, ...oldBooks])
      await _fetchBookPage(buildPagination(page))
    } catch (err) {
      if (err.response.status === 406)
        return {
          errors: err.response.data.error.details.map(
            (error: any) => error.message
          )
        }

      return { errors: [err.response.data.message] }
    }

    return { errors: false }
  }

  const _fetchBookPage = async (search: string) => {
    try {
      const res = await fetchBookPage(search, token)
      setBooks(res.data.books)
      setCount(res.data.count)

      const pagination = queryString.parse(search)
      setPage(parseInt(pagination.page as string))
    } catch (err) {
      if (err.response.status === 406)
        return {
          errors: err.response.data.error.details.map(
            (error: any) => error.message
          )
        }

      return { errors: [err.response.data.message] }
    }

    return { errors: false }
  }

  const _updateBook = async (id: any, values: any) => {
    try {
      const res = await updateBook(id, values, token)
      const new_book = res.data.book

      setBooks((oldBooks) => {
        const book_list = oldBooks.filter((book) => book.id !== new_book.id)
        return [new_book, ...book_list]
      })
      await _fetchBookPage(buildPagination(page))
    } catch (err) {
      if (err.response.status === 406)
        return {
          errors: err.response.data.error.details.map(
            (error: any) => error.message
          )
        }

      return { errors: [err.response.data.message] }
    }

    return { errors: false }
  }

  const _getBook = (id: any) => {
    // eslint-disable-next-line
    return books.find((book) => book.id == id)
  }

  const _deleteBook = async (id: any) => {
    try {
      const res = await deleteBook(id, token)
      console.log('response from delete book', res.data)
      setBooks((oldBooks) => {
        return oldBooks.filter((book) => book.id !== id)
      })
      await _fetchBookPage(buildPagination(page))
    } catch (err) {
      if (err.response.status === 406)
        return {
          errors: err.response.data.error.details.map(
            (error: any) => error.message
          )
        }

      return { errors: [err.response.data.message] }
    }

    return { errors: false }
  }

  useEffect(() => {
    if (!token) {
      setBooks([])
      return
    }

    ;(async () => {
      try {
        const res = await getBooks(token)
        setBooks(res.data.books)
        setCount(res.data.count)
      } catch (err) {
        console.log('Failed to get books')
        console.log(err.response)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  useEffect(() => {
    console.log('book list updated')
    console.log(books)
  }, [books])

  return (
    <BooksContext.Provider
      value={{
        books,
        page,
        count,
        getBook: _getBook,
        fetchBookPage: _fetchBookPage,
        createBook: _createBook,
        updateBook: _updateBook,
        deleteBook: _deleteBook
      }}
    >
      {children}
    </BooksContext.Provider>
  )
}

export default AuthService
