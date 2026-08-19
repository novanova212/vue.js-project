<template>
  <div class="layout">

    <Sidebar />

    <main class="main-content">

      <Header title="Dashboard" />

      <section class="dashboard-content">

        <!-- STATISTICS -->

        <div class="stats-grid">

          <StatCard
            title="Total Barang"
            :value="totalBarang"
            description="Jumlah seluruh barang"
            icon="📦"
          />

          <StatCard
            title="Barang Masuk"
            :value="barangMasuk"
            description="Bulan ini"
            icon="↓"
          />

          <StatCard
            title="Barang Keluar"
            :value="barangKeluar"
            description="Bulan ini"
            icon="↑"
          />

          <StatCard
            title="Stok Rendah"
            :value="stokRendah"
            description="Perlu diperiksa"
            icon="!"
          />

        </div>


        <!-- TABLE -->

        <ProductTable
          :products="products"
        />

      </section>

    </main>

  </div>
</template>


<script setup>

import { ref } from "vue";

import Sidebar from "../components/Sidebar.vue";
import Header from "../components/Header.vue";
import StatCard from "../components/StatCard.vue";
import ProductTable from "../components/ProductTable.vue";

import { useProductStore } from "../stores/productStore";


/*
|--------------------------------------------------------------------------
| PRODUCT STORE
|--------------------------------------------------------------------------
*/

const {
  products,
  totalBarang,
  stokRendah,
} = useProductStore();


/*
|--------------------------------------------------------------------------
| DUMMY STATISTICS
|--------------------------------------------------------------------------
*/

const barangMasuk = ref(35);

const barangKeluar = ref(12);

</script>