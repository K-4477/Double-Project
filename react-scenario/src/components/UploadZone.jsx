// src/components/UploadZone.jsx
// File upload component

import React from 'react';
import { Upload } from 'lucide-react';

const UploadZone = ({ onUpload, isUploading }) => {
  return (
    <label 
      className="upload-zone" 
      style={{
        display: 'block',
        padding: '60px',
        borderRadius: '12px',
        textAlign: 'center',
        border: '3px dashed rgba(16, 185, 129, 0.3)',
        background: 'rgba(30, 30, 45, 0.4)',
        transition: 'all 0.3s',
        cursor: 'pointer'
      }}
    >
      <input
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={onUpload}
        style={{ display: 'none' }}
        disabled={isUploading}
      />
      <Upload 
        size={48} 
        style={{
          color: '#10b981',
          marginBottom: '16px',
          animation: isUploading ? 'pulse 1.5s infinite' : 'none'
        }} 
      />
      <div style={{
        fontSize: '20px',
        fontWeight: 700,
        color: '#10b981',
        marginBottom: '8px'
      }}>
        {isUploading ? 'Uploading...' : 'Upload Media'}
      </div>
      <div style={{
        fontSize: '14px',
        color: 'rgba(224, 224, 224, 0.5)',
        letterSpacing: '1px'
      }}>
        Click or drag files to upload to AWS S3
      </div>
    </label>
  );
};

export default UploadZone;
