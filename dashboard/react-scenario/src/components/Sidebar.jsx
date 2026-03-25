import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const links = [
  { to: '/', label: 'Overview', icon: '📊' },
  { to: '/products', label: 'Products', icon: '📦' },
  { to: '/orders', label: 'Orders', icon: '🛒' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
]

export default function Sidebar() {
  const { darkMode } = useTheme()

  return (
    <aside style={{
      height: '100vh',
      width: '240px',
      position: 'fixed',
      top: 0,
      left: 0,
      padding: '24px',
      backgroundColor: darkMode ? '#111827' : '#ffffff',
      color: darkMode ? '#ffffff' : '#1f2937',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>🛍️ ShopDash</h1>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              backgroundColor: isActive ? '#2563eb' : 'transparent',
              color: isActive ? '#ffffff' : darkMode ? '#ffffff' : '#1f2937',
            })}
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}