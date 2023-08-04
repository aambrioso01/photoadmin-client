import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./styles.module.scss";
import { Kaleidoscope } from "./Kaleidoscope";

export const Landing = () => {
  const navigate = useNavigate();

  const handleHomeButton = () => {
    // Use the 'push' method of 'history' to navigate to the desired page
    navigate('/home');
  };

  const handleLoginButton = () => {
    // Use the 'push' method of 'history' to navigate to the desired page
    navigate('/login');
  };

  return (
    <>
      <div className={styles.banner}>
        <img src="/photoscope-big.png" width={500} alt="photoscope" />
      </div>
      <div className={styles.buttons}>
        <button onClick={handleHomeButton} className={styles.pushFlat}>view public gallery</button> <button onClick={handleLoginButton} className={styles.pushSkeuo}>login to upload</button>
      </div>
      <Kaleidoscope />
    </>
  );
}