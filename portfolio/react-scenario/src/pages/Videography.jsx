import styles from '../css/Videography.module.css';
import Slideshow from '../components/slideshow';

const Videography = () => {
    return(
    <div className= {styles.vg}>
                <h1 className={styles.Videography}>Videography</h1>
            <section>
                <p className={styles.intro}>
                Welcome to my videography portfolio, where every image tells a unique story through the lens. Here, you'll find a curated collection of my work capturing moments of beauty, emotion, and creativity across various styles—from breathtaking landscapes and intimate portraits to vibrant urban scenes and abstract compositions. Each photograph reflects my passion for visual storytelling and my dedication to exploring the world from different perspectives. I invite you to explore my gallery and experience the artistry behind every shot.
                </p>
            </section>
        <div className={styles.playerbox}>
            <Slideshow jsonPath="videos.json" type="video" />
        </div>
        
    </div>
    )
};

export default Videography;