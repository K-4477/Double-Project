import styles from '../css/Photography.module.css';
import Slideshow from '../components/slideshow.jsx';
import MediaGallery from './MediaGallery';


const Photography = () => {
  return (
    <div className={styles.pg}>
      <h1 className= {styles.Photography}>Photography</h1>
      <section>
         <p className= {styles.intro}>
            Welcome to my photography portfolio, where every image tells a unique story through the lens. Here, you'll find a curated collection of my work capturing moments of beauty, emotion, and creativity across various styles—from breathtaking landscapes and intimate portraits to vibrant urban scenes and abstract compositions. Each photograph reflects my passion for visual storytelling and my dedication to exploring the world from different perspectives. I invite you to explore my gallery and experience the artistry behind every shot.
        </p>
      </section>

      <div className = {styles.Slideshow}>
        <Slideshow jsonPath="slideshow.json" type="image" />
      </div>
        
      <div className={styles.photogallery}>
      
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk_cKVVXC2ZqijjbOfpJ2bFPeNKLruASZWWw&s' alt="Portrait 1" />
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB5P-W_8R75eFugWOtUmG4B6eBNfovVqxRBHmUhwwi9sxx318XNnNZdUJu4nztTxvB4Ww&usqp=CAU' alt="Portrait 2" />
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtUpzV_rGPYr-1F8pG_RoEXtKxEzsZu6O6tuBUWfY2SMtTIQNaOBk3vRG5YbHF21XQ1dA&usqp=CAU' alt="Portrait 3" />
      </div>
    </div>
  );
};

export default Photography;