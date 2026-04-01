import { useTheme } from '../context/ThemeContext'
import { products, orders, revenueData } from '../data/mockData'
import styles from '../css/global.module.css'
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'

const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)

const kpis = [
  { label: 'Total Revenue', value: `£${totalRevenue.toFixed(2)}`, icon: '💰', color: '#2563eb' },
  { label: 'Total Orders', value: orders.length, icon: '🛒', color: '#16a34a' },
  { label: 'Total Products', value: products.length, icon: '📦', color: '#9333ea' },
  { label: 'Low Stock Items', value: products.filter(p => p.stock < 50).length, icon: '⚠️', color: '#dc2626' },
]

export default function Overview() {
  const { darkMode } = useTheme()

  const cardBg = { backgroundColor: darkMode ? '#1f2937' : '#ffffff' }
  const mutedText = { color: darkMode ? '#9ca3af' : '#6b7280' }
  const gridStroke = darkMode ? '#374151' : '#e5e7eb'
  const axisStroke = darkMode ? '#9ca3af' : '#6b7280'
  const tooltipBg = { backgroundColor: darkMode ? '#1f2937' : '#fff' }

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Overview</h1>

      {/* KPI Cards */}
      <div className={styles.grid4}>
        {kpis.map(kpi => (
          <div key={kpi.label} className={styles.card} style={cardBg}>
            <div className={styles.flexBetween}>
              <div>
                <p style={{ fontSize: '14px', ...mutedText }}>{kpi.label}</p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: kpi.color }}>{kpi.value}</p>
              </div>
              <span style={{ fontSize: '32px' }}>{kpi.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className={styles.grid2}>
        <div className={styles.card} style={cardBg}>
          <h2 className={styles.cardTitle}>Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="month" stroke={axisStroke} />
              <YAxis stroke={axisStroke} />
              <Tooltip contentStyle={tooltipBg} />
              <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.card} style={cardBg}>
          <h2 className={styles.cardTitle}>Revenue by Month</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="month" stroke={axisStroke} />
              <YAxis stroke={axisStroke} />
              <Tooltip contentStyle={tooltipBg} />
              <Bar dataKey="revenue" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}