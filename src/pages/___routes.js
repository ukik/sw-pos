const routes = [
  {
    path: '/',
    component: () => import ('layouts/MainLayout.vue'),
    redirect: {
      name: 'NoteApp',
    },
    children: [
      {
        meta: {
          title: 'NoteApp',
        },
        path: 'NoteApp',
        name: 'NoteApp',
        component: () => import ('pages/NoteApp.vue'),
      },


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
        component: () => import ('pages/GeneratePage.vue'),
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
