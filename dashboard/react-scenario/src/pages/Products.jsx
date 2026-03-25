import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { products as initialProducts } from '../data/mockData'

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

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id))
  }

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
      const newProduct = {
        id: Date.now(),
        name: form.name,
        category: form.category,
        price: parseFloat(form.price),
        stock: parseInt(form.stock)
      }
      setProducts([...products, newProduct])
    }

    setForm({ name: '', category: '', price: '', stock: '' })
    setEditingProduct(null)
    setShowForm(false)
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
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Products</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditingProduct(null); setForm({ name: '', category: '', price: '', stock: '' }) }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          + Add Product
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div style={cardStyle}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <input
              style={inputStyle}
              placeholder="Product Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <input
              style={inputStyle}
              placeholder="Category"
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
            />
            <input
              style={inputStyle}
              placeholder="Price"
              type="number"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
            />
            <input
              style={inputStyle}
              placeholder="Stock"
              type="number"
              value={form.stock}
              onChange={e => setForm({ ...form, stock: e.target.value })}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button
              onClick={handleSubmit}
              style={{
                padding: '10px 20px',
                backgroundColor: '#16a34a',
                color: '#ffffff',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              {editingProduct ? 'Save Changes' : 'Add Product'}
            </button>
            <button
              onClick={() => { setShowForm(false); setEditingProduct(null) }}
              style={{
                padding: '10px 20px',
                backgroundColor: darkMode ? '#374151' : '#e5e7eb',
                color: darkMode ? '#ffffff' : '#1f2937',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <input
          style={{ ...inputStyle, width: '240px' }}
          placeholder="🔍 Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          style={inputStyle}
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div style={cardStyle}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}` }}>
              {['Name', 'Category', 'Price', 'Stock', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px', textAlign: 'left', fontSize: '14px', color: darkMode ? '#9ca3af' : '#6b7280' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(product => (
              <tr key={product.id} style={{ borderBottom: `1px solid ${darkMode ? '#374151' : '#f3f4f6'}` }}>
                <td style={{ padding: '12px', fontWeight: '500' }}>{product.name}</td>
                <td style={{ padding: '12px', color: darkMode ? '#9ca3af' : '#6b7280' }}>{product.category}</td>
                <td style={{ padding: '12px' }}>£{product.price.toFixed(2)}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '999px',
                    fontSize: '13px',
                    backgroundColor: product.stock < 50 ? '#fef2f2' : '#f0fdf4',
                    color: product.stock < 50 ? '#dc2626' : '#16a34a',
                  }}>
                    {product.stock}
                  </span>
                </td>
                <td style={{ padding: '12px', display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleEdit(product)}
                    style={{
                      padding: '6px 14px',
                      backgroundColor: '#2563eb',
                      color: '#ffffff',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '13px'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    style={{
                      padding: '6px 14px',
                      backgroundColor: '#dc2626',
                      color: '#ffffff',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '13px'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', padding: '24px', color: darkMode ? '#9ca3af' : '#6b7280' }}>
            No products found.
          </p>
        )}
      </div>
    </div>
  )
}