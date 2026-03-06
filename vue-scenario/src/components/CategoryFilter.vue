<!-- src/components/CategoryFilter.vue -->
<!-- Category filtering buttons -->
<template>
  <div class="category-filter">
    <button
      v-for="category in categories"
      :key="category"
      @click="$emit('update:modelValue', category)"
      :class="['category-btn', { active: modelValue === category }]"
    >
      {{ category === 'all' ? 'All Media' : category + 's' }}
    </button>
  </div>
</template>

<script setup>
const categories = ['all', 'image', 'video'];

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.category-filter {
  display: flex;
  gap: 16px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.category-btn {
  padding: 12px 24px;
  border: 2px solid rgba(16, 185, 129, 0.3);
  background: rgba(30, 30, 45, 0.6);
  color: #10b981;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 11px;
  font-weight: 700;
  position: relative;
  overflow: hidden;
}

.category-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.2), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s;
}

.category-btn:hover::before {
  transform: translateX(100%);
}

.category-btn.active {
  background: rgba(16, 185, 129, 0.2);
  border-color: #10b981;
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
}
</style>
