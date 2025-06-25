<template>
  <q-btn
    :label="`CETAK ${_shift} `"
    class="q-mb-md"
    color="primary"
    icon="print"
    @click="makePDFShare"
  ></q-btn>
  <table id="customers2" class="q-mb-md">
    <tbody>
      <tr>
        <td class="label_width">SHIFT</td>
        <td>{{ getAbsensi?.shift }}</td>
        <td class="label_width">MODAL AWAL</td>
        <td>Rp. {{ getModalAwal }}</td>
        <td class="label_width">PENDAPATAN</td>
        <td>Rp. {{ getPendapatan }}</td>
      </tr>
      <tr>
        <td class="label_width">KASIR</td>
        <td>{{ getAbsensi?.cashier?.nama }}</td>
        <td class="label_width">TOTAL CASH</td>
        <td>Rp. {{ getTotalCash }}</td>
        <td class="label_width">PENGELUARAN</td>
        <td>Rp. {{ getPengeluaran }}</td>
      </tr>
      <tr>
        <td colspan="3">HASIL PENJUALAN BERSIH</td>
        <td colspan="3">Rp. {{ getHasil }}</td>
      </tr>
      <tr>
        <td class="label_width">NOTA PENJUALAN</td>
        <td>Rp. {{ getTagihan }}</td>
        <td class="label_width">PEMBULATAN NOTA</td>
        <td>Rp. {{ getTagihanPembulatan }}</td>
        <td class="label_width">DIBAYAR</td>
        <td>Rp. {{ getDibayar }}</td>
      </tr>
      <tr>
        <td class="label_width">KEMBALIAN</td>
        <td>Rp. {{ getKembalian }}</td>
        <td class="label_width">KEMBALIAN AKTUAL</td>
        <td>Rp. {{ getKembalianAktual }}</td>
        <td class="label_width">PEMBULATAN MINUS</td>
        <td>Rp. {{ getMinusPembulatan }}</td>
      </tr>
    </tbody>
  </table>
  <table id="customers11">
    <thead>
      <tr>
        <th>Nama Item</th>
        <th>Stok Awal</th>
        <th>Pengiriman</th>
        <th>Terjual</th>
        <th>Mutasi</th>
        <th>Stok Aktual</th>
        <th v-if="_shift == 'SHIFT 2'">Stok Akhir</th>
        <th v-if="_shift == 'SHIFT 2'">Selisih Stok</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(item, index) in PENJUALAN_items">
        <tr>
          <td>{{ item?.name }}</td>

          <td>
            <template v-for="checkin_item in CHECKIN_produks">
              <span v-if="checkin_item?.produk_id == item?.produk_id"
                >{{ checkin_item?.stock }} Kg</span
              >
            </template>
          </td>

          <td>
            <template v-for="pengiriman_item in filter_PENGIRIMAN_rows_produk">
              <span v-if="pengiriman_item?.produk_id == item?.produk_id"
                >{{ pengiriman_item?.qty }} Kg</span
              >
            </template>
          </td>

          <td>
            <template v-for="penjualan_item in filter_PENJUALAN_rows_produk">
              <span v-if="penjualan_item?.produk_id == item?.produk_id"
                >{{ penjualan_item?.qty }} Kg</span
              >
            </template>
          </td>

          <td>
            <template v-for="mutasi_item in filter_MUTASI_rows_produk">
              <span v-if="mutasi_item?.produk_id == item?.produk_id"
                >{{ mutasi_item?.qty }} Kg</span
              >
            </template>
          </td>

          <td>
            <template v-for="aktual_item in filter_STOK_AKTUAL">
              <span v-if="aktual_item?.produk_id == item?.produk_id"
                >{{ aktual_item?.stock }} Kg</span
              >
            </template>
          </td>
          <td v-if="_shift == 'SHIFT 2'">
            <template v-for="checkout_produk in CHECKOUT_produks">
              <span v-if="checkout_produk?.produk_id == item?.produk_id"
                >{{ checkout_produk?.stock }} Kg</span
              >
            </template>
          </td>

          <td v-if="_shift == 'SHIFT 2'">
            <template v-for="selisih_produk in filter_STOK_SELISIH">
              <span v-if="selisih_produk?.produk_id == item?.produk_id"
                >{{ selisih_produk?.stock }} Kg</span
              >
            </template>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
import { mapState, mapWritableState } from "pinia";
import { usePenjualanStore } from "src/stores/penjualan-store";

import { useBalanceStore } from "src/stores/balance-store";
import { useCheckInStore } from "src/stores/checkin-store";
import { useMutasiStore } from "src/stores/mutasi-store";
import { usePengirimanStore } from "src/stores/pengiriman-store";
import { useCheckOutStore } from "src/stores/checkout-store";

