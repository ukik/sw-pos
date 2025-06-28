<template>
  <q-dialog
    transition-show="slide-down"
    transition-hide="slide-up"
    full-width
    full-height
    persistent
    v-model="fixed"
  >
    <q-card>
      <!-- <q-card-actions class="bg-sw text-white">
        <q-btn v-close-popup class="col-auto" dense flat icon="arrow_back"></q-btn>
        <q-toolbar-title>{{ date }}</q-toolbar-title>
      </q-card-actions> -->
      <q-card-actions class="bg-sw text-white q-py-none">
        <q-toolbar-title>
          <q-avatar class="">
            <q-btn v-close-popup dense flat icon="arrow_back"></q-btn>
          </q-avatar>

          LAPORAN SHIFT: {{ date }}</q-toolbar-title
        >

        <q-tabs v-model="tab" dense class="bg-x text-white">
          <q-tab name="1" label="SHIFT 1" />
          <q-tab name="2" label="SHIFT 2" />
        </q-tabs>
        <!-- <q-btn label="cetak laporan" @click="onPrint" outline icon="print"></q-btn> -->
      </q-card-actions>

      <q-separator />

      <q-card-section
        style="height: calc(100% - 50px)"
        id="TableRiwayat"
        class="scroll q-pa-none q-ma-none"
      >
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="1">
            <TableRiwayatShift
              _shift="SHIFT 1"
              :date="date"
              ref="riwayat"
            ></TableRiwayatShift>
          </q-tab-panel>

          <q-tab-panel name="2">
            <TableRiwayatShift
              _shift="SHIFT 2"
              :date="date"
              ref="riwayat"
            ></TableRiwayatShift>
          </q-tab-panel>
        </q-tab-panels>
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
import TableRiwayatShift from "./TableRiwayatShift.vue";
import { mapActions } from "pinia";
import { usePenjualanStore } from "src/stores/penjualan-store";
import { useBalanceStore } from "src/stores/balance-store";
import { useCheckInStore } from "src/stores/checkin-store";
import { useMutasiStore } from "src/stores/mutasi-store";
import { usePengirimanStore } from "src/stores/pengiriman-store";
import { useCheckOutStore } from "src/stores/checkout-store";
import { useRotasiStore } from "src/stores/rotasi-store";

export default {
  components: {
    TableRiwayatShift,
  },
  setup() {
    return {
      fixed: ref(false),
    };
  },
  data() {
    return {
      date: null,
      tab: "1",
    };
  },
  watch: {
    async date(val) {
      console.log(val, val?.split("/").join("-"));
      const _date = val?.split("/").join("-");

      await this.$nextTick();
      this.PENJUALAN_loadLocalStorageStruks(_date);
      await this.$nextTick();
      this.BALANCE_loadLocalStorageStruks(_date);
      await this.$nextTick();
      this.CHECKIN_loadLocalStorageStruks(_date);
      await this.$nextTick();
      this.MUTASI_loadLocalStorageStruks(_date);
      await this.$nextTick();
      this.PENGIRIMAN_loadLocalStorageStruks(_date);
      await this.$nextTick();
      this.CHECKOUT_loadLocalStorageStruks(_date);
      await this.$nextTick();
      this.ROTASI_loadLocalStorageStruks(_date);

      await this.$nextTick();
      this.CHECKIN_loadLocalStorageProduk(_date);

      await this.$nextTick();
      this.ROTASI_loadLocalStorageProduk(_date);

      await this.$nextTick();
      this.CHECKOUT_loadLocalStorageProduk(_date);
    },
  },
  methods: {
    ...mapActions(usePenjualanStore, {
      PENJUALAN_loadLocalStorageStruks: "loadLocalStorageStruks",
    }),
    ...mapActions(useBalanceStore, {
      BALANCE_loadLocalStorageStruks: "loadLocalStorageStruks",
    }),
    ...mapActions(useCheckInStore, {
      CHECKIN_loadLocalStorageStruks: "loadLocalStorageStruks",
      CHECKIN_loadLocalStorageProduk: "loadLocalStorageProduk",
    }),
    ...mapActions(useMutasiStore, {
      MUTASI_loadLocalStorageStruks: "loadLocalStorageStruks",
    }),
    ...mapActions(usePengirimanStore, {
      PENGIRIMAN_loadLocalStorageStruks: "loadLocalStorageStruks",
      // PENGIRIMAN_updateLocalStorageProduk: "updateLocalStorageProduk",
    }),
    ...mapActions(useCheckOutStore, {
      CHECKOUT_loadLocalStorageStruks: "loadLocalStorageStruks",
      CHECKOUT_loadLocalStorageProduk: "loadLocalStorageProduk",
    }),
    ...mapActions(useRotasiStore, {
      ROTASI_loadLocalStorageStruks: "loadLocalStorageStruks",
      ROTASI_loadLocalStorageProduk: "loadLocalStorageProduk",
    }),
    onOpen(item) {
      this.fixed = true;
      this.date = item;
      // alert(item);
      // alert(item?.split("/").join("-"));

      // loadLocalStorageStruks
    },
    onPrint() {
      this.$refs.riwayat.onPrint();
    },
  },
};
</script>
