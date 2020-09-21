import styled from "styled-components";
import { Link as DefaultLink } from "react-router-dom";

export const BookImage = styled.img.attrs({
  src: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Draw_book.png",
})`
  border: 1px solid black;
  width: 160px;
  height: 160px;
`;

interface ContainerProps {
  maxWidth?: string;
  maxHeight?: string;
  alignItems?: string;
  justifyContent?: string;
}

export const FlexColumn = styled.div<ContainerProps>`
  display: flex;
  justify-content: ${(props) => props.justifyContent || "center"};
  align-items: ${(props) => props.alignItems || "flex-start"};
  flex-direction: column;
`;

export const FlexColumnExpand = styled(FlexColumn).attrs({
  alignItems: "center",
  justifyContent: "space-around",
})`
  width: 100%;
  height: 100%;
  max-width: ${(props) => props.maxWidth || "400px"};
  max-height: ${(props) => props.maxHeight || "600px"};
`;

export const Input = styled.input`
  width: 100%;
  max-width: 500px;
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid black;
  margin: 12px 0 22px;
`;

export const Button = styled.button`
  width: 170px;
  max-width: 100%;
  text-align: center;
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid black;
  margin-bottom: 16px;
  background-color: inherit;

  :disabled {
    color: #555;
  }
`;

export const Link = styled(DefaultLink)`
  color: black;
  text-align: center;
  box-sizing: border-box;
  background-color: inherit;
  text-decoration: none;
  border-bottom: 1px solid black;
`;

export const UnorderedList = styled.ul`
  list-style: none;
  width: 100%;
`;

export const Error = styled.li`
  font-size: 16px;
  text-align: center;
  color: red;
`;
