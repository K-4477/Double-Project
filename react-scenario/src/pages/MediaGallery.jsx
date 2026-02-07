// src/pages/MediaGallery.jsx
// Main media gallery page that combines all components

import React, { useState, useEffect } from 'react';
import { fetchMediaItems, uploadFile } from '../services/mediaApi';
import UploadZone from '../components/UploadZone';
import CategoryFilter from '../components/CategoryFilter';
import MediaCard from '../components/MediaCard';
import MediaLightbox from '../components/MediaLightbox';

const MediaGallery = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Fetch media on component mount
  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      const items = await fetchMediaItems();
      setMediaItems(items);
    } catch (error) {
      console.error('Failed to load media:', error);
    }
  };

  const handleUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setIsUploading(true);

    for (const file of files) {
      try {
        await uploadFile(file);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }

    setIsUploading(false);
    loadMedia(); // Refresh media list
  };

  // Filter media by category
  const filteredMedia = activeCategory === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === activeCategory);

  // Lightbox navigation
  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextMedia = () => setLightboxIndex((lightboxIndex + 1) % filteredMedia.length);
  const prevMedia = () => setLightboxIndex((lightboxIndex - 1 + filteredMedia.length) % filteredMedia.length);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px' }}>
      {/* Upload Section */}
      <div className="stagger-3">
        <UploadZone onUpload={handleUpload} isUploading={isUploading} />
      </div>

      {/* Category Filters */}
      <div className="stagger-4">
        <CategoryFilter 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />
      </div>

      {/* Media Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px',
        marginTop: '40px'
      }}>
        {filteredMedia.map((item, index) => (
          <MediaCard
            key={item.id}
            item={item}
            index={index}
            onClick={() => openLightbox(index)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredMedia.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '80px 20px',
          color: 'rgba(224, 224, 224, 0.4)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>∅</div>
          <div style={{ fontSize: '18px', letterSpacing: '2px' }}>
            NO MEDIA FOUND
          </div>
          <div style={{ fontSize: '14px', marginTop: '8px', opacity: 0.6 }}>
            Upload some images or videos to get started
          </div>
        </div>
      )}

      {/* Lightbox */}
      <MediaLightbox
        media={filteredMedia}
        currentIndex={lightboxIndex}
        onClose={closeLightbox}
        onNext={nextMedia}
        onPrev={prevMedia}
      />
    </div>
  );
};

export default MediaGallery;
