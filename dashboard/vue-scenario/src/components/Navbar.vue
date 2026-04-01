<template>
  <header :class="styles.navbar" :style="{
    backgroundColor: darkMode ? '#1f2937' : '#ffffff',
    color: darkMode ? '#ffffff' : '#1f2937',
  }">
    <h2 style="font-size: 18px; font-weight: 600;">Dashboard</h2>
    <button
      @click="toggleDarkMode"
      :class="styles.button"
      :style="{
        backgroundColor: darkMode ? '#4b5563' : '#f3f4f6',
        color: darkMode ? '#ffffff' : '#1f2937',
      }"
    >
      {{ darkMode ? '☀️ Light Mode' : '🌙 Dark Mode' }}
    </button>
  </header>
</template>

<script setup>
import { useCssModule } from 'vue'
import { useTheme } from '../context/useTheme'

const styles = useCssModule()
const { darkMode, toggleDarkMode } = useTheme()
</script>

<style module src="../css/Layout.module.css"></style>