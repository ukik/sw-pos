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
  {
    label: "kasir",
    field: "cashier",
    format: (val, row) => `${val?.nama}`,
  },
  // {
  //   label: "tipe",
  //   field: "type",
  // },
  // {
  //   label: "status",
  //   field: "status",
  // },
  {
    // name: "balance",
    label: "kas Sebelumnya",
    field: "balance",
    format: (val, row) => `Rp. ${val}`,

  },

  {
    label: "tagihan",
    field: "bill",
    format: (val, row) => `Rp. ${val}`,
  },
  {
    label: "tagihan pembulatan",
    field: "bill_pembulatan",
    format: (val, row) => `Rp. ${val}`,
  },
  {
    label: "dibayar",
    field: "bayar",
    format: (val, row) => `Rp. ${val}`,
  },
  {
    label: "kembalian",
    field: "change",
    format: (val, row) => `Rp. ${val}`,
  },
  {
    label: "Minus pembulatan",
    field: "change_pembulatan",
    format: (val, row) => `Rp. ${val}`,
  },
  {
    label: "kembalian aktual",
    field: "change_aktual",
    format: (val, row) => `Rp. ${val}`,
  },
  {
    label: "Kas Final",
    field: "balance_akhir",
    format: (val, row) => `Rp. ${val}`,
  },
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
  // {
  //   label: "tanggal",
  //   field: "tanggal",
  // },
  // {
  //   name: "waktu",
  //   label: "waktu",
  //   field: "waktu",
  //   sortable: true,
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
