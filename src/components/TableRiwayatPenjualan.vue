<template>
  <!-- <div class="q-pa-sm"> -->
  <!-- :style="`height: calc(${$q.screen.height}px - 120px); border: 1px solid rgba(29, 29, 29, 0.12)`" -->
  <DialogInvoicePenjualan ref="dialog_invoice_penjualan"></DialogInvoicePenjualan>
  <!-- :visible-columns="visibleColumns" -->
  <q-table
    :hide-header="false"
    class="my-sticky-header-table"
    :style="`height:calc(100vh - 65px - 50px); border: 1px solid rgba(29, 29, 29, 0.12)`"
    flat
    bordered
    title="PENJUALAN"
    :rows="rows"
    row-key="name"
    :pagination="initialPagination"
    :grid="false"
    rows-per-page-label="catatan per halaman:"
    @row-click="onRowClick"
    :columns="columns"
  >
    <template v-slot:item="props">
      <div
        class="q-px-xs q-py-none q-pb-xs col-12 grid-style-transition"
        :style="props.selected ? 'transform: scale(0.95);' : ''"
      >
        <q-card
          bordered
          flat
          :class="props.selected ? ($q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2') : ''"
        >
          <!-- <q-card-section>
              <q-checkbox dense v-model="props.selected" :label="props.row.name" />
            </q-card-section>
            <q-separator /> -->
          <q-list dense>
            <q-item
              v-for="col in props.cols.filter((col) => col.name !== 'desc')"
              :key="col.name"
            >
              <q-item-section>
                <q-item-label>{{ col.label }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label caption>{{ col.value }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </template>
  </q-table>
  <!-- </div> -->
</template>

<script>
import { mapState, mapWritableState } from "pinia";
import { usePenjualanStore } from "src/stores/penjualan-store";
import DialogInvoicePenjualan from "./DialogInvoicePenjualan.vue";

const columns = [
  // latitude: position?.coords?.latitude, // Latitude will be stored here
  // longitude: position?.coords?.longitude, // Longitude will be stored here
  {
    name: "id",
    align: "left",
    label: "ID",
    field: "id",
    sortable: true,
  },
  {
    name: "code",
    align: "left",
    label: "Code",
    field: "code",
    sortable: true,
  },
  {
    name: "cabang",
    align: "left",
    label: "Cabang",
    field: "cabang",
    sortable: true,
  },
  {
    name: "type",
    align: "left",
    label: "Tipe",
    field: "type",
    sortable: true,
  },
  {
    name: "cashier",
    align: "left",
    label: "Kasir",
    field: "cashier",
    sortable: true,
  },
  {
    name: "shift",
    align: "left",
    label: "Shift",
    field: "shift",
    sortable: true,
  },
  {
    name: "qty",
    align: "left",
    label: "Bobot",
    field: "qty",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  // {
  //   name: "balance",
  //   align: "left",
  //   label: "Saldo",
  //   field: "balance",
  //   sortable: true,
  //   sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  // },
  {
    name: "bill",
    align: "left",
    label: "Tagihan",
    field: "bill",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "bayar",
    align: "left",
    label: "Bayar",
    field: "bayar",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "change",
    align: "left",
    label: "Kembalian",
    field: "change",
    sortable: true,
  },

  {
    name: "latitude",
    label: "Lat",
    field: "latitude",
    sortable: true,
  },
  {
    name: "longitude",
    label: "Long",
    field: "longitude",
    sortable: true,
  },
  {
    name: "tanggal",
    label: "Tanggal",
    field: "tanggal",
    sortable: true,
  },
  {
    name: "waktu",
    label: "Waktu",
    field: "waktu",
    sortable: true,
  },
  {
    name: "created_at",
    label: "Dibuat Pada",
    field: "created_at",
    sortable: true,
  },
];

export default {
  components: {
    DialogInvoicePenjualan,
  },
  setup() {
    return {
      columns,
      // rows,
    };
  },
  data() {
    return {
      visibleColumns: [
        "id",
        "code",
        "cabang",
        "type",
        "cashier",
        "shift",
        // 'status',
        "balance",
        "bill",
        "bayar",
        "change",
        "qty",
        // "items",
        "tanggal",
        "waktu",
        // "created_at",
        "latitude",
        "longitude",
      ],
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 25,
        // rowsNumber: xx if getting data from a server
      },
    };
  },
  computed: {
    ...mapState(usePenjualanStore, {
      rows: "getStruks",
    }),
    ...mapWritableState(usePenjualanStore, {
      invoice: "invoice",
    }),
  },
  methods: {
    onRowClick(evt, row, index) {
      console.log("onRowClick", evt, row, index);
      this.invoice = row;
      this.$refs.dialog_invoice_penjualan?.onOpen(row, index);
    },
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
