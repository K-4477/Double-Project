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
  const barWidth = ((width - padding * 2) / props.data.length) * 0.6
  const stepX = (width - padding * 2) / props.data.length

  const gridColor = props.darkMode ? '#374151' : '#e5e7eb'
  const textColor = props.darkMode ? '#9ca3af' : '#6b7280'

  el.innerHTML = `
    <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}">
      ${[0, 0.25, 0.5, 0.75, 1].map(t => {
        const y = padding + t * (height - padding * 2)
        return `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="${gridColor}" stroke-dasharray="3,3"/>`
      }).join('')}
      ${props.data.map((d, i) => {
        const barHeight = (d.revenue / maxRevenue) * (height - padding * 2)
        const x = padding + i * stepX + (stepX - barWidth) / 2
        const y = height - padding - barHeight
        return `
          <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" fill="#2563eb" rx="4"/>
          <text x="${x + barWidth / 2}" y="${height - 10}" text-anchor="middle" fill="${textColor}" font-size="12">${d.month}</text>
        `
      }).join('')}
    </svg>
  `
}

onMounted(drawChart)
watch(() => props.darkMode, drawChart)
</script>