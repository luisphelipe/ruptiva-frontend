import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

import {
  FlexColumnExpand as FCE,
  FlexColumn,
  FlexRow,
  Button,
  Text
} from '../../styles'
import { LinkButton } from '../styles'
import AuthContext from '../../../contexts/auth.context'
import BooksContext from '../../../contexts/books.context'
import BookDisplay from './BookDisplay'
import BookDetailsModal from './BookDetailsModal'
import useWindowSize from '../../../hooks/useWindowSize'
import Pagination from './Pagination'

interface BookType {
  id: number
  title: string
  review: string | null
  rating: number
  image_url: string | null
}

const FlexColumnExpand = styled(FCE)`
  justify-content: 'flex-start';
  padding: clamp(1rem, 4vh, 2rem) 0;
`

const BookColumn = styled(FlexColumn)`
  flex-grow: 1;
  width: 90%;
  justify-content: space-between;
  align-content: stretch;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;

  @media (min-width: 714px) {
    gap: 5%;
  }
`

const DivWrapper = styled.div`
  min-width: 300px;
  max-width: 600px;
  width: min(calc(50% - max(2.5%, 0.5vw), 600px));

  @media (max-width: 714px) {
    width: 100%;
    max-width: 100%;
    /* max-width: 600px; */
  }
`

const EmailLogout = styled(FlexRow)`
  @media (min-width: 714px) {
    justify-content: flex-end;
    gap: 10px;
  }
`

const BookList = () => {
  const { user, logout } = useContext(AuthContext)
  const { books, page, count, deleteBook, fetchBookPage } = useContext(
    BooksContext
  )
  const { width } = useWindowSize()
  const { search } = useLocation()

  const [modalIsOpen, setIsOpen] = useState(false)
  const [book, setBook] = useState<BookType | {}>({})

  const showBookDetails = (id: number) => {
    // eslint-disable-next-line
    setBook(books.find((book) => book.id == id))
    setIsOpen(true)
  }

  const _deleteBook = () => {
    let valid_book = book as BookType
    if (!valid_book.id) return
    deleteBook(valid_book.id)
    setIsOpen(false)
  }

  useEffect(() => {
    if (!search) return
    fetchBookPage(search)
    // eslint-disable-next-line
  }, [search])

  return (
    <FlexColumnExpand>
      <EmailLogout>
        <Text fontSize='12px'>Logged in as {user.email}</Text>

        <Button
          fontSize='12px'
          height='18px'
          width='100px'
          padding='2px'
          onClick={logout}
        >
          logout
        </Button>
      </EmailLogout>
      <FlexRow>
        <Text>YOUR BOOK LIST</Text>
        <LinkButton to='/new' width='100px'>
          CREATE
        </LinkButton>
      </FlexRow>

      <BookColumn>
        {books.map((book) => (
          <DivWrapper
            key={book.id}
            onClick={() => {
              showBookDetails(book.id)
            }}
          >
            <BookDisplay book={book} mobile={(width || 0) < 714} />
          </DivWrapper>
        ))}
      </BookColumn>
      <FlexColumn margin='12px 0 0' width='100%' alignItems='center'>
        <Pagination url='/' page={page} count={count} />
      </FlexColumn>
      <BookDetailsModal
        isOpen={modalIsOpen}
        closeModal={() => setIsOpen(false)}
        book={book}
        deleteBook={_deleteBook}
      />
    </FlexColumnExpand>
  )
}

export default BookList
