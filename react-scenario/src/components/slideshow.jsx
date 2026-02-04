import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from './Slideshow.module.css';

const Slideshow = () => {
  const [imageLinks, setImageLinks] = useState([]);

  useEffect(() => {
  async function fetchImages() {
    const res = await fetch('http://localhost:3001/api/slideshow-images');
    const urls = await res.json();
    setImageLinks(urls);
  }
  fetchImages();
}, []);


  const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,   // show 1 slide at a time
  slidesToScroll: 1,
  adaptiveHeight: true,
  arrows: true,
};
  return (
    <div className={styles.slideshowcontainer}>
      <Slider {...sliderSettings}>
        {imageLinks.map((src, index) => (
          <div key={index}>
            <img src={src} alt={`Slide ${index}`} className={styles.slideimage} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slideshow;