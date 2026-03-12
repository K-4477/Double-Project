<!-- src/components/MediaLightbox.vue -->
<!-- Full-screen media viewer with navigation -->
<template>
  <div 
    v-if="currentIndex !== null && media[currentIndex]"
    class="lightbox-overlay"
    @click="$emit('close')"
  >
    <!-- Close Button -->
    <button
      class="lightbox-btn close-btn"
      @click.stop="$emit('close')"
    >
      <X :size="24" />
    </button>

    <!-- Previous Button -->
    <button
      class="lightbox-btn prev-btn"
      @click.stop="$emit('prev')"
    >
      <ChevronLeft :size="24" />
    </button>

    <!-- Next Button -->
    <button
      class="lightbox-btn next-btn"
      @click.stop="$emit('next')"
    >
      <ChevronRight :size="24" />
    </button>

    <!-- Media Content -->
    <div class="media-container" @click.stop>
      <img
        v-if="media[currentIndex].category === 'image'"
        :src="media[currentIndex].url"
        :alt="media[currentIndex].fileName"
        class="lightbox-media"
      />
      <video
        v-else
        :src="media[currentIndex].url"
        controls
        autoplay
        class="lightbox-media"
      />
    </div>
  </div>
</template>

<script setup>
import { X, ChevronLeft, ChevronRight } from 'lucide-vue-next';

const props = defineProps({
  media: {
    type: Array,
    required: true
  },
  currentIndex: {
    type: Number,
    default: null
  }
});

defineEmits(['close', 'next', 'prev']);
</script>

<style scoped>
.lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.lightbox-btn {
  position: absolute;
  background: rgba(16, 185, 129, 0.2);
  border: 2px solid #10b981;
  color: #10b981;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.lightbox-btn:hover {
  background: rgba(16, 185, 129, 0.4);
}

.close-btn {
  top: 20px;
  right: 20px;
}

.prev-btn {
  left: 20px;
}

.next-btn {
  right: 20px;
}

.media-container {
  max-width: 90%;
  max-height: 90%;
}

.lightbox-media {
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 8px;
}
</style>
