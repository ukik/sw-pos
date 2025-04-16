const routes = [
  {
    path: '/',
    component: () => import ('layouts/MainLayout.vue'),
    redirect: {
      name: 'penjualan',
    },
    children: [
      {
        meta: {
          title: 'penjualan',
        },
        path: 'penjualan',
        name: 'penjualan',
        component: () => import ('pages/PenjualanPage.vue'),
      },
      {
        meta: {
          title: 'pengiriman',
        },
        path: 'pengiriman',
        name: 'pengiriman',
        component: () => import ('pages/PengirimanPage.vue'),
      },
      {
        meta: {
          title: 'mutasi',
        },
        path: 'mutasi',
        name: 'mutasi',
        component: () => import ('pages/MutasiPage.vue'),
      },
      {
        meta: {
          title: 'check buka',
        },
        path: 'check-in',
        name: 'check-in',
        component: () => import ('pages/CheckInPage.vue'),
      },
      {
        meta: {
          title: 'check tutup',
        },
        path: 'check-out',
        name: 'check-out',
        component: () => import ('pages/IndexPage.vue'),
      },
      {
        meta: {
          title: 'check rotasi',
        },
        path: 'check-rotasi',
        name: 'check-rotasi',
        component: () => import ('pages/IndexPage.vue'),
      },





      {
        meta: {
          title: 'riwayat penjualan',
        },
        path: 'riwayat-penjualan',
        name: 'riwayat_penjualan',
        component: () => import ('pages/RiwayatPenjualanPage.vue'),
      },
      {
        meta: {
          title: 'riwayat pengiriman',
        },
        path: 'riwayat-pengiriman',
        name: 'riwayat_pengiriman',
        component: () => import ('pages/RiwayatPengirimanPage.vue'),
      },








      {
        meta: {
          title: 'generate',
        },
        path: 'generate',
        name: 'generate',
        component: () => import ('pages/InvoicePenjualanPage.vue'),
      },

    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import ('pages/ErrorNotFound.vue'),
  },
];

export default routes;
