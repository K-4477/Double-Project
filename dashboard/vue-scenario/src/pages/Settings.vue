<template>
  <div :class="styles.page" style="max-width: 600px;">
    <h1 :class="styles.pageTitle">Settings</h1>

    <!-- Profile -->
    <div :class="styles.card" :style="{ ...cardBg, display: 'flex', flexDirection: 'column', gap: '16px' }">
      <h2 :class="styles.cardTitle">Profile</h2>
      <div>
        <label :style="labelStyle">Name</label>
        <input :style="inputStyle" v-model="name" />
      </div>
      <div>
        <label :style="labelStyle">Email</label>
        <input :style="inputStyle" v-model="email" />
      </div>
    </div>

    <!-- Preferences -->
    <div :class="styles.card" :style="{ ...cardBg, display: 'flex', flexDirection: 'column', gap: '16px' }">
      <h2 :class="styles.cardTitle">Preferences</h2>

      <!-- Dark Mode -->
      <div :class="styles.flexBetween">
        <div>
          <p style="font-weight: 500;">Dark Mode</p>
          <p :style="{ fontSize: '13px', ...mutedText }">Toggle dark or light theme</p>
        </div>
        <button @click="toggleDarkMode" :style="toggleButton(darkMode)">
          <span :style="toggleKnob(darkMode)" />
        </button>
      </div>

      <!-- Notifications -->
      <div :class="styles.flexBetween">
        <div>
          <p style="font-weight: 500;">Notifications</p>
          <p :style="{ fontSize: '13px', ...mutedText }">Receive order updates</p>
        </div>
        <button @click="notifications = !notifications" :style="toggleButton(notifications)">
          <span :style="toggleKnob(notifications)" />
        </button>
      </div>

      <!-- Currency -->
      <div>
        <label :style="labelStyle">Currency</label>
        <select :style="inputStyle" v-model="currency">
          <option value="GBP">GBP (£)</option>
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
        </select>
      </div>
    </div>

    <!-- Save Button -->
    <button
      @click="handleSave"
      :class="styles.button"
      :style="{
        backgroundColor: saved ? '#16a34a' : '#2563eb',
        color: '#ffffff',
        fontSize: '16px',
        padding: '12px 24px',
        transition: 'background-color 0.2s',
      }"
    >
      {{ saved ? '✅ Saved!' : 'Save Settings' }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed, useCssModule } from 'vue'
import { useTheme } from '../context/useTheme'

const styles = useCssModule()
const { darkMode, toggleDarkMode } = useTheme()

const name = ref('John Doe')
const email = ref('john@shopdash.com')
const currency = ref('GBP')
const notifications = ref(true)
const saved = ref(false)

const handleSave = () => {
  saved.value = true
  setTimeout(() => { saved.value = false }, 2000)
}

const cardBg = computed(() => ({ backgroundColor: darkMode.value ? '#1f2937' : '#ffffff' }))
const mutedText = computed(() => ({ color: darkMode.value ? '#9ca3af' : '#6b7280' }))
const borderColor = computed(() => darkMode.value ? '#374151' : '#e5e7eb')

const inputStyle = computed(() => ({
  padding: '10px 14px',
  borderRadius: '8px',
  border: `1px solid ${borderColor.value}`,
  backgroundColor: darkMode.value ? '#111827' : '#f9fafb',
  color: darkMode.value ? '#ffffff' : '#1f2937',
  fontSize: '14px',
  width: '100%',
}))

const labelStyle = computed(() => ({
  fontSize: '14px',
  fontWeight: '600',
  marginBottom: '4px',
  display: 'block',
  color: darkMode.value ? '#9ca3af' : '#6b7280',
}))

const toggleButton = (active) => ({
  width: '52px',
  height: '28px',
  borderRadius: '999px',
  border: 'none',
  cursor: 'pointer',
  backgroundColor: active ? '#2563eb' : '#e5e7eb',
  position: 'relative',
  transition: 'background-color 0.2s',
})

const toggleKnob = (active) => ({
  position: 'absolute',
  top: '4px',
  left: active ? '28px' : '4px',
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  backgroundColor: '#ffffff',
  transition: 'left 0.2s',
})
</script>

<style module src="../css/global.module.css"></style>