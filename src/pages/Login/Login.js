import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthCtx } from "../../services/AuthCtx";
import styles from "../../styles/form.module.scss";


export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {setAuthState} = useContext(AuthCtx);

  const navigate = useNavigate();

  
  const login = () => {
    const data = {username: username, password: password}
    
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
        if (response.data.error) alert(response.data.error);
        else {
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
          navigate("/");
        }
    })
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      <button onClick={login}>Login</button>
      </div>
    </div>
  );
};
