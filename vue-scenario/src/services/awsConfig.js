// src/services/awsConfig.js
// AWS S3 Configuration using Vite environment variables

export const AWS_CONFIG = {
  region: import.meta.env.VITE_AWS_REGION || 'eu-north-1',
  bucket: import.meta.env.VITE_S3_BUCKET || 'k1958-project-media',
  apiEndpoint: import.meta.env.VITE_API_ENDPOINT || 'https://your-api-gateway-url.amazonaws.com/prod'
};

export default AWS_CONFIG;