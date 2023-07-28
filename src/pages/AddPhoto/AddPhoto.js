import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import styles from "./styles.module.scss";
import { AuthCtx } from "../../services/AuthCtx";
import styles from "../../styles/form.module.scss";

export const AddPhoto = () => {
  const [file, setFile] = useState({});
  const navigate = useNavigate();
  const { authState } = useContext(AuthCtx);

  const initialValues = {
    title: "",
    description: "",
    // file: {},
  }

  useEffect(() => {
    if(!localStorage.getItem('accessToken')) { //!authState.status
      navigate("/login");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    // file: Yup.mixed(),
  })

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append('file', file, file.name);
    formData.append('title', data.title);
    formData.append('description', data.description);

    axios.post(`${process.env.REACT_APP_API_ROUTE}/photos`, formData, { headers: {accessToken: localStorage.getItem("accessToken")} }).then((response) => {
    });
    
    await new Promise((r) => setTimeout(r, 500));

    navigate("/"); 
  }

  return (
    <div className={styles.container}>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form className={styles.form}>
            <ErrorMessage name="title" component="span" className={styles.error} />
            <Field className={styles.input} id="inputTitle" name="title" placeholder="Title" />

            <ErrorMessage name="description" component="span" className={styles.error} />
            <Field className={styles.input} id="inputDescr" name="description" placeholder="Description" />

            {/* <ErrorMessage name="file" component="span" className={styles.error} /> */}
            {/* <Field id="inputAddPhoto" name="file" type="file" onChange={(event) => {
                    this.setState("file", event.currentTarget.files[0]);
            }}/> */}

            <input className={styles.file} id="file" name="file" type="file" onChange={(event) => {
              setFile(event.currentTarget.files[0]);
            }} />

            {/* <Field id="file" name="file" type="file" /> */}

            <button type="submit">Add Photo</button>
          </Form>
        </Formik>
    </div>
  )
}
