<template>
  <div class="layout">
    <Sidebar />

    <main class="main-content">
      <Header title="Dashboard" />

      <section class="dashboard-content">

        <div class="stats-grid">

          <StatCard
            title="Total Barang"
            :value="totalBarang"
            description="+12% dari bulan lalu"
            icon="📦"
          />

          <StatCard
            title="Barang Masuk"
            :value="barangMasuk"
            description="+8% dari bulan lalu"
            icon="↓"
          />

          <StatCard
            title="Barang Keluar"
            :value="barangKeluar"
            description="-3% dari bulan lalu"
            icon="↑"
          />

          <StatCard
            title="Stok Rendah"
            :value="stokRendah"
            description="Perlu segera diperiksa"
            icon="!"
          />

        </div>

        <ProductTable :products="products" />

      </section>
    </main>
  </div>
</template>

<script setup>
import Sidebar from "../components/Sidebar.vue";
import Header from "../components/Header.vue";
import StatCard from "../components/StatCard.vue";
import ProductTable from "../components/ProductTable.vue";

import { ref, computed } from "vue";

const products = ref([
  {
    id: 1,
    nama: "Keyboard Mechanical",
    kategori: "Elektronik",
    stok: 25,
    harga: 350000,
  },
  {
    id: 2,
    nama: "Mouse Wireless",
    kategori: "Elektronik",
    stok: 40,
    harga: 175000,
  },
  {
    id: 3,
    nama: "Monitor 24 Inch",
    kategori: "Elektronik",
    stok: 8,
    harga: 2200000,
  },
  {
    id: 4,
    nama: "Kabel HDMI",
    kategori: "Aksesoris",
    stok: 5,
    harga: 75000,
  },
  {
    id: 5,
    nama: "Webcam",
    kategori: "Elektronik",
    stok: 18,
    harga: 450000,
  },
]);

const totalBarang = computed(() => products.value.length);

const stokRendah = computed(() => {
  return products.value.filter(product => product.stok <= 10).length;
});

const barangMasuk = ref(35);

const barangKeluar = ref(12);
</script>