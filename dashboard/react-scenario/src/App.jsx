import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Overview from './pages/Overview'
import Products from './pages/Products'
import Orders from './pages/Orders'
import Settings from './pages/Settings'
import { useTheme } from './context/ThemeContext'
import styles from './css/Layout.module.css'

export default function App() {
  const { darkMode } = useTheme()

  return (
    <BrowserRouter>
      <div style={{
        minHeight: '100vh',
        backgroundColor: darkMode ? '#030712' : '#f9fafb',
        color: darkMode ? '#ffffff' : '#1f2937'
      }}>
        <Sidebar />
        <Navbar />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}