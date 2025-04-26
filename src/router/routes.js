const INDEX = () => import('pages/IndexPage.vue')

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: {
      name: 'penjualan',
    },
    children: [
      {
        meta: {
          title: 'absensi',
        },
        path: 'absensi',
        name: 'absensi',
        components: {
          default: () => import('pages/AbsensiPage.vue'),
          index: INDEX
        },
      },

      {
        meta: {
          title: 'penjualan',
        },
        path: 'penjualan',
        name: 'penjualan',
        components: {
          default: () => import('pages/PenjualanPage.vue'),
          index: INDEX
        }
      },
      {
        meta: {
          title: 'pengiriman',
        },
        path: 'pengiriman',
        name: 'pengiriman',
        components: {
          default: () => import('pages/PengirimanPage.vue'),
          index: INDEX
        }
      },
      {
        meta: {
          title: 'mutasi',
        },
        path: 'mutasi',
        name: 'mutasi',
        components: {
          default: () => import('pages/MutasiPage.vue'),
          index: INDEX
        }
      },
      {
        meta: {
          title: 'cek buka',
        },
        path: 'check-in',
        name: 'check-in',
        components: {
          default: () => import('pages/CheckInPage.vue'),
          index: INDEX
        }
      },
      {
        meta: {
          title: 'cek tutup',
        },
        path: 'check-out',
        name: 'check-out',
        components: {
          default: () => import('pages/CheckOutPage.vue'),
          index: INDEX
        }
      },
      {
        meta: {
          title: 'cek rotasi',
        },
        path: 'check-rotasi',
        name: 'check-rotasi',
        components: {
          default: () => import('pages/CheckRotasiPage.vue'),
          index: INDEX
        }
      },

      {
        meta: {
          title: 'saldo',
        },
        path: 'balance',
        name: 'balance',
        components: {
          default: () => import('pages/BalancePage.vue'),
          index: INDEX
        }
      },



      {
        meta: {
          title: 'pengaturan produk',
        },
        path: 'pengaturan-produk',
        name: 'pengaturan_produk',
        components: {
          default: () => import('pages/PengaturanProdukPage.vue'),
          index: INDEX
        }
      },

      {
        meta: {
          title: 'pengaturan kasir',
        },
        path: 'pengaturan-kasir',
        name: 'pengaturan_kasir',
        components: {
          default: () => import('pages/PengaturanCashierPage.vue'),
          index: INDEX
        }
      },

      {
        meta: {
          title: 'pengaturan kurir',
        },
        path: 'pengaturan-kurir',
        name: 'pengaturan_kurir',
        components: {
          default: () => import('pages/PengaturanCourirPage.vue'),
          index: INDEX
        }
      },

      // {
      //   meta: {
      //     title: 'pengaturan shift',
      //   },
      //   path: 'pengaturan-shift',
      //   name: 'pengaturan_shift',
      //   components: {
      //     default: () => import('pages/PengaturanShiftPage.vue'),
      //     index: INDEX
      //   }
      // },
      // {
      //   meta: {
      //     title: 'pengaturan outlet',
      //   },
      //   path: 'pengaturan-outlet',
      //   name: 'pengaturan_outlet',
      //   components: {
      //     default: () => import('pages/PengaturanOutletPage.vue'),
      //     index: INDEX
      //   }
      // },

      {
        meta: {
          title: 'pengaturan outlet',
        },
        path: 'pengaturan-outlet',
        name: 'pengaturan_outlet',
        components: {
          default: () => import('pages/PengaturanOutletPage.vue'),
          index: INDEX
        }
      },





      {
        meta: {
          title: 'riwayat penjualan',
        },
        path: 'riwayat-penjualan',
        name: 'riwayat_penjualan',
        components: {
          default: () => import('pages/RiwayatPenjualanPage.vue'),
          index: INDEX
        }
      },
      {
        meta: {
          title: 'riwayat absensi',
        },
        path: 'riwayat-absensi',
        name: 'riwayat_absensi',
        components: {
          default: () => import('pages/RiwayatAbsensiPage.vue'),
          index: INDEX
        }
      },
      {
        meta: {
          title: 'riwayat saldo',
        },
        path: 'riwayat-balance',
        name: 'riwayat_balance',
        components: {
          default: () => import('pages/RiwayatBalancePage.vue'),
          index: INDEX
        }
      },




      {
        meta: {
          title: 'riwayat pengiriman',
        },
        path: 'riwayat-pengiriman',
        name: 'riwayat_pengiriman',
        components: {
          default: () => import('pages/RiwayatPengirimanPage.vue'),
          index: INDEX
        }
      },
      {
        meta: {
          title: 'riwayat mutasi',
        },
        path: 'riwayat-mutasi',
        name: 'riwayat_mutasi',
        components: {
          default: () => import('pages/RiwayatMutasiPage.vue'),
          index: INDEX
        }
      },
      {
        meta: {
          title: 'riwayat cek buka',
        },
        path: 'riwayat-checkin',
        name: 'riwayat_checkin',
        components: {
          default: () => import('pages/RiwayatCheckInPage.vue'),
          index: INDEX
        }
      },
      {
        meta: {
          title: 'riwayat cek tutup',
        },
        path: 'riwayat-checkout',
        name: 'riwayat_checkout',
        components: {
          default: () => import('pages/RiwayatCheckOutPage.vue'),
          index: INDEX
        }
      },
      {
        meta: {
          title: 'riwayat cek rotasi',
        },
        path: 'riwayat-rotasi',
        name: 'riwayat_rotasi',
        components: {
          default: () => import('pages/RiwayatCheckRotasiPage.vue'),
          index: INDEX
        }
      },


      // {
      //   meta: {
      //     title: 'generate',
      //   },
      //   path: 'generate',
      //   name: 'generate',
      //   component: () => import ('pages/InvoicePenjualanPage.vue'),
      // },

      {
        meta: {
          title: 'camera',
        },
        path: 'camera',
        name: 'camera',
        component: () => import ('pages/CameraPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
