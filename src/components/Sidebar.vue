<template>
  <aside class="sidebar">
    <div class="logo">
      <div class="logo-icon">I</div>

      <div>
        <h2>Inventory</h2>
        <span>Management</span>
      </div>
    </div>

    <nav>
      <RouterLink to="/dashboard" class="menu-item">
        <span>▦</span>
        Dashboard
      </RouterLink>

      <RouterLink to="/products" class="menu-item">
        <span>□</span>
        Barang
      </RouterLink>

      <a href="#" class="menu-item">
        <span>▤</span>
        Kategori
      </a>

      <a href="#" class="menu-item">
        <span>◫</span>
        Laporan
      </a>
    </nav>

    <div class="sidebar-bottom">
      <a href="#" class="menu-item">
        <span>⚙</span>
        Pengaturan
      </a>
    </div>
  </aside>
</template>