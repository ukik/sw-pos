export default [
  {
    label: "id",
    field: "id",
  },
  {
    label: "code",
    field: "code",
  },
  {
    label: "cabang",
    field: "cabang",
    format: (val, row) => `${val?.nama}`,
  },
  // {
  //   label: "tipe",
  //   field: "type",
  // },
  {
    label: "kasir pemberi",
    field: "cashier_pemberi",
    format: (val, row) => `${val?.nama}`,
  },
  {
    label: "kasir penerima",
    field: "cashier_penerima",
    format: (val, row) => `${val?.nama}`,
  },
  // {
  //   label: "status",
  //   field: "status",
  // },
  {
    label: "stok akhir",
    field: "stok_akhir",
    format: (val, row) => `${val} kg`,
  },
  {
    label: "stok awal",
    field: "stok_awal",
    format: (val, row) => `${val} kg`,
  },
  {
    label: "kuantitas",
    field: "qty",
    format: (val, row) => `${val} kg`,
  },
  {
    label: "kasir pemberi konfirmasi",
    field: "cashier_1_confirm",
    format: (val, row) => `${val ? 'Setuju' : 'Tidak Setuju'}`,
  },
  {
    label: "kasir penerima konfirmasi",
    field: "cashier_2_confirm",
    format: (val, row) => `${val ? 'Setuju' : 'Tidak Setuju'}`,
  },
  {
    label: "item",
    field: "items",
    format: (val, row) => `${val?.length} item`,
  },
  // {
  //   label: "catatan",
  //   field: "catatan",
  // },
  {
    label: "kasir konfirmasi",
    field: "cashier_confirm",
    format: (val, row) => `${val ? 'Setuju' : 'Tidak Setuju'}`,
  },
  {
    label: "tanggal",
    field: "tanggal",
  },
  {
    label: "waktu",
    field: "waktu",
  },
  // {
  //   label: "created_at",
  //   field: "created_at",
  // },
  {
    label: "latitude",
    field: "latitude",
  },
  {
    label: "longitude",
    field: "longitude",
  }
]
