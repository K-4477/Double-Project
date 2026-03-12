// src/components/MediaLightbox.jsx
// Full-screen media viewer with navigation

import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const MediaLightbox = ({ media, currentIndex, onClose, onNext, onPrev }) => {
  if (currentIndex === null || !media[currentIndex]) return null;

  const currentMedia = media[currentIndex];

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.95)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px'
      }} 
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'rgba(16, 185, 129, 0.2)',
          border: '2px solid #10b981',
          color: '#10b981',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s'
        }}
      >
        <X size={24} />
      </button>

      {/* Previous Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        style={{
          position: 'absolute',
          left: '20px',
          background: 'rgba(16, 185, 129, 0.2)',
          border: '2px solid #10b981',
          color: '#10b981',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ChevronLeft size={24} />
      </button>

      {/* Next Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        style={{
          position: 'absolute',
          right: '20px',
          background: 'rgba(16, 185, 129, 0.2)',
          border: '2px solid #10b981',
          color: '#10b981',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ChevronRight size={24} />
      </button>

      {/* Media Content */}
      <div onClick={(e) => e.stopPropagation()} style={{
        maxWidth: '90%',
        maxHeight: '90%'
      }}>
        {currentMedia.category === 'image' ? (
          <img
            src={currentMedia.url}
            alt={currentMedia.fileName}
            style={{
              maxWidth: '100%',
              maxHeight: '85vh',
              objectFit: 'contain',
              borderRadius: '8px'
            }}
          />
        ) : (
          <video
            src={currentMedia.url}
            controls
            autoPlay
            style={{
              maxWidth: '100%',
              maxHeight: '85vh',
              borderRadius: '8px'
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MediaLightbox;
