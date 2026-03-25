import { useTheme } from '../context/ThemeContext'
import { products, orders, revenueData } from '../data/mockData'
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'

const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
const totalOrders = orders.length
const totalProducts = products.length
const lowStock = products.filter(p => p.stock < 50).length

export default function Overview() {
  const { darkMode } = useTheme()

  const cardStyle = {
    backgroundColor: darkMode ? '#1f2937' : '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  }

  const kpis = [
    { label: 'Total Revenue', value: `£${totalRevenue.toFixed(2)}`, icon: '💰', color: '#2563eb' },
    { label: 'Total Orders', value: totalOrders, icon: '🛒', color: '#16a34a' },
    { label: 'Total Products', value: totalProducts, icon: '📦', color: '#9333ea' },
    { label: 'Low Stock Items', value: lowStock, icon: '⚠️', color: '#dc2626' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Overview</h1>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {kpis.map(kpi => (
          <div key={kpi.label} style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '14px', color: darkMode ? '#9ca3af' : '#6b7280' }}>{kpi.label}</p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: kpi.color }}>{kpi.value}</p>
              </div>
              <span style={{ fontSize: '32px' }}>{kpi.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        
        {/* Revenue Line Chart */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="month" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
              <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1f2937' : '#fff' }} />
              <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Orders Bar Chart */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Revenue by Month</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="month" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
              <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1f2937' : '#fff' }} />
              <Bar dataKey="revenue" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  )
}