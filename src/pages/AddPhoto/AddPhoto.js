import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import styles from "./formStyles.module.scss";
import { AuthCtx } from "../../services/AuthCtx";
import formStyles from "../../styles/form.module.scss";
import styles from "./styles.module.scss";

export const AddPhoto = () => {
  const [file, setFile] = useState({});
  const navigate = useNavigate();
  const { authState } = useContext(AuthCtx);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    title: "",
    description: "",
    // file: {},
  }

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) { //!authState.status
      navigate("/login");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    // file: Yup.mixed(),
  })

  const onSubmit = async (data) => {
    setIsLoading(true);
    const formData = new FormData();

    formData.append('file', file, file.name);
    formData.append('title', data.title);
    formData.append('description', data.description);

    axios.post(`${process.env.REACT_APP_API_ROUTE}/photos`, formData, { headers: { accessToken: localStorage.getItem("accessToken") }})
      .then(response => {
        // PUT request was successful
        setIsLoading(false);

        // Redirect to home page once PUT request is complete
        navigate('/home');
      }).catch(error => {
        // Handle error
        console.error('Error updating data:', error);
        setIsLoading(false);
      });
  }

  return (
    <div className={formStyles.container}>

      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className={formStyles.form}>
          <Field className={formStyles.input} id="inputTitle" name="title" placeholder="Title" />
          <ErrorMessage name="title" component="span" className={formStyles.error} />

          <Field className={formStyles.input} id="inputDescr" name="description" placeholder="Description" />
          <ErrorMessage name="description" component="span" className={formStyles.error} />

          {/* <ErrorMessage name="file" component="span" className={formStyles.error} /> */}
          {/* <Field id="inputAddPhoto" name="file" type="file" onChange={(event) => {
                    this.setState("file", event.currentTarget.files[0]);
            }}/> */}

          <input className={formStyles.file} id="file" name="file" type="file" onChange={(event) => {
            setFile(event.currentTarget.files[0]);
          }} />

          {/* <Field id="file" name="file" type="file" /> */}

          <button type="submit">Add Photo</button>

          {isLoading ? (
            <>
              <img src="logo.png" className={styles.spinner} alt="." />
            </>
          ) : (
            <></>
          )}
        </Form>
      </Formik>
    </div>
  )
}
