import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className={styles.hamburger} onClick={toggleSidebar}>
        &#9776;
      </button>
      <nav className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <button className={styles.closeBtn} onClick={toggleSidebar}>
          &times;
        </button>
        <Link to="/" onClick={toggleSidebar} className={styles.link}>
          Home
        </Link>
        <Link to="/photography" onClick={toggleSidebar} className={styles.link}>
          Photography
        </Link>
        <Link to="/videography" onClick={toggleSidebar} className={styles.link}>
          Videography
        </Link>
        <Link to="/enquiries" onClick={toggleSidebar} className={styles.link}>
          Enquiries
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
