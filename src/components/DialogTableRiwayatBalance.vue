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
      <q-card-actions class="bg-sw text-white q-py-none">
        <q-toolbar-title>
          <q-avatar class="">
            <q-btn v-close-popup dense flat icon="arrow_back"></q-btn>
          </q-avatar>

          SALDO: {{ date }}</q-toolbar-title
        >
        <q-btn label="cetak laporan" @click="onPrint" outline icon="print"></q-btn>
      </q-card-actions>

      <q-separator />

      <q-card-section style="height: calc(100% - 50px)" class="scroll q-pa-sm">
        <TableRiwayatBalance :date="date" ref="riwayat"></TableRiwayatBalance>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import TableRiwayatBalance from "./TableRiwayatBalance.vue";
import { mapActions } from "pinia";
import { useBalanceStore } from "src/stores/balance-store";

export default {
  components: {
    TableRiwayatBalance,
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
    ...mapActions(useBalanceStore, {
      loadLocalStorageStruks: "loadLocalStorageStruks",
    }),
    onOpen(item) {
      this.fixed = true;
      this.date = item;
      // alert(item);
      // alert(item?.split("/").join("-"));

      // loadLocalStorageStruks
    },
    onPrint() {
      this.$refs.riwayat.onPrint()
    }
  },
};
</script>
