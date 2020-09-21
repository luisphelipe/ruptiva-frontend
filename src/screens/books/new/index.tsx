import React, { useState, useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import BooksContext from "../../../contexts/books.context";

import RatingInputField from "../RatinInputField";

import ErrorList from "../../../components/ErrorList";
import {
  FlexColumnExpand,
  FlexColumn,
  FlexRow,
  Button,
  Text,
} from "../../styles";
import { Form, Field, Error, Link, FieldWrapper } from "../styles";
import { Redirect } from "react-router-dom";

const BookSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  review: Yup.string(),
  image_url: Yup.string(),
  rating: Yup.number(),
});

const ErrorFor = ({ errors, touched, _key }: any) => {
  return errors[_key] && touched[_key] ? <Error>{errors[_key]}</Error> : null;
};

const BookNew = () => {
  const [apiErrors, setApiErrors] = useState<false | string[]>(false);
  const [success, setSuccess] = useState(false);

  const { createBook } = useContext(BooksContext);

  const submitForm = async (values: any) => {
    let trimmed_values: any = {};

    // Remove empty values
    Object.keys(values).forEach((key) => {
      if (values[key]) trimmed_values[key] = values[key];
    });

    return await createBook(trimmed_values);
  };

  return (
    <Formik
      initialValues={{
        title: "",
        review: "",
        image_url: "",
        rating: 3,
      }}
      validationSchema={BookSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const res = await submitForm(values);
        setSubmitting(false);
        if (res.errors) setApiErrors(res.errors);
        else setSuccess(true);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <FlexColumnExpand padding="24px">
          {success && <Redirect to="/" />}
          <Form>
            <Text>CREATE NEW BOOK</Text>

            <FlexColumn flexGrow="1">
              <FieldWrapper>
                <label htmlFor="title">Title*</label>
                <Field id="title" name="title" />
                <ErrorFor _key="title" {...{ errors, touched }} />
              </FieldWrapper>

              <FieldWrapper>
                <label htmlFor="review">Review</label>
                <Field id="review" name="review" as="textarea" />
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
                {isSubmitting ? "LOADING..." : "CREATE"}
              </Button>
            </FlexRow>
          </Form>
        </FlexColumnExpand>
      )}
    </Formik>
  );
};

export default BookNew;
