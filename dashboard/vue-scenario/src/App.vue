<template>
  <div :style="{
    minHeight: '100vh',
    backgroundColor: darkMode ? '#030712' : '#f9fafb',
    color: darkMode ? '#ffffff' : '#1f2937'
  }">
    <Sidebar />
    <Navbar />
    <main :class="styles.main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useCssModule } from 'vue'
import { provideTheme } from './context/useTheme'
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'

const styles = useCssModule()
const { darkMode } = provideTheme()
</script>

<style module src="./css/Layout.module.css"></style>