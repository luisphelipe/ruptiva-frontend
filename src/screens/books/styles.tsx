import styled from "styled-components";
import { Link as DefaultLink } from "react-router-dom";

interface ButtonProps {
  fontSize?: string;
  height?: string;
  width?: string;
}

export const LinkButton = styled(DefaultLink)<ButtonProps>`
  font-size: ${(props) => props.fontSize};
  height: ${(props) => props.height};
  width: ${(props) => props.width || "170px"};
  max-width: 100%;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid black;
  margin-bottom: 16px;
  background-color: inherit;
  padding: 6px;

  text-decoration: none;
  color: black;

  :disabled {
    color: #555;
  }
`;
