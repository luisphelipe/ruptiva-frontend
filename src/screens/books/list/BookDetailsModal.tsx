import React from "react";
import Modal from "react-modal";
import { BookImage, Text, FlexColumn } from "../../styles";
import { FlexRow, SmallLinkButton, SmallButton } from "./BookDisplay";
import RatingDisplay from "./RatingDisplay";
import styled, { css } from "styled-components";

const customStyles = {
  overlay: {
    backdropFilter: "blur(5px)",
    background: "inherit",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "90%",
    width: "min(100%, 500px)",
    height: "100%",
    maxHeight: "min(500px, 50%)",
    border: "1px solid black",
    borderRadius: 0,
  },
};

const button_css = css`
  @media (min-width: 715px) {
    font-size: 16px;
    padding: 2px 20px;
    width: auto;
  }
`;
const Button = styled(SmallButton)`
  ${button_css};
`;

const LinkButton = styled(SmallLinkButton)`
  ${button_css};
`;

Modal.setAppElement("#root");

const BookDetailsModal = ({ isOpen, closeModal, book, deleteBook }: any) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Book Details"
    >
      <FlexColumn height="100%">
        <FlexRow margin="0">
          <BookImage height="60px" src={book.image_url} />
          <FlexColumn
            margin="0 0 0 12px"
            flexGrow="1"
            justifyContent="space-around"
          >
            <Text>{book.title}</Text>
            <RatingDisplay rating={book.rating} />
          </FlexColumn>
        </FlexRow>
        <FlexRow
          flexGrow="1"
          maxHeight="50%"
          alignItems="flex-start"
          overflow="auto"
        >
          {book.review || "There is no review for this title."}
        </FlexRow>
        <FlexRow margin="auto 0 0">
          <LinkButton to={`/${book.id}/edit`} margin="0 12px 0 0">
            EDIT
          </LinkButton>
          <Button
            margin="0"
            onClick={() => {
              const confirm_delete = window.confirm(`Are you sure?`);
              if (confirm_delete) deleteBook();
            }}
          >
            DELETE
          </Button>
          <Button onClick={closeModal} margin="0 0 0 auto">
            CLOSE
          </Button>
        </FlexRow>
      </FlexColumn>
    </Modal>
  );
};

export default BookDetailsModal;
