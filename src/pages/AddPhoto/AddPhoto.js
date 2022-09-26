import React, { useContext, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { AuthCtx } from "../../services/AuthCtx";

export const AddPhoto = () => {
  
  const navigate = useNavigate();
  const { authState } = useContext(AuthCtx);

  const initialValues = {
    title: "",
    description: "",
    file: null,
  }

  useEffect(() => {
    if(!localStorage.getItem('accessToken')) { //!authState.status
      navigate("/login");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  })

  const onSubmit = (data) => {
    axios.post("https://photo-admin-api.herokuapp.com/photos", data, { headers: {accessToken: localStorage.getItem("accessToken")} }).then((response) => {
      navigate("/");
    });
  }

  return (
    <div className={styles.container}>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form className={styles.form}>
            <ErrorMessage name="title" component="span" className={styles.error} />
            <Field className={styles.input} id="inputAddPhoto" name="title" placeholder="Title" />

            <ErrorMessage name="description" component="span" className={styles.error} />
            <Field className={styles.input} id="inputAddPhoto" name="description" placeholder="Description" />

            <Field id="file" name="file" type="file" />

            <button type="submit">Add Photo</button>
          </Form>
        </Formik>
    </div>
  )
}
