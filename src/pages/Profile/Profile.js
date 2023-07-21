import React, { useEffect, useState, useContext } from "react";
import styles from "./styles.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthCtx } from "../../services/AuthCtx";

export const Profile = () => {
  let { id } = useParams();
  const [username, setUsername] = useState('');
  const [photos, setPhotos] = useState([]);
  const { authState } = useContext(AuthCtx);

  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ROUTE}/auth/info/${id}`).then((response) => {
      setUsername(response.data.username);
    })

    axios.get(`${process.env.REACT_APP_API_ROUTE}/photos/user/${id}`).then((response) => {
      setPhotos(response.data);
    })
  }, []); 

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h2>{username}'s Photos</h2>
        {authState.username === username && (<button onClick={() => { navigate("/change") }}>Change My Password</button>)}
      </div>
      <div className={styles.photos}>
      {photos.map((value, key) => {
        return (
          <div key={key} className={styles.photo}>
            <div className={styles.title}>{value.title}</div>
            <div
              className={styles.description}
              onClick={() => {
                navigate(`/photo/${value.id}`);
              }}
            >
              {value.description}
            </div>
            <div className={styles.footer}>
              <p>{value.username}</p>
              <label>likes: {value.Likes.length}</label>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
};
