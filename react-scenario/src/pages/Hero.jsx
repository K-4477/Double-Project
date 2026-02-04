import React from 'react';
import styles from './hero.module.css';
import { Link } from 'react-router-dom';
import camerahold from '/src/camerahold.jpg';
import Videosun from '/src/Videosun.jpg'

const Hero = () => {
  return (
    <div className={styles.hero}>
      <header className={styles.title}>
        <h1 className={styles.headertitle}>Akash Shanghavi</h1>
      </header>

      <section>
        <p className={styles.roles}>Freelance Photographer & Videographer</p>

        <div className={styles.imgWrapper}>
          <img
            src="https://images.unsplash.com/photo-1606115915090-be18fea23ec7?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8anBlZ3xlbnwwfHwwfHx8MA%3D%3D"
            alt="camera"
            className={styles.heroImg}
          />
        </div>

        <div className={styles.redirects}>
          <div className={styles.Predirect}>
            <Link to="/photography" className={styles.Pbutton}>
              <img className={styles.imageP} src={camerahold} alt="Holdingcamera" />
              <div className={styles.overlayText}>Photography</div>
            </Link>
                
          </div>
          <div className={styles.Vredirect}>
            <Link to="/videography" className={styles.Vbutton}>
              <img className={styles.imageV} src={Videosun} alt="SunVideo" />
              <div className={styles.overlayText}>Videography</div>
            </Link>
                
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
