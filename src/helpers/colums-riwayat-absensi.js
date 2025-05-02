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
  // {
  //   label: "nama",
  //   field: "nama",
  // },
  // {
  //   label: "cashier_id",
  //   field: "cashier_id",
  // },
  {
    label: "kasir",
    field: "cashier",
    format: (val, row) => `${val?.nama}`,
  },

  {
    label: "kas modal",
    field: "modal_awal",
    format: (val, row) => `Rp. ${val}`,
  },
  {
    label: "kas modal lama",
    field: "modal_akhir",
    format: (val, row) => `Rp. ${val}`,
  },

  {
    label: "jam mulai",
    field: "jam_mulai",
  },
  {
    label: "jam selesai",
    field: "jam_selesai",
  },
  // {
  //   label: "foto",
  //   field: "foto",
  // },
  // {
  //   label: "catatan masuk",
  //   field: "catatan_masuk",
  // },
  // {
  //   label: "catatan pulang",
  //   field: "catatan_pulang",
  // },
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
