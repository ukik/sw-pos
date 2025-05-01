<template>
  <DialogInvoiceAbsensi ref="dialog_invoice_absensi"></DialogInvoiceAbsensi>

  <TableRiwayatAbsensiPDF ref="riwayat" :date="date" :getTotalStokItems="getTotalStokItems" :columns="columns" :rows="rows"></TableRiwayatAbsensiPDF>

  <q-table
    :hide-header="false"
    class="my-sticky-header-table"
    :style="`height:calc(100vh - 65px - 50px); border: 1px solid rgba(29, 29, 29, 0.12)`"
    flat
    bordered
    :rows="rows"
    row-key="name"
    :pagination="initialPagination"
    :grid="false"
    rows-per-page-label="catatan per halaman:"
    @row-click="onRowClick"
    :columns="columns"
  >
  </q-table>
</template>

<script>
import { mapState, mapWritableState } from "pinia";
import { useAbsensiStore } from "src/stores/absensi-store";
import DialogInvoiceAbsensi from "./DialogInvoiceAbsensi.vue";

import columns from 'src/helpers/colums-riwayat-absensi'

import TableRiwayatAbsensiPDF from "./TableRiwayatAbsensiPDF.vue";
import { usePenjualanStore } from "src/stores/penjualan-store";

export default {
  props:['date'],
  components: {
    DialogInvoiceAbsensi,
    TableRiwayatAbsensiPDF,
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
  computed: {
    ...mapState(usePenjualanStore, {
      getTotalStokItems: 'getTotalStokItems',
    }),
    ...mapState(useAbsensiStore, {
      rows: "getStruks",
    }),
    ...mapWritableState(useAbsensiStore, {
      invoice: "invoice",
    }),
  },
  methods: {
    onRowClick(evt, row, index) {
      console.log("onRowClick", evt, row, index);
      this.invoice = row;
      this.$refs.dialog_invoice_absensi?.onOpen(row, index);
    },
    onPrint() {
      this.$refs.riwayat.makePDFShare()
    }
  },
};
</script>

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
