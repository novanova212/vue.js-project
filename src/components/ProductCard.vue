<script setup>
defineProps({
  nama: String,
  harga: Number
})
</script>

<template>
  <div>
    <h2>{{ nama }}</h2>
    <p>Rp {{ harga }}</p>
    <button>Detail</button>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
}
</style>