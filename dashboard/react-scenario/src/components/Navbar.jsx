import { useTheme } from '../context/ThemeContext'
import styles from '../css/Layout.module.css'

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <header className={styles.navbar} style={{
      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
      color: darkMode ? '#ffffff' : '#1f2937',
    }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Dashboard</h2>
      <button
        onClick={toggleDarkMode}
        className={styles.button}
        style={{
          backgroundColor: darkMode ? '#4b5563' : '#f3f4f6',
          color: darkMode ? '#ffffff' : '#1f2937',
        }}
      >
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </header>
  )
}