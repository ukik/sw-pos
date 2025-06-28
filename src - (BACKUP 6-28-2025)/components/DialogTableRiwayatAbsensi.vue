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

          ABSENSI: {{ date }}</q-toolbar-title
        >
        <q-btn label="cetak laporan" @click="onPrint" outline icon="print"></q-btn>
      </q-card-actions>

      <q-separator />

      <q-card-section style="height: calc(100% - 50px)" class="scroll q-pa-sm">
        <TableRiwayatAbsensi :date="date" ref="riwayat"></TableRiwayatAbsensi>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import TableRiwayatAbsensi from "./TableRiwayatAbsensi.vue";
import { mapActions } from "pinia";
import { useAbsensiStore } from "src/stores/absensi-store";

export default {
  components: {
    TableRiwayatAbsensi,
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
    ...mapActions(useAbsensiStore, {
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
