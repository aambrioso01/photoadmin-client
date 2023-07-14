import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { AuthCtx } from "../../services/AuthCtx";

export const AddPhoto2 = () => {
  const [file, setFile] = useState({});
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
    file: Yup.mixed().required("No file selected"),
  });

  const onSubmit = () => {
    console.log(`fileObject: ${file.name}, ${file.size}, ${file.type}`);

    const data = new FormData();

    data.append('file', file, file.name);
    
    axios.post("https://photo-admin-api.herokuapp.com/photos", data, { headers: {accessToken: localStorage.getItem("accessToken")} }).then((response) => {
      // navigate("/"); 
    });
  }


  return (
    <div className={styles.container}>
        {/* <Formik initialValues={{file: null}} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form className={styles.form}>
            <ErrorMessage name="file" component="span" className={styles.error} />
            <Field id="file" name="file" type="file" onChange={(event) => {
                    setFile(event.currentTarget.files[0]);
                  }} />
            <button type="submit" >Add Photo</button>
          </Form>
        </Formik> */}

          <input id="file" name="file" type="file" onChange={(event) => {
                      setFile(event.currentTarget.files[0]);
                    }} />
          <button onClick={onSubmit}>Add Photo</button>

    </div>
  )
}

