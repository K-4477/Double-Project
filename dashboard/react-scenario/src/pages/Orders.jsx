import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { orders as mockOrders } from '../data/mockData'

export default function Orders() {
  const { darkMode } = useTheme()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('All')

  useEffect(() => {
    // Simulating an API fetch with a delay
    setTimeout(() => {
      setOrders(mockOrders)
      setLoading(false)
    }, 1000)
  }, [])

  const statuses = ['All', 'Delivered', 'Pending', 'Shipped', 'Cancelled']

  const filtered = orders.filter(o =>
    statusFilter === 'All' ? true : o.status === statusFilter
  )

  const statusStyles = {
    Delivered: { backgroundColor: '#f0fdf4', color: '#16a34a' },
    Pending: { backgroundColor: '#fefce8', color: '#ca8a04' },
    Shipped: { backgroundColor: '#eff6ff', color: '#2563eb' },
    Cancelled: { backgroundColor: '#fef2f2', color: '#dc2626' },
  }

  const cardStyle = {
    backgroundColor: darkMode ? '#1f2937' : '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  }

  const inputStyle = {
    padding: '8px 12px',
    borderRadius: '8px',
    border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
    backgroundColor: darkMode ? '#111827' : '#f9fafb',
    color: darkMode ? '#ffffff' : '#1f2937',
    fontSize: '14px',
    cursor: 'pointer',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Orders</h1>
        <select
          style={inputStyle}
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          {statuses.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px', fontSize: '18px', color: darkMode ? '#9ca3af' : '#6b7280' }}>
          ⏳ Fetching orders...
        </div>
      ) : (
        <div style={cardStyle}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}` }}>
                {['Order ID', 'Customer', 'Product', 'Status', 'Total'].map(h => (
                  <th key={h} style={{ padding: '12px', textAlign: 'left', fontSize: '14px', color: darkMode ? '#9ca3af' : '#6b7280' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(order => (
                <tr key={order.id} style={{ borderBottom: `1px solid ${darkMode ? '#374151' : '#f3f4f6'}` }}>
                  <td style={{ padding: '12px', fontWeight: '500' }}>#{order.id}</td>
                  <td style={{ padding: '12px' }}>{order.customer}</td>
                  <td style={{ padding: '12px', color: darkMode ? '#9ca3af' : '#6b7280' }}>{order.product}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '999px',
                      fontSize: '13px',
                      ...statusStyles[order.status]
                    }}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px', fontWeight: '600' }}>£{order.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p style={{ textAlign: 'center', padding: '24px', color: darkMode ? '#9ca3af' : '#6b7280' }}>
              No orders found.
            </p>
          )}
        </div>
      )}
    </div>
  )
}