import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  const onSubmit = () => {
    // axios.post(`${process.env.REACT_APP_API_ROUTE}/auth`, data).then(() => {
    //     console.log(data);
    // })


  };

  return (
    <div className={styles.container}>

      <a href="/" className={styles.banner}>
        <img src="/photoscope-big.png" width={300} alt="photoscope" />
        <img src="/logo.png" width={50} alt="photoscope" />
      </a>

      <Formik
        initialValues={initialValues}
        onSubmit={async (data) => {
          axios.post(`${process.env.REACT_APP_API_ROUTE}/auth`, data).then(() => {
            // console.log(data);
          })
          await new Promise((r) => setTimeout(r, 500));
          alert(`Hello ${data.username}! Your account has been created.`);
          navigate("/login");
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>

            <ErrorMessage name="username" component="span" className={styles.error} />
            <Field className={styles.input} name="username" placeholder="username" />

            <ErrorMessage name="password" component="span" className={styles.error} />
            <Field className={styles.input} type="password" name="password" placeholder="password" />

            <button type="submit" disabled={isSubmitting}>Create account</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
