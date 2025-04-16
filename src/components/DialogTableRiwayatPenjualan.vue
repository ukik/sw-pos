<template>
  <q-dialog
    transition-show="slide-down"
    transition-hide="slide-up"
    full-width
    full-height
    :persistent="false"
    v-model="fixed"
  >
    <q-card>
      <q-card-actions class="bg-sw text-white">
        <q-btn v-close-popup class="col-auto" dense flat icon="arrow_back"></q-btn>
        <q-toolbar-title>{{ date }}</q-toolbar-title>
        <!-- <div class="text-h6">Bayar</div> -->
      </q-card-actions>

      <q-separator />

      <q-card-section style="height: calc(100% - 51px)" class="scroll q-pa-sm">
        <TableRiwayatPenjualan></TableRiwayatPenjualan>
      </q-card-section>
      <!--
      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="Decline" color="primary" v-close-popup />
        <q-btn flat label="Accept" color="primary" v-close-popup />
      </q-card-actions> -->
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import TableRiwayatPenjualan from "./TableRiwayatPenjualan.vue";
import { mapActions } from "pinia";
import { usePenjualanStore } from "src/stores/penjualan-store";

export default {
  components: {
    TableRiwayatPenjualan,
  },
  setup() {
    return {
      fixed: ref(false),
    };
  },
  data() {
    return {
      date: null,
    };
  },
  watch: {
    date(val) {
      console.log(val, val?.split("/").join("-"));
      this.loadLocalStorageStruks(val?.split("/").join("-"));
    },
  },
  methods: {
    ...mapActions(usePenjualanStore, {
      loadLocalStorageStruks: "loadLocalStorageStruks",
    }),
    onOpen(item) {
      this.fixed = true;
      this.date = item;
      // alert(item);
      // alert(item?.split("/").join("-"));

      // loadLocalStorageStruks
    },
  },
};
</script>
