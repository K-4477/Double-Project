// src/services/mediaApi.js
// API service for media management

import { AWS_CONFIG } from './awsConfig';

/**
 * Fetch all media items from the API
 */
export const fetchMediaItems = async () => {
  try {
    const response = await fetch(`${AWS_CONFIG.apiEndpoint}/media`);
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error fetching media:', error);
    throw error;
  }
};

/**
 * Upload a file to S3 via presigned URL
 */
export const uploadFile = async (file) => {
  try {
    // Step 1: Get presigned URL from API
    const response = await fetch(`${AWS_CONFIG.apiEndpoint}/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type
      })
    });

    const { uploadUrl, key } = await response.json();

    // Step 2: Upload file to S3 using presigned URL
    await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file
    });

    // Step 3: Save metadata to database
    await fetch(`${AWS_CONFIG.apiEndpoint}/media`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        key,
        fileName: file.name,
        fileType: file.type,
        category: file.type.startsWith('video/') ? 'video' : 'image'
      })
    });

    return { success: true, key };
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

/**
 * Delete a media item
 */
export const deleteMedia = async (itemId, key) => {
  try {
    await fetch(`${AWS_CONFIG.apiEndpoint}/media/${itemId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key })
    });
    return { success: true };
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
};
