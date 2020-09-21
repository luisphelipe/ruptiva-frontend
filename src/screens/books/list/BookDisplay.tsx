import React, { useContext } from "react";
import styled, { css } from "styled-components";

import BooksContext from "../../../contexts/books.context";
import { BookImage, Text, Button, FlexColumn } from "../../styles";
import { LinkButton } from "../styles";
import RatingDisplay from "./RatingDisplay";

const FlexRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* margin: 0 0 24px; */
`;

const small_button = css`
  font-size: 12px;
  width: 50px;
  padding: 0;
  margin: 0 0 6px;
`;
const SmallButton = styled(Button)`
  ${small_button}
`;

const SmallLinkButton = styled(LinkButton)`
  ${small_button}
`;

const BookDisplay = ({ book }: any) => {
  const { deleteBook } = useContext(BooksContext);

  return (
    <FlexRow>
      <BookImage width="60px" />
      <FlexColumn
        margin="0 0 0 12px"
        flexGrow="1"
        justifyContent="space-around"
      >
        <Text>{book.title}</Text>
        <RatingDisplay rating={book.rating} />
        {/* <Text>{book.rating}</Text> */}
      </FlexColumn>
      <FlexColumn alignSelf="flex-start">
        <SmallLinkButton to={`/${book.id}/edit`}>EDIT</SmallLinkButton>
        <SmallButton
          onClick={() => {
            const confirm_delete = window.confirm(`Are you sure?`);
            if (confirm_delete) deleteBook(book.id);
          }}
        >
          DELETE
        </SmallButton>
      </FlexColumn>
    </FlexRow>
  );
};

export default BookDisplay;
