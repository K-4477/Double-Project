<script setup>
import { ref } from 'vue'
import styles from '../css/Navbar.module.css'
const isOpen = ref(false)

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}
</script> 

<template>
  <div>
    <button :class="styles.hamburger" @click="toggleSidebar">
      &#9776;
    </button>
    
    <nav :class="[styles.sidebar, { [styles.open]: isOpen }]">
      <button :class="styles.closeBtn" @click="toggleSidebar">
        &times;
      </button>
      
      <router-link to="/" @click="toggleSidebar" :class="styles.link">
        Home
      </router-link>
      
      <router-link to="/photography" @click="toggleSidebar" :class="styles.link">
        Photography
      </router-link>

      <router-link to="/videography" @click="toggleSidebar" :class="styles.link">
        Videography
      </router-link>

      <router-link to="/enquiries" @click="toggleSidebar" :class="styles.link">
        Enquiries
      </router-link>
      
    </nav>
  </div>
</template>