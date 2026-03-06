<!-- src/pages/MediaGallery.vue -->
<!-- Main media gallery page that combines all components -->
<template>
  <div class="media-gallery">
    <!-- Upload Section -->
    <div class="stagger-3">
      <UploadZone 
        :is-uploading="isUploading" 
        @upload="handleUpload" 
      />
    </div>

    <!-- Category Filters -->
    <div class="stagger-4">
      <CategoryFilter v-model="activeCategory" />
    </div>

    <!-- Media Grid -->
    <div class="media-grid">
      <MediaCard
        v-for="(item, index) in filteredMedia"
        :key="item.id"
        :item="item"
        :index="index"
        @click="openLightbox(index)"
      />
    </div>

    <!-- Empty State -->
    <div v-if="filteredMedia.length === 0" class="empty-state">
      <div class="empty-icon">∅</div>
      <div class="empty-title">NO MEDIA FOUND</div>
      <div class="empty-subtitle">Upload some images or videos to get started</div>
    </div>

    <!-- Lightbox -->
    <MediaLightbox
      :media="filteredMedia"
      :current-index="lightboxIndex"
      @close="closeLightbox"
      @next="nextMedia"
      @prev="prevMedia"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { fetchMediaItems, uploadFile } from '../services/mediaApi';
import UploadZone from '../components/UploadZone.vue';
import CategoryFilter from '../components/CategoryFilter.vue';
import MediaCard from '../components/MediaCard.vue';
import MediaLightbox from '../components/MediaLightbox.vue';

const mediaItems = ref([]);
const isUploading = ref(false);
const activeCategory = ref('all');
const lightboxIndex = ref(null);

// Fetch media on component mount
onMounted(async () => {
  await loadMedia();
});

const loadMedia = async () => {
  try {
    const items = await fetchMediaItems();
    mediaItems.value = items;
  } catch (error) {
    console.error('Failed to load media:', error);
  }
};

const handleUpload = async (event) => {
  const files = Array.from(event.target.files);
  if (files.length === 0) return;

  isUploading.value = true;

  for (const file of files) {
    try {
      await uploadFile(file);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  }

  isUploading.value = false;
  await loadMedia(); // Refresh media list
};

// Filter media by category
const filteredMedia = computed(() => {
  if (activeCategory.value === 'all') {
    return mediaItems.value;
  }
  return mediaItems.value.filter(item => item.category === activeCategory.value);
});

// Lightbox navigation
const openLightbox = (index) => {
  lightboxIndex.value = index;
};

const closeLightbox = () => {
  lightboxIndex.value = null;
};

const nextMedia = () => {
  lightboxIndex.value = (lightboxIndex.value + 1) % filteredMedia.value.length;
};

const prevMedia = () => {
  lightboxIndex.value = (lightboxIndex.value - 1 + filteredMedia.value.length) % filteredMedia.value.length;
};
</script>

<style scoped>
.media-gallery {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px;
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-top: 40px;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: rgba(224, 224, 224, 0.4);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-title {
  font-size: 18px;
  letter-spacing: 2px;
}

.empty-subtitle {
  font-size: 14px;
  margin-top: 8px;
  opacity: 0.6;
}

.stagger-3 { animation: fadeInUp 0.6s ease-out 0.3s backwards; }
.stagger-4 { animation: fadeInUp 0.6s ease-out 0.4s backwards; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
