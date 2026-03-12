// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Hero from '../pages/Hero.vue';
import Photography from '../pages/Photography.vue';
import MediaGallery from '../pages/MediaGallery.vue';
import Videography from '../pages/Videography.vue';
import Enquiries from '../pages/Enquries.vue';

const routes = [
  {
    path: '/',  // ← This should show Hero
    component: Hero
  },
  {
    path: '/photography',
    component: Photography
  },
  
  {
    path: '/gallery',
    component: MediaGallery
  },
  {
    path:'/videography',
    component: Videography
  },
  {
    path:'/enquiries',
    component: Enquiries
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
  