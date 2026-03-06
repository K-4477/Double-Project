<!-- src/components/MediaCard.vue -->
<!-- Individual media card component -->
<template>
  <div 
    class="media-card"
    :style="{ animationDelay: `${index * 0.05}s` }"
    @click="$emit('click')"
  >
    <img
      v-if="item.category === 'image'"
      :src="item.url"
      :alt="item.fileName"
      class="media-content"
    />
    <video
      v-else
      :src="item.url"
      class="media-content"
    />
    
    <div class="media-info">
      <div class="media-type">
        <component :is="item.category === 'image' ? Image : Video" :size="16" />
        <span>{{ item.category }}</span>
      </div>
      <div class="media-filename">
        {{ item.fileName }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { Image, Video } from 'lucide-vue-next';

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
});

defineEmits(['click']);
</script>

<style scoped>
.media-card {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(30, 30, 45, 0.6);
  border: 1px solid rgba(16, 185, 129, 0.2);
  aspect-ratio: 16/9;
}

.media-card:hover {
  transform: translateY(-8px);
  border-color: rgba(16, 185, 129, 0.6);
  box-shadow: 0 20px 40px rgba(16, 185, 129, 0.2);
}

.media-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(16, 185, 129, 0) 0%,
    rgba(16, 185, 129, 0.1) 100%
  );
  opacity: 0;
  transition: opacity 0.3s;
}

.media-card:hover::before {
  opacity: 1;
}

.media-card:hover .media-info {
  transform: translateY(0);
}

.media-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.media-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  transform: translateY(100%);
  transition: transform 0.3s;
}

.media-type {
  font-size: 14px;
  color: #10b981;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.media-filename {
  font-size: 12px;
  color: rgba(224, 224, 224, 0.8);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
