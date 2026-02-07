// src/components/MediaCard.jsx
// Individual media card component

import React from 'react';
import { Image as ImageIcon, Video } from 'lucide-react';

const MediaCard = ({ item, index, onClick }) => {
  return (
    <div
      className="media-card"
      onClick={onClick}
      style={{
        aspectRatio: '16/9',
        animationDelay: `${index * 0.05}s`,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        background: 'rgba(30, 30, 45, 0.6)',
        border: '1px solid rgba(16, 185, 129, 0.2)'
      }}
    >
      {item.category === 'image' ? (
        <img
          src={item.url}
          alt={item.fileName}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      ) : (
        <video
          src={item.url}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      )}
      
      <div className="media-info">
        <div style={{
          fontSize: '14px',
          color: '#10b981',
          marginBottom: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          {item.category === 'image' ? <ImageIcon size={16} /> : <Video size={16} />}
          <span>{item.category}</span>
        </div>
        <div style={{
          fontSize: '12px',
          color: 'rgba(224, 224, 224, 0.8)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {item.fileName}
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
