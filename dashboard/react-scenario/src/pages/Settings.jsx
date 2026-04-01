import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import styles from '../css/global.module.css'

export default function Settings() {
  const { darkMode, toggleDarkMode } = useTheme()
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john@shopdash.com')
  const [currency, setCurrency] = useState('GBP')
  const [notifications, setNotifications] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const cardBg = { backgroundColor: darkMode ? '#1f2937' : '#ffffff' }
  const mutedText = { color: darkMode ? '#9ca3af' : '#6b7280' }
  const borderColor = darkMode ? '#374151' : '#e5e7eb'

  const inputStyle = {
    padding: '10px 14px',
    borderRadius: '8px',
    border: `1px solid ${borderColor}`,
    backgroundColor: darkMode ? '#111827' : '#f9fafb',
    color: darkMode ? '#ffffff' : '#1f2937',
    fontSize: '14px',
    width: '100%',
  }

  const labelStyle = {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '4px',
    display: 'block',
    ...mutedText
  }

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

  return (
    <div className={styles.page} style={{ maxWidth: '600px' }}>
      <h1 className={styles.pageTitle}>Settings</h1>

      {/* Profile */}
      <div className={styles.card} style={{ ...cardBg, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2 className={styles.cardTitle}>Profile</h2>
        <div>
          <label style={labelStyle}>Name</label>
          <input style={inputStyle} value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Email</label>
          <input style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} />
        </div>
      </div>

      {/* Preferences */}
      <div className={styles.card} style={{ ...cardBg, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2 className={styles.cardTitle}>Preferences</h2>

        {/* Dark Mode Toggle */}
        <div className={styles.flexBetween}>
          <div>
            <p style={{ fontWeight: '500' }}>Dark Mode</p>
            <p style={{ fontSize: '13px', ...mutedText }}>Toggle dark or light theme</p>
          </div>
          <button onClick={toggleDarkMode} style={toggleButton(darkMode)}>
            <span style={toggleKnob(darkMode)} />
          </button>
        </div>

        {/* Notifications Toggle */}
        <div className={styles.flexBetween}>
          <div>
            <p style={{ fontWeight: '500' }}>Notifications</p>
            <p style={{ fontSize: '13px', ...mutedText }}>Receive order updates</p>
          </div>
          <button onClick={() => setNotifications(!notifications)} style={toggleButton(notifications)}>
            <span style={toggleKnob(notifications)} />
          </button>
        </div>

        {/* Currency */}
        <div>
          <label style={labelStyle}>Currency</label>
          <select style={inputStyle} value={currency} onChange={e => setCurrency(e.target.value)}>
            <option value="GBP">GBP (£)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className={styles.button}
        style={{
          backgroundColor: saved ? '#16a34a' : '#2563eb',
          color: '#ffffff',
          fontSize: '16px',
          padding: '12px 24px',
          transition: 'background-color 0.2s',
        }}
      >
        {saved ? '✅ Saved!' : 'Save Settings'}
      </button>
    </div>
  )
}