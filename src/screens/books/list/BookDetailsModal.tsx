import React from "react";
import Modal from "react-modal";
import { BookImage, Text, FlexColumn } from "../../styles";
import { FlexRow, SmallLinkButton, SmallButton } from "./BookDisplay";
import RatingDisplay from "./RatingDisplay";

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
    width: "100%",
    height: "100%",
    maxHeight: "min(500px, 50%)",
    border: "1px solid black",
    borderRadius: 0,
  },
};

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
          overflow="scroll"
        >
          {book.review || "There is no review for this title."}
        </FlexRow>
        <FlexRow margin="auto 0 0">
          <SmallLinkButton to={`/${book.id}/edit`} margin="0 12px 0 0">
            EDIT
          </SmallLinkButton>
          <SmallButton
            margin="0"
            onClick={() => {
              const confirm_delete = window.confirm(`Are you sure?`);
              if (confirm_delete) deleteBook();
            }}
          >
            DELETE
          </SmallButton>
          <SmallButton onClick={closeModal} margin="0 0 0 auto">
            CLOSE
          </SmallButton>
        </FlexRow>
      </FlexColumn>
    </Modal>
  );
};

export default BookDetailsModal;
