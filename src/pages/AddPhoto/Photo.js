import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { AuthCtx } from "../../services/AuthCtx";

export const Photo = () => {
  let { id } = useParams();
  const [photo, setPhoto] = useState({});
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const { authState } = useContext(AuthCtx);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ROUTE}/photos/${id}`).then((response) => {
      setPhoto(response.data);
    });

    axios.get(`${process.env.REACT_APP_API_ROUTE}/notes/${id}`).then((response) => {
      setNotes(response.data);
    });
  }, []);

  const addNote = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_ROUTE}/notes`,
        { content: newNote, PhotoId: id },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) alert(response.data.error);
        else {
          const noteToAdd = {
            content: newNote,
            username: response.data.username,
          };
          setNotes([...notes, noteToAdd]);
          setNewNote("");
        }
      });
  };

  const deleteNote = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_ROUTE}/notes/delete/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      // reload list now that note removed
      .then(() => {
        setNotes(
          notes.filter((value) => {
            return value.id !== id;
          })
        );
      });
  };

  const deletePhoto = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_ROUTE}/photos/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        navigate("/");
      });
  };

  const editPhoto = (option) => {
    if (option === "title") {
      let newTitle = prompt("Enter new title:");
      axios.put(
        `${process.env.REACT_APP_API_ROUTE}/photos/title`,
        { newTitle: newTitle, id: id },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      
      setPhoto({...photo, title: newTitle });
    } else {
      let newDescription = prompt("Enter new description:");
      axios.put(
        `${process.env.REACT_APP_API_ROUTE}/photos/description`,
        { newDescription: newDescription, id: id },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
        );
        setPhoto({...photo, description : newDescription });
      }
    };
    
  return (
    <div className={styles.container}>
      <div style={{ color: "red" }}>
        {photo.id}

        <h1
          onClick={() => {
            if (authState.username === photo.username) {
              editPhoto("title");
            }
          }}
        >
          {photo.title}
        </h1>
        <p
          onClick={() => {
            if (authState.username === photo.username) {
              editPhoto("description");
            }
          }}
        >
          {photo.description}
        </p>
        <p>{photo.username}</p>
        {authState.username === photo.username && (
          <button onClick={() => deletePhoto(photo.id)}>Delete</button>
        )}
      </div>

      <div className={styles.notes}>
        <div className={styles.input}>
          <input
            type="text"
            placeholder="Leave a note..."
            onChange={(event) => {
              setNewNote(event.target.value);
            }}
            value={newNote}
          />
          <button onClick={addNote}>Add note</button>
        </div>

        <div className={styles.list}>
          {notes.map((note, key) => {
            return (
              <>
                <div key={key}>
                  {note.content} - {note.username}
                  {authState.username === note.username && (
                    <button onClick={() => deleteNote(note.id)}>X</button>
                  )}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};