import DialogInvoicePenjualan from "./DialogInvoicePenjualan.vue";

import columns from "src/helpers/colums-riwayat-penjualan";

import TableRiwayatPenjualanPDF from "./TableRiwayatPenjualanPDF.vue";
import { useAbsensiStore } from "src/stores/absensi-store";
import { usePengaturanStore } from "src/stores/pengaturan-store";

function uniqueAndSummed(data) {
  return data.reduce((acc, currentItem) => {
    const existingItem = acc[currentItem.produk_id];

    if (existingItem) {
      existingItem.qty += currentItem.qty;
    } else {
      acc[currentItem.produk_id] = { ...currentItem }; // Create a copy to avoid modifying original
    }

    return acc;
  }, {});
}

export default {
  props: ["date", "_shift"],
  components: {
    DialogInvoicePenjualan,
    TableRiwayatPenjualanPDF,
  },
  setup() {
    return {
      columns,
      // rows,
    };
  },
  data() {
    return {
      initialPagination: {
        sortBy: "waktu",
        descending: true,
        page: 1,
        rowsPerPage: 25,
        // rowsNumber: xx if getting data from a server
      },
    };
  },
  async mounted() {
    // console.log("TableRiwayatShift PENGIRIMAN_rows", this.PENGIRIMAN_rows);
    // console.log("TableRiwayatShift CHECKIN_produks", this.CHECKIN_produks);
    setTimeout(() => {
      console.log(this.createContent);
    }, 1000);
  },
  watch: {
    // filter_BALANCE_rows_produk: {
    //   immediate: true,
    //   deep: true,
    //   handler(val) {
    //     console.log("TableRiwayatShift filter_BALANCE_rows_produk", val);
    //   },
    // },
  },
  computed: {
    ...mapState(usePengaturanStore, {
      cashier: "cashier",
    }),
    ...mapState(useAbsensiStore, {
      ABSENSI_struks: "struks",
    }),
    ...mapState(usePenjualanStore, {
      getTotalStokItems: "getTotalStokItems",

      PENJUALAN_rows: "getStruks",
      PENJUALAN_items: "items",
      PENJUALAN_struks: "struks",
    }),
    ...mapState(useBalanceStore, {
      BALANCE_rows: "getStruks",
    }),
    ...mapState(useCheckInStore, {
      CHECKIN_rows: "getStruks",
      CHECKIN_produks: "produks",
    }),
    ...mapState(useMutasiStore, {
      MUTASI_rows: "getStruks",
    }),
    ...mapState(usePengirimanStore, {
      PENGIRIMAN_rows: "getStruks",
      // PENGIRIMAN_produks: "produks",
    }),
    ...mapState(useCheckOutStore, {
      CHECKOUT_rows: "getStruks",
      CHECKOUT_produks: "produks",
    }),
    ...mapWritableState(usePenjualanStore, {
      invoice: "invoice",
    }),
    getPendapatanFilter() {
      let temp = [];
      this.PENJUALAN_rows?.forEach((el) => {
        if (el?.absensi?.shift == this._shift) {
          temp.push(el);
        }
      });
      return temp;
    },
    getAbsensi() {
      let temp = null;
      this.ABSENSI_struks.forEach((el) => {
        if (el?.shift == this._shift) temp = el;
      });
      return temp;
    },
    // getAbsensi() {
    //   let temp = null;
    //   this.ABSENSI_struks.forEach((el) => {
    //     if (el?.cashier_id == this.cashier?.id) temp = el;
    //   });
    //   return temp;
    // },
    getTotalCash() {
      return Number(this.getModalAwal) + Number(this.getTagihanPembulatan);
    },
    getHasil() {
      return Number(this.getTotalCash) - Number(this.getPengeluaran);
    },
    getPendapatan() {
      let temp = 0;
      this.getPendapatanFilter.forEach((el) => {
        temp += Number(el?.bill);
      });
      return temp;
    },

    getKembalian() {
      let temp = 0;
      this.getPendapatanFilter.forEach((el) => {
        temp += Number(el?.change);
      });
      return temp;
    },

    getMinusPembulatan() {
      let temp = 0;
      this.getPendapatanFilter.forEach((el) => {
        temp += Number(el?.change_pembulatan);
      });
      return temp;
    },

    getKembalianAktual() {
      let temp = 0;
      this.getPendapatanFilter.forEach((el) => {
        temp += Number(el?.change_aktual);
      });
      return temp;
    },

    getTagihan() {
      let temp = 0;
      this.getPendapatanFilter.forEach((el) => {
        temp += Number(el?.bill);
      });
      return temp;
    },
    getTagihanPembulatan() {
      let temp = 0;
      this.getPendapatanFilter.forEach((el) => {
        temp += Number(el?.bill_pembulatan);
      });
      return temp;
    },
    getDibayar() {
      let temp = 0;
      this.getPendapatanFilter.forEach((el) => {
        temp += Number(el?.bayar);
      });
      return temp;
    },
    getPengeluaran() {
      let temp = 0;
      this.BALANCE_rows.forEach((el) => {
        temp += Number(el?.total_keluar);
      });
      return temp;
    },
    getModalAwal() {
      return Number(this.getAbsensi?.modal_awal);
    },

    filter_rows() {
      return function (param) {
        let temp = [];
        this[param].forEach((el) => {
          if (el?.absensi?.shift == this._shift) {
            temp.push(el);
          }
        });
        return temp;
      };
    },

    filter_PENJUALAN_rows_produk() {
      let temp = [];
      this.filter_rows("PENJUALAN_rows").forEach((el) => {
        el?.items.forEach((el2) => {
          // console.log(el2);
          temp.push(el2);
        });
      });
      return Object.values(uniqueAndSummed(temp));
    },
    filter_PENGIRIMAN_rows_produk() {
      let temp = [];
      this.filter_rows("PENGIRIMAN_rows").forEach((el) => {
        el?.items.forEach((el2) => {
          // console.log(el2);
          temp.push(el2);
        });
      });
      return Object.values(uniqueAndSummed(temp));
    },
    filter_MUTASI_rows_produk() {
      let temp = [];
      this.filter_rows("MUTASI_rows").forEach((el) => {
        el?.items.forEach((el2) => {
          // console.log(el2);
          temp.push(el2);
        });
      });
      return Object.values(uniqueAndSummed(temp));
    },
    filter_STOK_AKTUAL() {
      let temp = JSON.parse(JSON.stringify(this.CHECKIN_produks));
      temp.forEach((el) => {
        this.filter_PENGIRIMAN_rows_produk.forEach((el2) => {
          if (el?.produk_id == el2?.produk_id) {
            el.stock = Number(el?.stock) + Number(el2?.qty ? el2?.qty : 0);
          }
        });
      });

      temp.forEach((el) => {
        this.filter_PENJUALAN_rows_produk.forEach((el2) => {
          if (el?.produk_id == el2?.produk_id) {
            el.stock = Number(el?.stock) - Number(el2?.qty ? el2?.qty : 0);
          }
        });
      });

      temp.forEach((el) => {
        this.filter_MUTASI_rows_produk.forEach((el2) => {
          if (el?.produk_id == el2?.produk_id) {
            el.stock = Number(el?.stock) - Number(el2?.qty ? el2?.qty : 0);
          }
        });
      });

      return temp;
    },
    filter_STOK_SELISIH() {
      let temp = []; // JSON.parse(JSON.stringify(this.CHECKIN_produks));
      this.CHECKOUT_produks.forEach((el) => {
        this.filter_STOK_AKTUAL.forEach((el2) => {
          if (el?.produk_id == el2?.produk_id) {
            temp.push({
              ...el,
              stock: Number(el2?.stock) - Number(el?.stock),
            });
          }
        });
      });
      return temp;
    },
    createContent() {
      // let invoice = this.invoice;
      let content = `
                          <!DOCTYPE html>
                          <html lang="en">
                              <head>
                                  <meta charset="utf-8">
                                  <title>INVOICE STOK AWAL</title>


                                  <style>
                                  .label_width {
                                    width: 150px;
                                  }

                                  #customers2 {
                                    font-family: Arial, Helvetica, sans-serif;
                                    border-collapse: collapse;
                                    width: 100%;
                                  }

                                  #customers2 td,
                                  #customers2 th {
                                    border: 1px solid #ddd;
                                    padding: 8px;
                                  }

                                  #customers2 th {
                                    padding-top: 12px;
                                    padding-bottom: 12px;
                                    text-align: left;
                                    background-color: #04aa6d;
                                    color: white;
                                  }

                                  #customers11 {
                                    font-family: Arial, Helvetica, sans-serif;
                                    border-collapse: collapse;
                                    width: 100%;
                                  }

                                  #customers11 td,
                                  #customers11 th {
                                    border: 1px solid #ddd;
                                    padding: 8px;
                                  }

                                  #customers tr:nth-child(even) {
                                    background-color: #f2f2f2;
                                  }

                                  #customers tr:hover {
                                    background-color: #ddd;
                                  }

                                  #customers11 th {
                                    padding-top: 12px;
                                    padding-bottom: 12px;
                                    text-align: left;
                                    background-color: #04aa6d;
                                    color: white;
                                  }
                                  </style>
                              </head>
                              <body>`;

      content += `
                                  <table style="width: 100%; margin-bottom: 10px">
                                    <tbody>
                                      <tr>
                                        <td style="width: 70px">
                                          <img height="60" src="${this.$logoBase64}" />
                                        </td>
                                        <td style="text-align: left">
                                          <div style="font-size: 24px"><b>FREEZTO-MART</b> GROSIR AYAM FRESH</div>
                                          <div style="font-size: 16px">SEGAR SETIAP HARI</div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>`;

      content += `
                                  <table id="customers2" style="width: 100%; margin-bottom: 10px">
                                    <tbody>
                                      <tr>
                                        <td class="label_width">SHIFT</td>
                                        <td>${this.getAbsensi?.shift}</td>
                                        <td class="label_width">MODAL AWAL</td>
                                        <td>Rp. ${this.getModalAwal}</td>
                                        <td class="label_width">PENDAPATAN</td>
                                        <td>Rp. ${this.getPendapatan}</td>
                                      </tr>
                                      <tr>
                                        <td class="label_width">KASIR</td>
                                        <td>${this.getAbsensi?.cashier?.nama}</td>
                                        <td class="label_width">TOTAL CASH</td>
                                        <td>Rp. ${this.getTotalCash}</td>
                                        <td class="label_width">PENGELUARAN</td>
                                        <td>Rp. ${this.getPengeluaran}</td>
                                      </tr>
                                      <tr>
                                        <td colspan="3">HASIL PENJUALAN BERSIH</td>
                                        <td colspan="3">Rp. ${this.getHasil}</td>
                                      </tr>
                                      <tr>
                                        <td class="label_width">NOTA PENJUALAN</td>
                                        <td>Rp. ${this.getTagihan}</td>
                                        <td class="label_width">PEMBULATAN NOTA</td>
                                        <td>Rp. ${this.getTagihanPembulatan}</td>
                                        <td class="label_width">DIBAYAR</td>
                                        <td>Rp. ${this.getDibayar}</td>
                                      </tr>
                                      <tr>
                                        <td class="label_width">KEMBALIAN</td>
                                        <td>Rp. ${this.getKembalian}</td>
                                        <td class="label_width">KEMBALIAN AKTUAL</td>
                                        <td>Rp. ${this.getKembalianAktual}</td>
                                        <td class="label_width">PEMBULATAN MINUS</td>
                                        <td>Rp. ${this.getMinusPembulatan}</td>
                                      </tr>
                                    </tbody>
                                  </table>`;
      content += `<table id="customers11">${
        document.getElementById("customers11").innerHTML
      }</table>`;

      content += `</body>
                        </html>`;

      return content;
    },
  },
  methods: {
    // onRowClick(evt, row, index) {
    //   console.log("onRowClick", evt, row, index);
    //   this.invoice = row;
    //   this.$refs.dialog_invoice_penjualan?.onOpen(row, index);
    // },
    // onPrint() {
    //   this.$refs.riwayat.makePDFShare();
    // },
    makePDFShare() {
      if (!this.$q.platform.is.cordova) return alert("MOBILE VERSION");

      var opts = {
        documentSize: "A4",
        landscape: "portrait",
        type: "share", //Open a context menu and ask the user what to do next (print, mail, etc..).
        fileName: `LAPORAN-${this._shift}-${this.getAbsensi?.cabang?.nama}-${this.getAbsensi?.cashier?.nama}-${this.date}.pdf`, //it will use this filename as a place-holder
      };

      pdf
        .fromData(this.createContent, opts)
        .then((status) => console.log("success->", status))
        .catch((error) => alert(JSON.stringify(error)));
    },
  },
};
</script>

<style scoped>
.label_width {
  width: 150px;
}

#customers2 {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers2 td,
#customers2 th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers2 th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
}

#customers11 {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers11 td,
#customers11 th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers11 th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
}
</style>

<style lang="sass">
.my-sticky-header-table
  thead
    text-transform: uppercase;

  .q-field__native
    color: white
  .q-select__dropdown-icon
    color: white

  /* height or max-height is important */
  /* height: 100% */

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #176042
    color: white

  .q-table__bottom .q-btn .q-icon
    color: white

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>

<style lang="sass">
.grid-style-transition
  transition: transform .28s, background-color .28s
</style>
