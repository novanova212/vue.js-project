<template>
  <div class="layout">

    <Sidebar />

    <main class="main-content">

      <Header title="Barang" />

      <section class="dashboard-content">

        <div class="page-actions">

          <div>
            <h2>Daftar Barang</h2>
            <p>Kelola seluruh barang yang tersedia.</p>
          </div>

          <button class="primary-button" @click="tambahProduk">
            + Tambah Barang
          </button>

        </div>

        <div class="search-box">

          <input
            v-model="search"
            type="text"
            placeholder="Cari nama barang..."
          />

        </div>

        <div class="products-grid">

          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="product-card"
          >

            <div class="product-icon">
              📦
            </div>

            <div class="product-info">

              <h3>{{ product.nama }}</h3>

              <span>{{ product.kategori }}</span>

              <strong>
                Rp {{ product.harga.toLocaleString("id-ID") }}
              </strong>

              <small>
                Stok: {{ product.stok }}
              </small>

            </div>

            <div class="product-actions">

              <button
                class="detail-button"
                @click="lihatDetail(product)"
              >
                Detail
              </button>

              <button
                class="delete-button"
                @click="hapusProduk(product.id)"
              >
                Hapus
              </button>

            </div>

          </div>

        </div>

      </section>

    </main>

  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import Sidebar from "../components/Sidebar.vue";
import Header from "../components/Header.vue";

const search = ref("");

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
]);

const filteredProducts = computed(() => {
  return products.value.filter(product =>
    product.nama
      .toLowerCase()
      .includes(search.value.toLowerCase())
  );
});

function tambahProduk() {
  products.value.push({
    id: products.value.length + 1,
    nama: "Laptop Baru",
    kategori: "Elektronik",
    stok: 15,
    harga: 7500000,
  });
}

function hapusProduk(id) {
  products.value = products.value.filter(
    product => product.id !== id
  );
}

function lihatDetail(product) {
  alert(
    `${product.nama}\nStok: ${product.stok}\nHarga: Rp ${product.harga.toLocaleString("id-ID")}`
  );
}
</script>