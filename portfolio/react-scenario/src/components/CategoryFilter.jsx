// src/components/CategoryFilter.jsx
// Category filtering buttons

import React from 'react';

const CategoryFilter = ({ activeCategory, onCategoryChange }) => {
  const categories = ['all', 'image', 'video'];

  return (
    <div style={{
      display: 'flex',
      gap: '16px',
      marginTop: '40px',
      flexWrap: 'wrap'
    }}>
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`category-btn ${activeCategory === category ? 'active' : ''}`}
          style={{
            padding: '12px 24px',
            border: '2px solid rgba(16, 185, 129, 0.3)',
            background: activeCategory === category 
              ? 'rgba(16, 185, 129, 0.2)' 
              : 'rgba(30, 30, 45, 0.6)',
            borderColor: activeCategory === category 
              ? '#10b981' 
              : 'rgba(16, 185, 129, 0.3)',
            boxShadow: activeCategory === category 
              ? '0 0 20px rgba(16, 185, 129, 0.3)' 
              : 'none',
            color: '#10b981',
            cursor: 'pointer',
            transition: 'all 0.3s',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontSize: '11px',
            fontWeight: 700,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {category === 'all' ? 'All Media' : category + 's'}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
