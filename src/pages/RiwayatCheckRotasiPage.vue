<template>
  <q-page class="q-pa-sm row">
    <!-- <DialogTableRiwayatRotasi
      ref="dialog_table_riwayat_Rotasi"
    ></DialogTableRiwayatRotasi> -->
    <DialogInvoiceRotasi ref="dialog_invoice_rotasi"></DialogInvoiceRotasi>

    <q-date
      subtitle="PERGANTIAN SHIFT"
      class="full-width"
      color=" bg-sw"
      v-model="date"
      :locale="myLocale"
      :options="optionsFn"
      today-btn
      :events="event"
      event-color="pink"
    />
  </q-page>
</template>

<script>
import { ref } from "vue";

import { date } from "quasar";
// import DialogTableRiwayatRotasi from "src/components/DialogTableRiwayatRotasi.vue";
import DialogInvoiceRotasi from "src/components/DialogInvoiceRotasi.vue";
import { mapActions, mapState, mapWritableState } from "pinia";
import { useRotasiStore } from "src/stores/rotasi-store";

const timeStamp = Date.now();
const getToday = date.formatDate(Date.now(), "YYYY/MM/DD");

export default {
  components: {
    // DialogTableRiwayatRotasi,
    DialogInvoiceRotasi,
  },
  watch: {
    async date(val) {
      console.log(val);
      if (!val) this.date = this.last_date;
      this.last_date = val;

      if (!this.date) return;

      console.log(val, val?.split("/").join("-"));

      // TAMBAHAN khusus karena hanya 1x sehari
      this.$nextTick();
      const _date = val?.split("/").join("-");
      await this.loadLocalStorageStruks(_date);
      this.invoice = this.getInvoiceSelected(_date);

      this.$nextTick();
      this.$refs.dialog_invoice_rotasi.onOpen(this.date);
    },
  },
  data() {
    return {
      last_date: "",
    };
  },
  mounted() {
    this.last_date = this.date;
  },
  computed: {
    ...mapState(useRotasiStore, {
      getInvoiceSelected: "getInvoiceSelected",
    }),
    ...mapWritableState(useRotasiStore, {
      invoice: "invoice",
    }),
  },
  methods: {
    ...mapActions(useRotasiStore, {
      loadLocalStorageStruks: "loadLocalStorageStruks",
    }),
  },
  setup() {
    return {
      date: ref(getToday),
      event: [getToday],

      options: ["2019/02/01", "2019/02/05", "2019/02/06", "2019/02/09", "2019/02/23"],

      optionsFn(date) {
        return date <= getToday;
        // return date >= '2019/02/03' && date <= '2019/02/15'
      },

      // can supply only what needed (the rest will be taken from current locale):
      myLocale: {
        /* starting with Sunday */
        days: "Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),
        // daysShort: "Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),
        daysShort: "Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),
        months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split(
          "_"
        ),
        monthsShort: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split(
          "_"
        ),
        // monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agu_Sep_Okt_Nov_Des".split("_"),
        firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
        format24h: true,
        pluralDay: "hari",
      },

      // optionsFn2 (date) {
      //   const parts = date.split('/')
      //   return parts[ 2 ] % 2 === 0
      // }
    };
  },
};
</script>
