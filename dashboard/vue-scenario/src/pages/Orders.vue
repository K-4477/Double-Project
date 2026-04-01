<template>
  <div :class="styles.page">
    <div :class="styles.flexBetween">
      <h1 :class="styles.pageTitle">Orders</h1>
      <select :style="inputStyle" v-model="statusFilter">
        <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
      </select>
    </div>

    <div v-if="loading" :style="{ textAlign: 'center', padding: '48px', fontSize: '18px', color: darkMode ? '#9ca3af' : '#6b7280' }">
      ⏳ Fetching orders...
    </div>

    <div v-else :class="styles.card" :style="cardBg">
      <table :class="styles.table">
        <thead>
          <tr :style="{ borderBottom: `2px solid ${borderColor}` }">
            <th v-for="h in ['Order ID', 'Customer', 'Product', 'Status', 'Total']" :key="h" :class="styles.th" :style="mutedText">{{ h }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in filtered" :key="order.id" :style="{ borderBottom: `1px solid ${borderColor}` }">
            <td :class="styles.td" style="font-weight: 500;">#{{ order.id }}</td>
            <td :class="styles.td">{{ order.customer }}</td>
            <td :class="styles.td" :style="mutedText">{{ order.product }}</td>
            <td :class="styles.td">
              <span :class="styles.badge" :style="statusStyles[order.status]">{{ order.status }}</span>
            </td>
            <td :class="styles.td" style="font-weight: 600;">£{{ order.total.toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="filtered.length === 0" :style="{ textAlign: 'center', padding: '24px', ...mutedText }">No orders found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, useCssModule } from 'vue'
import { useTheme } from '../context/useTheme'
import { orders as mockOrders } from '../data/mockData'

const styles = useCssModule()
const { darkMode } = useTheme()

const orders = ref([])
const loading = ref(true)
const statusFilter = ref('All')
const statuses = ['All', 'Delivered', 'Pending', 'Shipped', 'Cancelled']

const statusStyles = {
  Delivered: { backgroundColor: '#f0fdf4', color: '#16a34a' },
  Pending: { backgroundColor: '#fefce8', color: '#ca8a04' },
  Shipped: { backgroundColor: '#eff6ff', color: '#2563eb' },
  Cancelled: { backgroundColor: '#fef2f2', color: '#dc2626' },
}

onMounted(() => {
  setTimeout(() => {
    orders.value = mockOrders
    loading.value = false
  }, 1000)
})

const filtered = computed(() =>
  orders.value.filter(o => statusFilter.value === 'All' ? true : o.status === statusFilter.value)
)

const cardBg = computed(() => ({ backgroundColor: darkMode.value ? '#1f2937' : '#ffffff' }))
const mutedText = computed(() => ({ color: darkMode.value ? '#9ca3af' : '#6b7280' }))
const borderColor = computed(() => darkMode.value ? '#374151' : '#e5e7eb')
const inputStyle = computed(() => ({
  padding: '8px 12px',
  borderRadius: '8px',
  border: `1px solid ${borderColor.value}`,
  backgroundColor: darkMode.value ? '#111827' : '#f9fafb',
  color: darkMode.value ? '#ffffff' : '#1f2937',
  fontSize: '14px',
  cursor: 'pointer',
}))
</script>

<style module src="../css/global.module.css"></style>