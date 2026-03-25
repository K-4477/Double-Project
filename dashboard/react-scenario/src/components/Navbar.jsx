import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: '240px',
      right: 0,
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
      color: darkMode ? '#ffffff' : '#1f2937',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      zIndex: 10
    }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Dashboard</h2>
      <button
        onClick={toggleDarkMode}
        style={{
          padding: '8px 16px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: darkMode ? '#4b5563' : '#f3f4f6',
          color: darkMode ? '#ffffff' : '#1f2937',
        }}
      >
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </header>
  )
}