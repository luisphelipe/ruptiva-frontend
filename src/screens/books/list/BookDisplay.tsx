import React, { useContext } from 'react'
import styled, { css } from 'styled-components'

import BooksContext from '../../../contexts/books.context'
import { BookImage, Text, Button, FlexColumn } from '../../styles'
import { LinkButton } from '../styles'
import RatingDisplay from './RatingDisplay'

interface FlexRowProps {
  flexGrow?: string
  maxHeight?: string
  alignItems?: string
  overflow?: string
  margin?: string
}

export const FlexRow = styled.div<FlexRowProps>`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  /* align-items: ${(props) => props.alignItems || 'center'}; */
  align-items: flex-start;
  flex-grow: ${(props) => props.flexGrow};

  max-height: ${(props) => props.maxHeight};
  margin: ${(props) => props.margin || 'auto 0'};
  overflow: ${(props) => props.overflow};
  /* margin: 0 0 24px; */
`

const small_button = css`
  font-size: 12px;
  width: 50px;
  padding: 0;
  margin: 0 0 6px;
  text-align: center;
  box-sizing: border-box;
`

interface ButtonProps {
  margin?: string
  padding?: string
}

export const SmallButton = styled(Button)<ButtonProps>`
  ${small_button};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`

export const SmallLinkButton = styled(LinkButton)<ButtonProps>`
  ${small_button};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`

const button_css = css`
  padding: 5px;
  text-align: center;
  margin: 0;
  width: 47%;
  cursor: pointer;
`

const DeleteButton = styled(SmallButton)`
  ${button_css};
`
const EditButton = styled(SmallLinkButton)`
  ${button_css};
`

const BookDisplay = ({ book }: any) => {
  const { deleteBook } = useContext(BooksContext)

  return (
    <FlexRow style={{ cursor: 'pointer' }}>
      <BookImage height='60px' src={book.image_url} />
      <FlexColumn
        margin='0 0 0 12px'
        flexGrow='1'
        justifyContent='space-around'
      >
        <Text>{book.title}</Text>
        <RatingDisplay rating={book.rating} />
      </FlexColumn>
      <FlexColumn alignSelf='flex-start'>
        <SmallLinkButton to={`/${book.id}/edit`}>EDIT</SmallLinkButton>
        <SmallButton
          onClick={(e) => {
            e.stopPropagation()
            const confirm_delete = window.confirm(`Are you sure?`)
            if (confirm_delete) deleteBook(book.id)
          }}
        >
          DELETE
        </SmallButton>
      </FlexColumn>
    </FlexRow>
  )
}

const ReviewText = styled(Text)`
  height: 75px;
  max-height: max(10vh, 50px);
  overflow: hidden;

  @media (max-width: 714px) {
    height: 0;
  }
`

// I'm not good at css and already tried too much
const BigBookDisplay = ({ book }: any) => {
  const { deleteBook } = useContext(BooksContext)

  return (
    <FlexRow style={{ cursor: 'pointer' }}>
      <BookImage height='min(160px, 15vw)' src={book.image_url} />

      <FlexColumn
        margin='0 0 0 12px'
        justifyContent='space-around'
        height='min(15vw, 160px)'
        width='100%'
      >
        <FlexRow style={{ justifyContent: 'space-between', marginTop: 0 }}>
          <Text
            style={{
              flexGrow: 1,
              width: '100%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {book.title}
          </Text>
          <RatingDisplay rating={book.rating} style={{ width: 'auto' }} />
        </FlexRow>
        <ReviewText
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {book.review}
        </ReviewText>
        <FlexRow
          style={{
            margin: 'auto 0 0 0 ',
            justifyContent: 'space-between'
          }}
        >
          <EditButton to={`/${book.id}/edit`}>EDIT</EditButton>
          <DeleteButton
            onClick={(e) => {
              e.stopPropagation()
              const confirm_delete = window.confirm(`Are you sure?`)
              if (confirm_delete) deleteBook(book.id)
            }}
          >
            DELETE
          </DeleteButton>
        </FlexRow>
      </FlexColumn>
    </FlexRow>
  )
}

const BookDisplayWrapper = ({ mobile, ...props }: any) => {
  return mobile ? <BookDisplay {...props} /> : <BigBookDisplay {...props} />
}

export default BookDisplayWrapper
