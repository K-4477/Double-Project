<template>
  <div :class="$style.slideshowcontainer">
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="30"
      :navigation="true"
      :pagination="{ clickable: true }"
      :loop="true"
      :speed="500"
      class="mySwiper"
    >
      <swiper-slide v-for="(src, index) in mediaLinks" :key="index">
        <!-- Show image if type is image -->
        <img
          v-if="type === 'image'"
          :src="src"
          :alt="`Slide ${index + 1}`"
          :class="$style.slidemedia"
        />
        
        <!-- Show video if type is video -->
        <video
          v-else
          :src="src"
          :class="$style.slidemedia"
          controls
          controlsList="nodownload"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const props = defineProps({
  jsonPath: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'image',
    validator: (value) => ['image', 'video'].includes(value)
  }
})

const BUCKET_URL = 'https://k1958-project-media.s3.eu-north-1.amazonaws.com'

const mediaLinks = ref([])
const modules = [Navigation, Pagination]

onMounted(async () => {
  const res = await fetch(`${BUCKET_URL}/data/${props.jsonPath}`)
  const data = await res.json()
  
  // Handle both "slides" and "videos" keys
  const items = data.slides || data.videos || []
  mediaLinks.value = items.map((path) => `${BUCKET_URL}/${path}`)
})
</script>

<style module>
.slideshowcontainer {
  width: 70vw;
  max-width: 1200px;
  margin: 40px auto;
}

.slidemedia {
  max-height: 75vh;
  width: 100%;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

</style>

<style>
/* Swiper navigation button styling */
.swiper-button-next,
.swiper-button-prev {
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.swiper-button-next:after,
.swiper-button-prev:after {
  font-size: 20px;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  background: rgba(0, 0, 0, 0.8);
}

/* Pagination dots styling */
.swiper-pagination-bullet {
  background: #fff;
  opacity: 0.5;
}

.swiper-pagination-bullet-active {
  opacity: 1;
  background: #667eea;
}
</style>