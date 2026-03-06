<script setup>
import styles from '../css/Videography.module.css'
import Slideshow from '../components/Slideshow.vue'


</script>

<template>
    <div :class= "styles.vg">
                <h1 :class= "styles.Videography">Videography</h1>
            <section :class="txtsection">
                <p :class= "styles.intro">
                Welcome to my videography portfolio, where every video tells a unique story through the lens. Here, you'll find a curated collection of my work capturing moments of beauty, emotion, and creativity across various styles—from breathtaking landscapes and intimate portraits to vibrant urban scenes and abstract compositions. Each frame captured reflects my passion for visual storytelling and my dedication to exploring the world from different perspectives. I invite you to explore my gallery and experience the artistry behind every shot.
                </p>
            </section>
        <div :class="styles.playerbox">
            <Slideshow jsonPath="videos.json" type="video" />
        </div>
    </div>
</template>