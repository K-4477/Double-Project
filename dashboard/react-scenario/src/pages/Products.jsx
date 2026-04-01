import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { products as initialProducts } from '../data/mockData'
import styles from '../css/global.module.css'

export default function Products() {
  const { darkMode } = useTheme()
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [form, setForm] = useState({ name: '', category: '', price: '', stock: '' })

  const categories = ['All', ...new Set(initialProducts.map(p => p.category))]

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleDelete = (id) => setProducts(products.filter(p => p.id !== id))

  const handleEdit = (product) => {
    setEditingProduct(product)
    setForm({ name: product.name, category: product.category, price: product.price, stock: product.stock })
    setShowForm(true)
  }

  const handleSubmit = () => {
    if (!form.name || !form.category || !form.price || !form.stock) return
    if (editingProduct) {
      setProducts(products.map(p =>
        p.id === editingProduct.id
          ? { ...p, ...form, price: parseFloat(form.price), stock: parseInt(form.stock) }
          : p
      ))
    } else {
      setProducts([...products, {
        id: Date.now(),
        name: form.name,
        category: form.category,
        price: parseFloat(form.price),
        stock: parseInt(form.stock)
      }])
    }
    setForm({ name: '', category: '', price: '', stock: '' })
    setEditingProduct(null)
    setShowForm(false)
  }

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
  }

  const formGrid = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px'
  }

  return (
    <div className={styles.page}>
      <div className={styles.flexBetween}>
        <h1 className={styles.pageTitle}>Products</h1>
        <button
          className={styles.button}
          onClick={() => { setShowForm(!showForm); setEditingProduct(null); setForm({ name: '', category: '', price: '', stock: '' }) }}
          style={{ backgroundColor: '#2563eb', color: '#ffffff' }}
        >
          + Add Product
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className={styles.card} style={cardBg}>
          <h2 className={styles.cardTitle}>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
          <div style={formGrid}>
            <input style={inputStyle} placeholder="Product Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input style={inputStyle} placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
            <input style={inputStyle} placeholder="Price" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
            <input style={inputStyle} placeholder="Stock" type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button className={styles.button} onClick={handleSubmit} style={{ backgroundColor: '#16a34a', color: '#ffffff' }}>
              {editingProduct ? 'Save Changes' : 'Add Product'}
            </button>
            <button className={styles.button} onClick={() => { setShowForm(false); setEditingProduct(null) }} style={{ backgroundColor: darkMode ? '#374151' : '#e5e7eb', color: darkMode ? '#ffffff' : '#1f2937' }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <input style={{ ...inputStyle, width: '240px' }} placeholder="🔍 Search products..." value={search} onChange={e => setSearch(e.target.value)} />
        <select style={inputStyle} value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className={styles.card} style={cardBg}>
        <table className={styles.table}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${borderColor}` }}>
              {['Name', 'Category', 'Price', 'Stock', 'Actions'].map(h => (
                <th key={h} className={styles.th} style={mutedText}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(product => (
              <tr key={product.id} style={{ borderBottom: `1px solid ${borderColor}` }}>
                <td className={styles.td} style={{ fontWeight: '500' }}>{product.name}</td>
                <td className={styles.td} style={mutedText}>{product.category}</td>
                <td className={styles.td}>£{product.price.toFixed(2)}</td>
                <td className={styles.td}>
                  <span className={styles.badge} style={{
                    backgroundColor: product.stock < 50 ? '#fef2f2' : '#f0fdf4',
                    color: product.stock < 50 ? '#dc2626' : '#16a34a',
                  }}>
                    {product.stock}
                  </span>
                </td>
                <td className={styles.td} style={{ display: 'flex', gap: '8px' }}>
                  <button className={styles.button} onClick={() => handleEdit(product)} style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '6px 14px' }}>Edit</button>
                  <button className={styles.button} onClick={() => handleDelete(product.id)} style={{ backgroundColor: '#dc2626', color: '#ffffff', padding: '6px 14px' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', padding: '24px', ...mutedText }}>No products found.</p>
        )}
      </div>
    </div>
  )
}