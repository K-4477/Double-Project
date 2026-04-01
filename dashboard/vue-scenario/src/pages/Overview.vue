<template>
  <div :class="styles.page">
    <h1 :class="styles.pageTitle">Overview</h1>

    <!-- KPI Cards -->
    <div :class="styles.grid4">
      <div v-for="kpi in kpis" :key="kpi.label" :class="styles.card" :style="cardBg">
        <div :class="styles.flexBetween">
          <div>
            <p :style="{ fontSize: '14px', color: darkMode ? '#9ca3af' : '#6b7280' }">{{ kpi.label }}</p>
            <p :style="{ fontSize: '28px', fontWeight: 'bold', color: kpi.color }">{{ kpi.value }}</p>
          </div>
          <span style="font-size: 32px;">{{ kpi.icon }}</span>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div :class="styles.grid2">
      <div :class="styles.card" :style="cardBg">
        <h2 :class="styles.cardTitle">Monthly Revenue</h2>
        <LineChart :data="revenueData" :darkMode="darkMode" />
        <div style="height: 300px;">
          <Line :data="chartData" :options="chartOptions" />
        </div>
      </div>
      <div :class="styles.card" :style="cardBg">
        <h2 :class="styles.cardTitle">Revenue by Month</h2>
        <div style="height: 300px;">
          <Bar :data="chartData" :options="chartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, useCssModule } from 'vue'
import { useTheme } from '../context/useTheme'
import { products, orders, revenueData } from '../data/mockData'
import { Line, Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const chartData = computed(() => ({
  labels: revenueData.map(d => d.month),
  datasets: [
    {
      label: 'Revenue',
      data: revenueData.map(d => d.revenue),
      borderColor: '#2563eb',
      backgroundColor: '#2563eb'
    }
  ]
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: darkMode.value ? '#e5e7eb' : '#374151'
      }
    }
  },
  scales: {
    x: {
      ticks: { color: darkMode.value ? '#9ca3af' : '#6b7280' }
    },
    y: {
      ticks: { color: darkMode.value ? '#9ca3af' : '#6b7280' }
    }
  }
}))

const styles = useCssModule()
const { darkMode } = useTheme()

const cardBg = computed(() => ({
  backgroundColor: darkMode.value ? '#1f2937' : '#ffffff'
}))

const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)

const kpis = [
  { label: 'Total Revenue', value: `£${totalRevenue.toFixed(2)}`, icon: '💰', color: '#2563eb' },
  { label: 'Total Orders', value: orders.length, icon: '🛒', color: '#16a34a' },
  { label: 'Total Products', value: products.length, icon: '📦', color: '#9333ea' },
  { label: 'Low Stock Items', value: products.filter(p => p.stock < 50).length, icon: '⚠️', color: '#dc2626' },
]
</script>

<style module src="../css/global.module.css"></style>