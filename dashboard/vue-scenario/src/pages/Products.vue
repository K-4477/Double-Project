<template>
  <div :class="styles.page">
    <div :class="styles.flexBetween">
      <h1 :class="styles.pageTitle">Products</h1>
      <button
        :class="styles.button"
        @click="toggleForm"
        style="background-color: #2563eb; color: #ffffff;"
      >
        + Add Product
      </button>
    </div>

    <!-- Add/Edit Form -->
    <div v-if="showForm" :class="styles.card" :style="cardBg">
      <h2 :class="styles.cardTitle">{{ editingProduct ? 'Edit Product' : 'Add New Product' }}</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <input :style="inputStyle" placeholder="Product Name" v-model="form.name" />
        <input :style="inputStyle" placeholder="Category" v-model="form.category" />
        <input :style="inputStyle" placeholder="Price" type="number" v-model="form.price" />
        <input :style="inputStyle" placeholder="Stock" type="number" v-model="form.stock" />
      </div>
      <div style="display: flex; gap: 12px; margin-top: 16px;">
        <button :class="styles.button" @click="handleSubmit" style="background-color: #16a34a; color: #ffffff;">
          {{ editingProduct ? 'Save Changes' : 'Add Product' }}
        </button>
        <button :class="styles.button" @click="cancelForm" :style="{ backgroundColor: darkMode ? '#374151' : '#e5e7eb', color: darkMode ? '#ffffff' : '#1f2937' }">
          Cancel
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      <input :style="{ ...inputStyle, width: '240px' }" placeholder="🔍 Search products..." v-model="search" />
      <select :style="inputStyle" v-model="categoryFilter">
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <!-- Table -->
    <div :class="styles.card" :style="cardBg">
      <table :class="styles.table">
        <thead>
          <tr :style="{ borderBottom: `2px solid ${borderColor}` }">
            <th v-for="h in ['Name', 'Category', 'Price', 'Stock', 'Actions']" :key="h" :class="styles.th" :style="mutedText">{{ h }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in filtered" :key="product.id" :style="{ borderBottom: `1px solid ${borderColor}` }">
            <td :class="styles.td" style="font-weight: 500;">{{ product.name }}</td>
            <td :class="styles.td" :style="mutedText">{{ product.category }}</td>
            <td :class="styles.td">£{{ product.price.toFixed(2) }}</td>
            <td :class="styles.td">
              <span :class="styles.badge" :style="{
                backgroundColor: product.stock < 50 ? '#fef2f2' : '#f0fdf4',
                color: product.stock < 50 ? '#dc2626' : '#16a34a',
              }">{{ product.stock }}</span>
            </td>
            <td :class="styles.td" style="display: flex; gap: 8px;">
              <button :class="styles.button" @click="handleEdit(product)" style="background-color: #2563eb; color: #ffffff; padding: 6px 14px;">Edit</button>
              <button :class="styles.button" @click="handleDelete(product.id)" style="background-color: #dc2626; color: #ffffff; padding: 6px 14px;">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="filtered.length === 0" :style="{ textAlign: 'center', padding: '24px', ...mutedText }">No products found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, useCssModule } from 'vue'
import { useTheme } from '../context/useTheme'
import { products as initialProducts } from '../data/mockData'

const styles = useCssModule()
const { darkMode } = useTheme()

const products = ref([...initialProducts])
const search = ref('')
const categoryFilter = ref('All')
const showForm = ref(false)
const editingProduct = ref(null)
const form = ref({ name: '', category: '', price: '', stock: '' })

const categories = computed(() => ['All', ...new Set(initialProducts.map(p => p.category))])

const filtered = computed(() => products.value.filter(p => {
  const matchesSearch = p.name.toLowerCase().includes(search.value.toLowerCase())
  const matchesCategory = categoryFilter.value === 'All' || p.category === categoryFilter.value
  return matchesSearch && matchesCategory
}))

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
}))

const toggleForm = () => {
  showForm.value = !showForm.value
  editingProduct.value = null
  form.value = { name: '', category: '', price: '', stock: '' }
}

const cancelForm = () => {
  showForm.value = false
  editingProduct.value = null
}

const handleEdit = (product) => {
  editingProduct.value = product
  form.value = { name: product.name, category: product.category, price: product.price, stock: product.stock }
  showForm.value = true
}

const handleDelete = (id) => {
  products.value = products.value.filter(p => p.id !== id)
}

const handleSubmit = () => {
  if (!form.value.name || !form.value.category || !form.value.price || !form.value.stock) return
  if (editingProduct.value) {
    products.value = products.value.map(p =>
      p.id === editingProduct.value.id
        ? { ...p, ...form.value, price: parseFloat(form.value.price), stock: parseInt(form.value.stock) }
        : p
    )
  } else {
    products.value.push({
      id: Date.now(),
      name: form.value.name,
      category: form.value.category,
      price: parseFloat(form.value.price),
      stock: parseInt(form.value.stock)
    })
  }
  form.value = { name: '', category: '', price: '', stock: '' }
  editingProduct.value = null
  showForm.value = false
}
</script>

<style module src="../css/global.module.css"></style>