<template>
  <div class="layout">

    <Sidebar />

    <main class="main-content">

      <Header title="Barang" />

      <section class="dashboard-content">

        <!-- HEADER HALAMAN -->
        <div class="page-actions">

          <div>
            <h2>Daftar Barang</h2>
            <p>Kelola seluruh barang yang tersedia.</p>
          </div>

          <button class="primary-button" @click="bukaTambah">
            + Tambah Barang
          </button>

        </div>


        <!-- SEARCH & FILTER -->
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


        <!-- JUMLAH DATA -->
        <div class="result-info">
          Menampilkan {{ filteredProducts.length }} barang
        </div>


        <!-- PRODUCTS -->
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


            <!-- ACTION -->
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
                @click="hapusProduk(product.id)"
              >
                Hapus
              </button>

            </div>

          </div>

        </div>


        <!-- EMPTY -->
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


    <!-- ========================= -->
    <!-- MODAL FORM -->
    <!-- ========================= -->

    <div
      v-if="showForm"
      class="modal-overlay"
      @click.self="tutupForm"
    >

      <div class="modal">

        <div class="modal-header">

          <div>
            <h2>
              {{ editingProduct ? "Edit Barang" : "Tambah Barang" }}
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
              {{ editingProduct ? "Simpan Perubahan" : "Tambah Barang" }}
            </button>

          </div>

        </form>

      </div>

    </div>


    <!-- ========================= -->
    <!-- MODAL DETAIL -->
    <!-- ========================= -->

    <div
      v-if="selectedProduct"
      class="modal-overlay"
      @click.self="selectedProduct = null"
    >

      <div class="modal detail-modal">

        <div class="modal-header">

          <div>
            <h2>Detail Barang</h2>
            <p>Informasi lengkap produk.</p>
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
              <span>Harga</span>
              <strong>
                Rp {{ selectedProduct.harga.toLocaleString("id-ID") }}
              </strong>
            </div>

            <div>
              <span>Stok</span>
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


/*
|--------------------------------------------------------------------------
| DATA BARANG
|--------------------------------------------------------------------------
*/

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
    nama: "Kursi Kantor",
    kategori: "Furniture",
    stok: 15,
    harga: 1500000,
  },

]);


/*
|--------------------------------------------------------------------------
| SEARCH
|--------------------------------------------------------------------------
*/

const search = ref("");

const kategoriFilter = ref("");


/*
|--------------------------------------------------------------------------
| FORM
|--------------------------------------------------------------------------
*/

const showForm = ref(false);

const editingProduct = ref(null);

const selectedProduct = ref(null);


const form = ref({
  nama: "",
  kategori: "",
  harga: 0,
  stok: 0,
});


/*
|--------------------------------------------------------------------------
| KATEGORI
|--------------------------------------------------------------------------
*/

const kategoriList = computed(() => {

  return [
    ...new Set(
      products.value.map(
        product => product.kategori
      )
    )
  ];

});


/*
|--------------------------------------------------------------------------
| FILTER PRODUK
|--------------------------------------------------------------------------
*/

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


/*
|--------------------------------------------------------------------------
| TAMBAH
|--------------------------------------------------------------------------
*/

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


/*
|--------------------------------------------------------------------------
| EDIT
|--------------------------------------------------------------------------
*/

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


/*
|--------------------------------------------------------------------------
| SIMPAN
|--------------------------------------------------------------------------
*/

function simpanProduk() {

  if (editingProduct.value) {

    editingProduct.value.nama =
      form.value.nama;

    editingProduct.value.kategori =
      form.value.kategori;

    editingProduct.value.harga =
      form.value.harga;

    editingProduct.value.stok =
      form.value.stok;

  } else {

    products.value.push({

      id:
        Date.now(),

      nama:
        form.value.nama,

      kategori:
        form.value.kategori,

      harga:
        form.value.harga,

      stok:
        form.value.stok,

    });

  }


  tutupForm();

}


/*
|--------------------------------------------------------------------------
| TUTUP FORM
|--------------------------------------------------------------------------
*/

function tutupForm() {

  showForm.value = false;

  editingProduct.value = null;

}


/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
*/

function hapusProduk(id) {

  products.value =
    products.value.filter(
      product =>
        product.id !== id
    );

}


/*
|--------------------------------------------------------------------------
| DETAIL
|--------------------------------------------------------------------------
*/

function lihatDetail(product) {

  selectedProduct.value = product;

}

</script><template>
  <div class="layout">

    <Sidebar />

    <main class="main-content">

      <Header title="Barang" />

      <section class="dashboard-content">

        <!-- HEADER -->
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


        <!-- SEARCH & FILTER -->
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


        <!-- JUMLAH HASIL -->
        <div class="result-info">
          Menampilkan {{ filteredProducts.length }} barang
        </div>


        <!-- PRODUCTS -->
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


            <!-- ACTION -->
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


        <!-- EMPTY STATE -->
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


    <!-- ================================= -->
    <!-- MODAL TAMBAH / EDIT -->
    <!-- ================================= -->

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


    <!-- ================================= -->
    <!-- MODAL DETAIL -->
    <!-- ================================= -->

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


/*
|--------------------------------------------------------------------------
| PRODUCT STORE
|--------------------------------------------------------------------------
*/

const {
  products,
  tambahProduk,
  editProduk,
  hapusProduk,
} = useProductStore();


/*
|--------------------------------------------------------------------------
| SEARCH & FILTER
|--------------------------------------------------------------------------
*/

const search = ref("");

const kategoriFilter = ref("");


/*
|--------------------------------------------------------------------------
| MODAL STATE
|--------------------------------------------------------------------------
*/

const showForm = ref(false);

const editingProduct = ref(null);

const selectedProduct = ref(null);


/*
|--------------------------------------------------------------------------
| FORM
|--------------------------------------------------------------------------
*/

const form = ref({
  nama: "",
  kategori: "",
  harga: 0,
  stok: 0,
});


/*
|--------------------------------------------------------------------------
| KATEGORI
|--------------------------------------------------------------------------
*/

const kategoriList = computed(() => {

  return [
    ...new Set(
      products.value.map(
        product => product.kategori
      )
    ),
  ];

});


/*
|--------------------------------------------------------------------------
| FILTER PRODUK
|--------------------------------------------------------------------------
*/

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


/*
|--------------------------------------------------------------------------
| TAMBAH
|--------------------------------------------------------------------------
*/

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


/*
|--------------------------------------------------------------------------
| EDIT
|--------------------------------------------------------------------------
*/

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


/*
|--------------------------------------------------------------------------
| SIMPAN
|--------------------------------------------------------------------------
*/

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


/*
|--------------------------------------------------------------------------
| TUTUP FORM
|--------------------------------------------------------------------------
*/

function tutupForm() {

  showForm.value = false;

  editingProduct.value = null;

}


/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
*/

function hapusProdukDariList(id) {

  hapusProduk(id);

}


/*
|--------------------------------------------------------------------------
| DETAIL
|--------------------------------------------------------------------------
*/

function lihatDetail(product) {

  selectedProduct.value = product;

}

</script>