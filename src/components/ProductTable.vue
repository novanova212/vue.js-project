<template>
  <div class="table-card">
    <div class="table-header">
      <div>
        <h2>Barang Terbaru</h2>
        <p>Daftar barang yang tersedia di gudang.</p>
      </div>

      <RouterLink to="/products" class="view-all">
        Lihat Semua
      </RouterLink>
    </div>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Barang</th>
            <th>Kategori</th>
            <th>Stok</th>
            <th>Harga</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>
              <strong>{{ product.nama }}</strong>
            </td>

            <td>{{ product.kategori }}</td>

            <td>{{ product.stok }}</td>

            <td>
              Rp {{ product.harga.toLocaleString("id-ID") }}
            </td>

            <td>
              <span
                class="status"
                :class="product.stok > 10 ? 'status-active' : 'status-warning'"
              >
                {{ product.stok > 10 ? "Tersedia" : "Stok Rendah" }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  products: {
    type: Array,
    required: true,
  },
});
</script>