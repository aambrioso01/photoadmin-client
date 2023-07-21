import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styles from "../../styles/form.module.scss";

export const Signup = () => {
  const initialValues = {
    username: "",
    password: ""
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required("Required"),
    password: Yup.string().min(8).max(20).required("Required"),
  });

  const onSubmit = (data) => {
    axios.post(`${process.env.REACT_APP_API_ROUTE}/auth`, data).then(() => {
        console.log(data);
    })
  };

  return (
    <div className={styles.container}>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form className={styles.form}>

            <ErrorMessage name="username" component="span" className={styles.error} />
            <Field className={styles.input} name="username" placeholder="username" />

            <ErrorMessage name="password" component="span" className={styles.error} />
            <Field className={styles.input} type="password"  name="password" placeholder="password" />

            <button type="submit">Create account</button>
          </Form>
        </Formik>
    </div>
  );
};
