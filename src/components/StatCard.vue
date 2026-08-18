<template>
  <div class="stat-card">
    <div class="stat-icon">
      {{ icon }}
    </div>

    <div class="stat-content">
      <span>{{ title }}</span>
      <strong>{{ value }}</strong>
      <small>{{ description }}</small>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: [String, Number],
  description: String,
  icon: String,
});
</script>