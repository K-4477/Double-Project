import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import styles from '../css/Layout.module.css'

const links = [
  { to: '/', label: 'Overview', icon: '📊' },
  { to: '/products', label: 'Products', icon: '📦' },
  { to: '/orders', label: 'Orders', icon: '🛒' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
]

export default function Sidebar() {
  const { darkMode } = useTheme()

  return (
    <aside className={styles.sidebar} style={{
      backgroundColor: darkMode ? '#111827' : '#ffffff',
      color: darkMode ? '#ffffff' : '#1f2937',
    }}>
      <h1 className={styles.sidebarTitle}>🛍️ ShopDash</h1>
      <nav className={styles.nav}>
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            className={styles.navLink}
            style={({ isActive }) => ({
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