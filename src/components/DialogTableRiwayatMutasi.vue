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
      <!-- <q-card-actions class="bg-sw text-white">
        <q-btn v-close-popup class="col-auto" dense flat icon="arrow_back"></q-btn>
        <q-toolbar-title>{{ date }}</q-toolbar-title>
      </q-card-actions> -->

      <q-card-actions class="bg-sw text-white q-py-none">
        <q-toolbar-title>
          <q-avatar class="">
            <q-btn v-close-popup dense flat icon="arrow_back"></q-btn>
          </q-avatar>

          MUTASI: {{ date }}</q-toolbar-title
        >
        <q-btn label="cetak laporan" @click="onPrint" outline icon="print"></q-btn>
      </q-card-actions>

      <q-separator />

      <q-card-section style="height: calc(100% - 50px)" class="scroll q-pa-sm">
        <TableRiwayatMutasi :date="date" ref="riwayat"></TableRiwayatMutasi>
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
import TableRiwayatMutasi from "./TableRiwayatMutasi.vue";
import { mapActions } from "pinia";
import { useMutasiStore } from "src/stores/mutasi-store";

export default {
  components: {
    TableRiwayatMutasi,
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
    ...mapActions(useMutasiStore, {
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
