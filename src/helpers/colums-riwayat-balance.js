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
    label: "kasir",
    field: "cashier",
    format: (val, row) => `${val?.nama}`,
  },
  {
    label: "item",
    field: "items",
    format: (val, row) => `${val?.length} item`,
  },
  {
    label: "total saldo",
    field: "total_saldo",
    format: (val, row) => `Rp. ${val}`,
  },
  {
    label: "total saldo keluar",
    field: "total_keluar",
    format: (val, row) => `Rp. ${val}`,
  },
  {
    label: "total saldo masuk",
    field: "total_masuk",
    format: (val, row) => `Rp. ${val}`,
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
