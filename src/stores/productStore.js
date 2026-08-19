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
    nama: "Kursi Kantor",
    kategori: "Furniture",
    stok: 15,
    harga: 1500000,
  },
]);

const totalBarang = computed(() => {
  return products.value.length;
});

const stokRendah = computed(() => {
  return products.value.filter(
    product => product.stok <= 10
  ).length;
});

function tambahProduk(product) {
  products.value.push({
    ...product,
    id: Date.now(),
  });
}

function editProduk(id, dataBaru) {
  const product = products.value.find(
    product => product.id === id
  );

  if (!product) return;

  product.nama = dataBaru.nama;
  product.kategori = dataBaru.kategori;
  product.harga = dataBaru.harga;
  product.stok = dataBaru.stok;
}

function hapusProduk(id) {
  products.value = products.value.filter(
    product => product.id !== id
  );
}

export function useProductStore() {
  return {
    products,
    totalBarang,
    stokRendah,
    tambahProduk,
    editProduk,
    hapusProduk,
  };
}