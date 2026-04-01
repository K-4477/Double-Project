import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { orders as mockOrders } from '../data/mockData'
import styles from '../css/global.module.css'

const statusStyles = {
  Delivered: { backgroundColor: '#f0fdf4', color: '#16a34a' },
  Pending: { backgroundColor: '#fefce8', color: '#ca8a04' },
  Shipped: { backgroundColor: '#eff6ff', color: '#2563eb' },
  Cancelled: { backgroundColor: '#fef2f2', color: '#dc2626' },
}

const statuses = ['All', 'Delivered', 'Pending', 'Shipped', 'Cancelled']

export default function Orders() {
  const { darkMode } = useTheme()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('All')

  useEffect(() => {
    setTimeout(() => {
      setOrders(mockOrders)
      setLoading(false)
    }, 1000)
  }, [])

  const filtered = orders.filter(o =>
    statusFilter === 'All' ? true : o.status === statusFilter
  )

  const cardBg = { backgroundColor: darkMode ? '#1f2937' : '#ffffff' }
  const mutedText = { color: darkMode ? '#9ca3af' : '#6b7280' }
  const borderColor = darkMode ? '#374151' : '#e5e7eb'

  const inputStyle = {
    padding: '8px 12px',
    borderRadius: '8px',
    border: `1px solid ${borderColor}`,
    backgroundColor: darkMode ? '#111827' : '#f9fafb',
    color: darkMode ? '#ffffff' : '#1f2937',
    fontSize: '14px',
    cursor: 'pointer',
  }

  return (
    <div className={styles.page}>
      <div className={styles.flexBetween}>
        <h1 className={styles.pageTitle}>Orders</h1>
        <select style={inputStyle} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px', fontSize: '18px', ...mutedText }}>
          ⏳ Fetching orders...
        </div>
      ) : (
        <div className={styles.card} style={cardBg}>
          <table className={styles.table}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${borderColor}` }}>
                {['Order ID', 'Customer', 'Product', 'Status', 'Total'].map(h => (
                  <th key={h} className={styles.th} style={mutedText}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(order => (
                <tr key={order.id} style={{ borderBottom: `1px solid ${borderColor}` }}>
                  <td className={styles.td} style={{ fontWeight: '500' }}>#{order.id}</td>
                  <td className={styles.td}>{order.customer}</td>
                  <td className={styles.td} style={mutedText}>{order.product}</td>
                  <td className={styles.td}>
                    <span className={styles.badge} style={statusStyles[order.status]}>
                      {order.status}
                    </span>
                  </td>
                  <td className={styles.td} style={{ fontWeight: '600' }}>£{order.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p style={{ textAlign: 'center', padding: '24px', ...mutedText }}>No orders found.</p>
          )}
        </div>
      )}
    </div>
  )
}