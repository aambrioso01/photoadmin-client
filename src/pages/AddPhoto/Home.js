import React, { useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styles from "./styles.module.scss";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { AuthCtx } from "../../services/AuthCtx";

export const Home = () => {
  const [photos, setPhotos] = useState([]);
  const navigate = useNavigate();
  const [likedPhotos, setLikedPhotos] = useState([]);
  const { authState } = useContext(AuthCtx);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate(`/login`);
    } else {
      axios
        .get("https://photo-admin-api.herokuapp.com/photos", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setPhotos(response.data.allPhotos);
          setLikedPhotos(
            response.data.likedPhotos.map((like) => {
              return like.PhotoId;
            })
          );
        });
    }
  }, []);

  const likePhoto = (photoId) => {
    axios
      .post(
        "https://photo-admin-api.herokuapp.com/like",
        { PhotoId: photoId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setPhotos(
          photos.map((photo) => {
            if (photo.id === photoId) {
              if (response.data.liked) {
                return { ...photo, Likes: [...photo.Likes, 0] };
              } else {
                const temp = photo.Likes;
                temp.pop();
                return { ...photo, Likes: temp };
              }
            } else {
              return photo;
            }
          })
        );

        if (likedPhotos.includes(photoId)) {
          setLikedPhotos(
            likedPhotos.filter((id) => {
              return id !== photoId;
            })
          );
        } else {
          setLikedPhotos([...likedPhotos, photoId]);
        }
      });
  };

  return (
    <div className={styles.container}>
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
              <p><Link to={`profile/${value.UserId}`}>{value.username}</Link></p>
              <ThumbUpIcon
                onClick={() => {
                  likePhoto(value.id);
                }}
                className={!likedPhotos.includes(value.id) ? styles.unlike : ""}
              />
              <label>{value.Likes.length}</label>
            </div>
          </div>
        );
      })}
    </div>
  );
};
