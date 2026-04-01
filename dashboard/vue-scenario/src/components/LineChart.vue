<template>
  <div ref="chartRef" style="width: 100%; height: 250px;"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps(['data', 'darkMode'])
const chartRef = ref(null)

function drawChart() {
  const el = chartRef.value
  if (!el) return

  const width = el.clientWidth
  const height = 250
  const padding = 40
  const maxRevenue = Math.max(...props.data.map(d => d.revenue))
  const stepX = (width - padding * 2) / (props.data.length - 1)

  const points = props.data.map((d, i) => {
    const x = padding + i * stepX
    const y = height - padding - ((d.revenue / maxRevenue) * (height - padding * 2))
    return `${x},${y}`
  })

  const gridColor = props.darkMode ? '#374151' : '#e5e7eb'
  const textColor = props.darkMode ? '#9ca3af' : '#6b7280'

  el.innerHTML = `
    <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}">
      ${[0, 0.25, 0.5, 0.75, 1].map(t => {
        const y = padding + t * (height - padding * 2)
        return `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="${gridColor}" stroke-dasharray="3,3"/>`
      }).join('')}
      ${props.data.map((d, i) => {
        const x = padding + i * stepX
        return `<text x="${x}" y="${height - 10}" text-anchor="middle" fill="${textColor}" font-size="12">${d.month}</text>`
      }).join('')}
      <polyline points="${points.join(' ')}" fill="none" stroke="#2563eb" stroke-width="2"/>
      ${points.map(p => `<circle cx="${p.split(',')[0]}" cy="${p.split(',')[1]}" r="4" fill="#2563eb"/>`).join('')}
    </svg>
  `
}

onMounted(drawChart)
watch(() => props.darkMode, drawChart)
</script>