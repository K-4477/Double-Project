<!-- src/components/UploadZone.vue -->
<!-- File upload component -->
<template>
  <label class="upload-zone">
    <input
      type="file"
      multiple
      accept="image/*,video/*"
      @change="handleFileChange"
      style="display: none"
      :disabled="isUploading"
    />
    <Upload 
      :size="48" 
      :style="{
        color: '#10b981',
        marginBottom: '16px',
        animation: isUploading ? 'pulse 1.5s infinite' : 'none'
      }" 
    />
    <div class="upload-title">
      {{ isUploading ? 'Uploading...' : 'Upload Media' }}
    </div>
    <div class="upload-subtitle">
      Click or drag files to upload to AWS S3
    </div>
  </label>
</template>

<script setup>
import { Upload } from 'lucide-vue-next';

const props = defineProps({
  isUploading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['upload']);

const handleFileChange = (event) => {
  emit('upload', event);
};
</script>

<style scoped>
.upload-zone {
  display: block;
  padding: 60px;
  border-radius: 12px;
  text-align: center;
  border: 3px dashed rgba(16, 185, 129, 0.3);
  background: rgba(30, 30, 45, 0.4);
  transition: all 0.3s;
  cursor: pointer;
}

.upload-zone:hover {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.05);
}

.upload-title {
  font-size: 20px;
  font-weight: 700;
  color: #10b981;
  margin-bottom: 8px;
}

.upload-subtitle {
  font-size: 14px;
  color: rgba(224, 224, 224, 0.5);
  letter-spacing: 1px;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
