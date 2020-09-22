import React, { useState, useContext, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import BooksContext from "../../../contexts/books.context";
import RatingInputField from "../RatingInputField";

import ErrorList from "../../../components/ErrorList";
import {
  FlexColumnExpand,
  FlexColumn,
  FlexRow,
  Button,
  Text,
} from "../../styles";
import { Form, Field, Error, Link, FieldWrapper } from "../styles";
import { Redirect, useParams } from "react-router-dom";

const BookSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  review: Yup.string().nullable(),
  image_url: Yup.string().nullable(),
  rating: Yup.number(),
});

const ErrorFor = ({ errors, touched, _key }: any) => {
  return errors[_key] && touched[_key] ? <Error>{errors[_key]}</Error> : null;
};

const empty_book = {
  title: "",
  review: "",
  image_url: "",
  rating: 0,
};

const BookEdit = () => {
  const [book, setBook] = useState<any>(empty_book);
  const [apiErrors, setApiErrors] = useState<false | string[]>(false);
  const [success, setSuccess] = useState(false);
  const { id } = useParams();

  const { updateBook, getBook } = useContext(BooksContext);

  useEffect(() => {
    if (id && !book.hasOwnProperty("id")) setBook(getBook(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getBook, id]);

  const submitForm = async (values: any) => {
    let trimmed_values: any = {};

    // Remove empty values
    Object.keys(values).forEach((key) => {
      if (values[key] || key === "rating") trimmed_values[key] = values[key];
    });

    console.log("Updating values", values);
    console.log("Updating trimmed_values", trimmed_values);

    return await updateBook(id, trimmed_values);
  };

  return (
    <Formik
      initialValues={book}
      validationSchema={BookSchema}
      onSubmit={async (values, { setSubmitting }) => {
        console.log("VALUES", values);
        const res = await submitForm(values);
        setSubmitting(false);
        if (res.errors) setApiErrors(res.errors);
        else setSuccess(true);
      }}
      enableReinitialize
    >
      {({ errors, touched, isSubmitting }) => (
        <FlexColumnExpand padding="24px" justifyContent="center">
          {success && <Redirect to="/" />}
          <Form>
            <Text>EDIT BOOK #{id}</Text>

            <FlexColumn flexGrow="1">
              <FieldWrapper>
                <label htmlFor="title">Title*</label>
                <Field id="title" name="title" />
                <ErrorFor _key="title" {...{ errors, touched }} />
              </FieldWrapper>

              <FieldWrapper>
                <label htmlFor="review">Review</label>
                <Field id="review" name="review" component="textarea" />
                <ErrorFor _key="review" {...{ errors, touched }} />
              </FieldWrapper>

              <FieldWrapper>
                <label htmlFor="image_url">Image URL</label>
                <Field id="image_url" name="image_url" />
                <ErrorFor _key="image_url" {...{ errors, touched }} />
              </FieldWrapper>

              <FieldWrapper>
                <label htmlFor="rating">Rating</label>
                <Field id="rating" name="rating" component={RatingInputField} />
                <ErrorFor _key="rating" {...{ errors, touched }} />
              </FieldWrapper>
              <ErrorList errors={apiErrors} />
            </FlexColumn>

            <FlexRow maxWidth="100%" alignItems="center">
              <Link to="/">GO BACK</Link>
              <Button
                type="submit"
                margin="0"
                padding="6px 0 3px"
                disabled={isSubmitting}
              >
                {isSubmitting ? "LOADING..." : "SAVE"}
              </Button>
            </FlexRow>
          </Form>
        </FlexColumnExpand>
      )}
    </Formik>
  );
};

export default BookEdit;
