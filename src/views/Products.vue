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

          <button
            class="primary-button"
            @click="bukaTambah"
          >
            + Tambah Barang
          </button>

        </div>


        <div class="filter-bar">

          <input
            v-model="search"
            type="text"
            placeholder="Cari nama barang..."
          />

          <select v-model="kategoriFilter">

            <option value="">
              Semua Kategori
            </option>

            <option
              v-for="kategori in kategoriList"
              :key="kategori"
              :value="kategori"
            >
              {{ kategori }}
            </option>

          </select>

        </div>


        <div class="result-info">
          Menampilkan {{ filteredProducts.length }} barang
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

              <h3>
                {{ product.nama }}
              </h3>

              <span>
                {{ product.kategori }}
              </span>

              <strong>
                Rp {{ product.harga.toLocaleString("id-ID") }}
              </strong>

              <small>
                Stok: {{ product.stok }}
              </small>

              <span
                class="status"
                :class="
                  product.stok <= 10
                    ? 'status-warning'
                    : 'status-active'
                "
              >
                {{
                  product.stok <= 10
                    ? "Stok Rendah"
                    : "Tersedia"
                }}
              </span>

            </div>


            <div class="product-actions">

              <button
                class="detail-button"
                @click="lihatDetail(product)"
              >
                Detail
              </button>

              <button
                class="edit-button"
                @click="bukaEdit(product)"
              >
                Edit
              </button>

              <button
                class="delete-button"
                @click="hapusProdukDariList(product.id)"
              >
                Hapus
              </button>

            </div>

          </div>

        </div>


        <div
          v-if="filteredProducts.length === 0"
          class="empty-state"
        >
          <h3>Barang tidak ditemukan</h3>

          <p>
            Coba gunakan kata pencarian atau kategori lain.
          </p>
        </div>

      </section>

    </main>


    <!-- MODAL TAMBAH / EDIT -->

    <div
      v-if="showForm"
      class="modal-overlay"
      @click.self="tutupForm"
    >

      <div class="modal">

        <div class="modal-header">

          <div>

            <h2>
              {{
                editingProduct
                  ? "Edit Barang"
                  : "Tambah Barang"
              }}
            </h2>

            <p>
              {{
                editingProduct
                  ? "Ubah informasi barang."
                  : "Masukkan informasi barang baru."
              }}
            </p>

          </div>

          <button
            class="close-button"
            @click="tutupForm"
          >
            ×
          </button>

        </div>


        <form @submit.prevent="simpanProduk">

          <div class="form-group">

            <label>
              Nama Barang
            </label>

            <input
              v-model="form.nama"
              type="text"
              placeholder="Contoh: Keyboard Mechanical"
              required
            />

          </div>


          <div class="form-group">

            <label>
              Kategori
            </label>

            <select
              v-model="form.kategori"
              required
            >

              <option value="">
                Pilih kategori
              </option>

              <option value="Elektronik">
                Elektronik
              </option>

              <option value="Aksesoris">
                Aksesoris
              </option>

              <option value="Furniture">
                Furniture
              </option>

            </select>

          </div>


          <div class="form-row">

            <div class="form-group">

              <label>
                Harga
              </label>

              <input
                v-model.number="form.harga"
                type="number"
                placeholder="350000"
                required
              />

            </div>


            <div class="form-group">

              <label>
                Stok
              </label>

              <input
                v-model.number="form.stok"
                type="number"
                placeholder="20"
                required
              />

            </div>

          </div>


          <div class="form-actions">

            <button
              type="button"
              class="cancel-button"
              @click="tutupForm"
            >
              Batal
            </button>

            <button
              type="submit"
              class="primary-button"
            >
              {{
                editingProduct
                  ? "Simpan Perubahan"
                  : "Tambah Barang"
              }}
            </button>

          </div>

        </form>

      </div>

    </div>


    <!-- MODAL DETAIL -->

    <div
      v-if="selectedProduct"
      class="modal-overlay"
      @click.self="selectedProduct = null"
    >

      <div class="modal detail-modal">

        <div class="modal-header">

          <div>

            <h2>
              Detail Barang
            </h2>

            <p>
              Informasi lengkap produk.
            </p>

          </div>

          <button
            class="close-button"
            @click="selectedProduct = null"
          >
            ×
          </button>

        </div>


        <div class="detail-content">

          <div class="detail-icon">
            📦
          </div>

          <h2>
            {{ selectedProduct.nama }}
          </h2>

          <span class="detail-category">
            {{ selectedProduct.kategori }}
          </span>


          <div class="detail-grid">

            <div>

              <span>
                Harga
              </span>

              <strong>
                Rp
                {{
                  selectedProduct.harga.toLocaleString("id-ID")
                }}
              </strong>

            </div>


            <div>

              <span>
                Stok
              </span>

              <strong>
                {{ selectedProduct.stok }}
              </strong>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>


<script setup>

import { ref, computed } from "vue";

import Sidebar from "../components/Sidebar.vue";
import Header from "../components/Header.vue";

import { useProductStore } from "../stores/productStore";


const {
  products,
  tambahProduk,
  editProduk,
  hapusProduk,
} = useProductStore();


const search = ref("");

const kategoriFilter = ref("");

const showForm = ref(false);

const editingProduct = ref(null);

const selectedProduct = ref(null);


const form = ref({
  nama: "",
  kategori: "",
  harga: 0,
  stok: 0,
});


const kategoriList = computed(() => {

  return [
    ...new Set(
      products.value.map(
        product => product.kategori
      )
    ),
  ];

});


const filteredProducts = computed(() => {

  return products.value.filter(product => {

    const cocokNama =
      product.nama
        .toLowerCase()
        .includes(
          search.value.toLowerCase()
        );


    const cocokKategori =
      !kategoriFilter.value ||
      product.kategori === kategoriFilter.value;


    return cocokNama && cocokKategori;

  });

});


function bukaTambah() {

  editingProduct.value = null;

  form.value = {
    nama: "",
    kategori: "",
    harga: 0,
    stok: 0,
  };

  showForm.value = true;

}


function bukaEdit(product) {

  editingProduct.value = product;

  form.value = {
    nama: product.nama,
    kategori: product.kategori,
    harga: product.harga,
    stok: product.stok,
  };

  showForm.value = true;

}


function simpanProduk() {

  if (editingProduct.value) {

    editProduk(
      editingProduct.value.id,
      form.value
    );

  } else {

    tambahProduk(form.value);

  }

  tutupForm();

}


function tutupForm() {

  showForm.value = false;

  editingProduct.value = null;

}


function hapusProdukDariList(id) {

  hapusProduk(id);

}


function lihatDetail(product) {

  selectedProduct.value = product;

}

</script>