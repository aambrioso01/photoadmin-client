import React, { useState } from "react";
import axios from "axios";

export const ChangePassword = () => {
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const changePassword = () => {
    axios.put(
      "https://photo-admin-api.herokuapp.com/auth/change",
      { currPassword: currPassword, newPassword: newPassword },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    ).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      }
    });
  };

  return (
    <>
      <h1>Change password</h1>
      <input
        type="text"
        placeholder="current password..."
        onChange={(event) => {
          setCurrPassword(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="new password..."
        onChange={(event) => {
          setNewPassword(event.target.value);
        }}
      />
      <button
        onClick={() => {
          changePassword();
        }}
      >
        save changes
      </button>
    </>
  );
};
