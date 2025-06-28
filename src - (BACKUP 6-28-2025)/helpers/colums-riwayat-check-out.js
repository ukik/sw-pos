export default [
  {
    name: "waktu",
    label: "waktu",
    field: "waktu",
    sortable: true,
  },
  {
    label: "tanggal",
    field: "tanggal",
  },
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
    label: "kasir",
    field: "cashier",
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
  // {
  //   label: "tanggal",
  //   field: "tanggal",
  // },
  // {
  //   label: "waktu",
  //   field: "waktu",
  // },
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
