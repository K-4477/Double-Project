<template>
  <aside :class="styles.sidebar" :style="{
    backgroundColor: darkMode ? '#111827' : '#ffffff',
    color: darkMode ? '#ffffff' : '#1f2937',
  }">
    <h1 :class="styles.sidebarTitle">🛍️ ShopDash</h1>
    <nav :class="styles.nav">
      <router-link
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        custom
        v-slot="{ isActive, navigate }"
      >
        <div
          @click="navigate"
          :class="styles.navLink"
          :style="{
            backgroundColor: isActive ? '#2563eb' : 'transparent',
            color: isActive ? '#ffffff' : darkMode ? '#ffffff' : '#1f2937',
            cursor: 'pointer',
          }"
        >
          <span>{{ link.icon }}</span>
          <span>{{ link.label }}</span>
        </div>
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
import { useCssModule } from 'vue'
import { useTheme } from '../context/useTheme'

const styles = useCssModule()
const { darkMode } = useTheme()

const links = [
  { to: '/', label: 'Overview', icon: '📊' },
  { to: '/products', label: 'Products', icon: '📦' },
  { to: '/orders', label: 'Orders', icon: '🛒' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
]
</script>

<style module src="../css/Layout.module.css"></style>