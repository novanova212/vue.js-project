<template>
  <header class="header">
    <div>
      <h1>{{ title }}</h1>
      <p>Selamat datang kembali di Inventory Management.</p>
    </div>

    <div class="user-area">
      <button class="notification">
        🔔
      </button>

      <div class="avatar">
        N
      </div>

      <div class="user-info">
        <strong>Nayaka</strong>
        <span>Administrator</span>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "Dashboard",
  },
});
</script>