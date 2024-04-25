import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>Welcome to FilmWatch</h3>
          <p>Welcome to FilmWatch! Explore and enjoy all kinds of movies. You're in the right place for unlimited entertainment!</p>
        </div>
        <div className={styles.footerSection}>
          <h3>Contact</h3>
          <p>Email: info@gmail.com</p>
          <p>Telephone: +90 123 456 7890</p>
        </div>
        <div className={styles.footerSection}>
          <h3>Follow Us</h3>
          <div className={styles.socialIcons}>
            <a href="#" target="_blank">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png" width={25} height={25} alt="Facebook" />
            </a>
            <a href="#" target="_blank">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/2491px-Logo_of_Twitter.svg.png" width={25} height={25} alt="Twitter" />
            </a>
            <a href="#" target="_blank">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png" width={25} height={25} alt="Instagram" />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; 2024 Furkan Köse. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  );
};

export default Footer;
