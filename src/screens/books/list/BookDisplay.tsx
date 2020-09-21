import React, { useContext } from "react";
import styled, { css } from "styled-components";

import BooksContext from "../../../contexts/books.context";
import { BookImage, Text, Button, FlexColumn } from "../../styles";
import { LinkButton } from "../styles";
import RatingDisplay from "./RatingDisplay";

interface FlexRowProps {
  flexGrow?: string;
  maxHeight?: string;
  alignItems?: string;
}

export const FlexRow = styled.div<FlexRowProps>`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: ${(props) => props.alignItems || "center"};
  flex-grow: ${(props) => props.flexGrow};

  max-height: ${(props) => props.maxHeight};
  margin: auto 0;
  overflow: scroll;
  /* margin: 0 0 24px; */
`;

const small_button = css`
  font-size: 12px;
  width: 50px;
  padding: 0;
  margin: 0 0 6px;
`;

interface ButtonProps {
  margin?: string;
}

export const SmallButton = styled(Button)<ButtonProps>`
  ${small_button};
  margin: ${(props) => props.margin};
`;

export const SmallLinkButton = styled(LinkButton)<ButtonProps>`
  ${small_button};
  margin: ${(props) => props.margin};
`;

const BookDisplay = ({ book }: any) => {
  const { deleteBook } = useContext(BooksContext);

  return (
    <FlexRow>
      <BookImage width="60px" src={book.image_url} />
      <FlexColumn
        margin="0 0 0 12px"
        flexGrow="1"
        justifyContent="space-around"
      >
        <Text>{book.title}</Text>
        <RatingDisplay rating={book.rating} />
      </FlexColumn>
      <FlexColumn alignSelf="flex-start">
        <SmallLinkButton to={`/${book.id}/edit`}>EDIT</SmallLinkButton>
        <SmallButton
          onClick={(e) => {
            e.stopPropagation();
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
