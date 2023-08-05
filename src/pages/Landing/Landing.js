import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./styles.module.scss";
import { Kaleidoscope } from "./Kaleidoscope";
import { AiOutlineLogin } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";

export const Landing = () => {
  const navigate = useNavigate();

  const handleGalleryButton = () => {
    navigate('/Gallery');
  };

  const handleLoginButton = () => {
    navigate('/login');
  };

  return (
    <>
      <div className={styles.banner}>
        <img src="/photoscope-big.png" width={500} alt="photoscope" />
        <img className={styles.logo} src="/logo.png" width={75} alt="photoscope" />
        <div className={styles.buttons}>
          <button onClick={handleGalleryButton}><TfiGallery />public gallery</button> <button onClick={handleLoginButton}><AiOutlineLogin /> login to upload</button>
        </div>
      </div>
      <Kaleidoscope />
    </>
  );
}