import { createRouter, createWebHistory } from 'vue-router'
import Overview from '../pages/Overview.vue'
import Products from '../pages/Products.vue'
import Orders from '../pages/Orders.vue'
import Settings from '../pages/Settings.vue'

const routes = [
  { path: '/', component: Overview },
  { path: '/products', component: Products },
  { path: '/orders', component: Orders },
  { path: '/settings', component: Settings },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})