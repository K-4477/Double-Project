<!-- src/App.vue -->
<!-- Main Vue Portfolio Application -->
 <script setup>
  import camerahold from '/src/camerahold.jpg'
  import Videosun from '/src/Videosun.jpg'
  import MediaGallery from './MediaGallery.vue'
  import styles from '../css/hero.module.css'
</script>

<template>
  <div :class="styles.hero">
      <header :class="styles.title">
        <h1 :class="styles.headertitle">Media Portfolio</h1>
      </header>

      <section>
        <p :class="styles.roles">Freelance Photographer & Videographer</p>

        <div :class="styles.redirects">
          <div :class="styles.Predirect">
            <router-link to="/photography" :class="styles.Pbutton">
              <img :class="styles.imageP" :src="camerahold" alt="Holdingcamera" />
              <div :class="styles.overlayText">Photography</div>
            </router-link>
                
          </div>
          <div :class="styles.Vredirect">
            <router-link to="/videography" :class="styles.Vbutton">
              <img :class="styles.imageV" :src="Videosun" alt="SunVideo" />
              <div :class="styles.overlayText">Videography</div>
            </router-link>
                
          </div>
        </div>
      </section>
    </div>
</template>