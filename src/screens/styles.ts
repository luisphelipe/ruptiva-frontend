import styled, { css } from "styled-components";

export interface ContainerProps {
  maxWidth?: string;
  maxHeight?: string;
  alignItems?: string;
  justifyContent?: string;
  flexGrow?: string;
  padding?: string;
  margin?: string;
  alignSelf?: string;
  width?: string;
  gap?: string;
}

export const flex_column = css`
  display: flex;
  flex-direction: column;
`;

export const FlexColumn = styled.div<ContainerProps>`
  ${flex_column};
  justify-content: ${(props) => props.justifyContent || "center"};
  align-items: ${(props) => props.alignItems || "flex-start"};
  flex-grow: ${(props) => props.flexGrow};
  align-self: ${(props) => props.alignSelf};
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  gap: ${(props) => props.gap};
`;

export const FlexColumnExpand = styled.div<ContainerProps>`
  ${flex_column};
  width: 100%;
  height: 100%;
  max-width: ${(props) => props.maxWidth || "400px"};
  max-height: ${(props) => props.maxHeight || "600px"};
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  align-items: ${(props) => props.alignItems || "center"};
  padding: ${(props) => props.padding || 0};
`;

export const FlexRow = styled.div<ContainerProps>`
  display: flex;
  width: 100%;
  max-width: ${(props) => props.maxWidth || "90%"};
  justify-content: ${(props) => props.justifyContent || "space-between"};
  align-items: ${(props) => props.alignItems || "flex-start"};
  margin: ${(props) => props.margin};
`;

export const BookImage = styled.img.attrs({
  src: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Draw_book.png",
})<{ width?: string }>`
  border: 1px solid black;
  width: ${(props) => props.width || "160px"};
  height: ${(props) => props.width || "160px"};
`;

export const input_css = css`
  width: 100%;
  max-width: 500px;
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid black;
  margin: 12px 0 22px;
`;

export const Input = styled.input`
  ${input_css}
`;

interface ButtonProps {
  fontSize?: string;
  height?: string;
  width?: string;
  padding?: string;
  margin?: string;
}

export const Button = styled.button<ButtonProps>`
  font-size: ${(props) => props.fontSize};
  height: ${(props) => props.height};
  width: ${(props) => props.width || "170px"};
  max-width: 100%;
  text-align: center;
  padding: ${(props) => props.padding || "12px"};
  box-sizing: border-box;
  border: 1px solid black;
  margin: ${(props) => props.margin || "0 0 16px 0"};
  background-color: inherit;

  :disabled {
    color: #555;
  }
`;

export const Text = styled.p<{ fontSize?: string; margin?: string }>`
  font-size: ${(props) => props.fontSize};
  margin: ${(props) => props.margin};
`;
