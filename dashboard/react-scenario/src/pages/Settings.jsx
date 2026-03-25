import { useTheme } from '../context/ThemeContext'
import { useState } from 'react'

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

  const cardStyle = {
    backgroundColor: darkMode ? '#1f2937' : '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  }

  const inputStyle = {
    padding: '10px 14px',
    borderRadius: '8px',
    border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
    backgroundColor: darkMode ? '#111827' : '#f9fafb',
    color: darkMode ? '#ffffff' : '#1f2937',
    fontSize: '14px',
    width: '100%',
  }

  const labelStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: darkMode ? '#9ca3af' : '#6b7280',
    marginBottom: '4px',
    display: 'block',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Settings</h1>

      {/* Profile Settings */}
      <div style={cardStyle}>
        <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Profile</h2>
        <div>
          <label style={labelStyle}>Name</label>
          <input
            style={inputStyle}
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle}>Email</label>
          <input
            style={inputStyle}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
      </div>

      {/* Preferences */}
      <div style={cardStyle}>
        <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Preferences</h2>

        {/* Dark Mode */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontWeight: '500' }}>Dark Mode</p>
            <p style={{ fontSize: '13px', color: darkMode ? '#9ca3af' : '#6b7280' }}>Toggle dark or light theme</p>
          </div>
          <button
            onClick={toggleDarkMode}
            style={{
              width: '52px',
              height: '28px',
              borderRadius: '999px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: darkMode ? '#2563eb' : '#e5e7eb',
              position: 'relative',
              transition: 'background-color 0.2s',
            }}
          >
            <span style={{
              position: 'absolute',
              top: '4px',
              left: darkMode ? '28px' : '4px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              transition: 'left 0.2s',
            }} />
          </button>
        </div>

        {/* Notifications */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontWeight: '500' }}>Notifications</p>
            <p style={{ fontSize: '13px', color: darkMode ? '#9ca3af' : '#6b7280' }}>Receive order updates</p>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            style={{
              width: '52px',
              height: '28px',
              borderRadius: '999px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: notifications ? '#2563eb' : '#e5e7eb',
              position: 'relative',
              transition: 'background-color 0.2s',
            }}
          >
            <span style={{
              position: 'absolute',
              top: '4px',
              left: notifications ? '28px' : '4px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              transition: 'left 0.2s',
            }} />
          </button>
        </div>

        {/* Currency */}
        <div>
          <label style={labelStyle}>Currency</label>
          <select
            style={inputStyle}
            value={currency}
            onChange={e => setCurrency(e.target.value)}
          >
            <option value="GBP">GBP (£)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        style={{
          padding: '12px 24px',
          backgroundColor: saved ? '#16a34a' : '#2563eb',
          color: '#ffffff',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '16px',
          transition: 'background-color 0.2s',
        }}
      >
        {saved ? '✅ Saved!' : 'Save Settings'}
      </button>
    </div>
  )
}