<template>
  <div class="layout">

    <Sidebar />

    <main class="main-content">

      <Header title="Barang" />

      <section class="dashboard-content">

        <!-- HEADER -->

        <div class="page-actions">

          <div>
            <h2>Daftar Barang</h2>

            <p>
              Kelola seluruh barang yang tersedia.
            </p>
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


        <div class="result-info">

          Menampilkan
          {{ filteredProducts.length }}
          barang

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
                Rp
                {{ product.harga.toLocaleString("id-ID") }}
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
                @click="bukaKonfirmasiHapus(product)"
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

          <h3>
            Barang tidak ditemukan
          </h3>

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
                  selectedProduct.harga
                    .toLocaleString("id-ID")
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


    <!-- ================================= -->
    <!-- MODAL KONFIRMASI HAPUS -->
    <!-- ================================= -->

    <div
      v-if="productToDelete"
      class="modal-overlay"
      @click.self="batalHapus"
    >

      <div class="modal confirm-modal">

        <div class="confirm-icon">
          !
        </div>


        <h2>
          Yakin ingin menghapus?
        </h2>


        <p>
          Kamu akan menghapus barang:
        </p>


        <strong class="confirm-product-name">
          {{ productToDelete.nama }}
        </strong>


        <p class="confirm-warning">
          Data yang sudah dihapus tidak dapat dikembalikan.
        </p>


        <div class="form-actions">

          <button
            class="cancel-button"
            @click="batalHapus"
          >
            Batal
          </button>


          <button
            class="delete-confirm-button"
            @click="konfirmasiHapus"
          >
            Ya, Hapus
          </button>

        </div>

      </div>

    </div>


    <!-- ================================= -->
    <!-- TOAST -->
    <!-- ================================= -->

    <Toast
      :show="toast.show"
      :title="toast.title"
      :message="toast.message"
      :type="toast.type"
      @close="toast.show = false"
    />

  </div>
</template>


<script setup>

import { ref, computed } from "vue";

import Sidebar from "../components/Sidebar.vue";
import Header from "../components/Header.vue";
import Toast from "../components/Toast.vue";

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
| SEARCH
|--------------------------------------------------------------------------
*/

const search = ref("");

const kategoriFilter = ref("");


/*
|--------------------------------------------------------------------------
| MODAL
|--------------------------------------------------------------------------
*/

const showForm = ref(false);

const editingProduct = ref(null);

const selectedProduct = ref(null);


/*
|--------------------------------------------------------------------------
| KONFIRMASI DELETE
|--------------------------------------------------------------------------
*/

const productToDelete = ref(null);


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
| TOAST
|--------------------------------------------------------------------------
*/

const toast = ref({

  show: false,

  title: "",

  message: "",

  type: "success",

});


function showToast(
  message,
  title = "Berhasil",
  type = "success"
) {

  toast.value = {

    show: true,

    title,

    message,

    type,

  };


  setTimeout(() => {

    toast.value.show = false;

  }, 3000);

}


/*
|--------------------------------------------------------------------------
| KATEGORI
|--------------------------------------------------------------------------
*/

const kategoriList = computed(() => {

  return [

    ...new Set(

      products.value.map(

        product =>
          product.kategori

      )

    ),

  ];

});


/*
|--------------------------------------------------------------------------
| FILTER
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

      product.kategori ===
        kategoriFilter.value;


    return (

      cocokNama &&
      cocokKategori

    );

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


    showToast(

      "Data barang berhasil diperbarui."

    );

  } else {

    tambahProduk(

      form.value

    );


    showToast(

      "Barang baru berhasil ditambahkan."

    );

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
| BUKA KONFIRMASI HAPUS
|--------------------------------------------------------------------------
*/

function bukaKonfirmasiHapus(product) {

  productToDelete.value = product;

}


/*
|--------------------------------------------------------------------------
| BATAL HAPUS
|--------------------------------------------------------------------------
*/

function batalHapus() {

  productToDelete.value = null;

}


/*
|--------------------------------------------------------------------------
| KONFIRMASI HAPUS
|--------------------------------------------------------------------------
*/

function konfirmasiHapus() {

  if (!productToDelete.value) {
    return;
  }


  const productName =
    productToDelete.value.nama;


  hapusProduk(
    productToDelete.value.id
  );


  productToDelete.value = null;


  showToast(
    `${productName} berhasil dihapus.`
  );

}


/*
|--------------------------------------------------------------------------
| DETAIL
|--------------------------------------------------------------------------
*/

function lihatDetail(product) {

  selectedProduct.value =
    product;

}

</script>


<style scoped>

.confirm-modal {
  text-align: center;
  max-width: 420px;
}

.confirm-icon {
  width: 55px;
  height: 55px;

  margin: 0 auto 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #fef3c7;

  color: #92400e;

  font-size: 28px;

  font-weight: bold;
}

.confirm-modal h2 {
  margin-bottom: 10px;
}

.confirm-modal p {
  color: #6b7280;
  margin: 6px 0;
}

.confirm-product-name {
  display: block;

  margin: 12px 0;

  font-size: 18px;
}

.confirm-warning {
  font-size: 13px;

  margin-bottom: 25px !important;
}

.delete-confirm-button {
  border: none;

  padding: 10px 18px;

  border-radius: 8px;

  background: #dc2626;

  color: white;

  cursor: pointer;

  font-weight: 600;
}

.delete-confirm-button:hover {
  background: #b91c1c;
}

</style>