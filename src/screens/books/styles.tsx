import styled from 'styled-components'
import { Link as DefaultLink } from 'react-router-dom'
import { Form as DefaultForm, Field as DefaultField } from 'formik'
import { flex_column, input_css, ContainerProps } from '../styles'

interface ButtonProps {
  fontSize?: string
  height?: string
  width?: string
}

export const LinkButton = styled(DefaultLink)<ButtonProps>`
  font-size: ${(props) => props.fontSize};
  height: ${(props) => props.height};
  width: ${(props) => props.width || '170px'};
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
`

export const Form = styled(DefaultForm)<ContainerProps>`
  ${flex_column};
  justify-content: ${(props) => props.justifyContent || 'center'};
  align-items: ${(props) => props.alignItems || 'flex-start'};
  height: 100%;
  max-height: 700px;
`

export const Field = styled(DefaultField)`
  ${input_css}
  margin-bottom: 0;
  resize: vertical;
`

export const FieldWrapper = styled.div`
  margin-bottom: 22px;
  width: 100%;
`

export const Error = styled.div`
  font-size: 16px;
  color: red;
`

export const Link = styled(DefaultLink)`
  color: black;
  text-align: center;
  box-sizing: border-box;
  background-color: inherit;
  text-decoration: none;
  border-bottom: 1px solid black;
`
