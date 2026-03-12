import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './Slideshow.module.css';

const BUCKET_URL = "https://k1958-project-media.s3.eu-north-1.amazonaws.com";

const Slideshow = ({ jsonPath, type = 'image' }) => {
  const [mediaLinks, setMediaLinks] = useState([]);

  useEffect(() => {
    async function fetchMedia() {
      const res = await fetch(`${BUCKET_URL}/data/${jsonPath}`);
      const data = await res.json();
      
      // Handle both "slides" and "videos" keys
      const items = data.slides || data.videos || [];
      const urls = items.map((path) => `${BUCKET_URL}/${path}`);
      
      setMediaLinks(urls);
    }
    fetchMedia();
  }, [jsonPath]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: true,
  };
  
  return (
    <div className={styles.slideshowcontainer}>
      <Slider {...sliderSettings}>
        {mediaLinks.map((src, index) => (
          <div key={index}>
            {type === 'image' ? (
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className={styles.slideimage}
              />
            ) : (
              <video
                src={src}
                className={styles.slidevideo}
                controls
                controlsList="nodownload"
              />
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slideshow;