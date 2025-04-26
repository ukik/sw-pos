<template>
  <q-date
    subtitle="RIWAYAT ABSENSI"
    color=" bg-sw"
    v-model="date"
    :locale="myLocale"
    :options="optionsFn"
    today-btn
    :events="event"
    event-color="pink"
  />
</template>

<script>
import { ref } from "vue";

import { date } from "quasar";

const timeStamp = Date.now();
const getToday = date.formatDate(Date.now(), "YYYY/MM/DD");

export default {
  props: ["prop_date"],
  watch: {
    date(val) {
      console.log(val);
      if (!val) this.date = this.last_date;
      this.last_date = val;

      if (!this.date) return;
      this.$emit("onBubbleEvent", this.date);
      // this.$refs.dialog_table_riwayat_pengiriman.onOpen(this.date);
    },
  },
  data() {
    return {
      last_date: "",
      date: "",
    };
  },
  mounted() {
    // this.last_date = getToday;
    const _arr = JSON.parse(JSON.stringify(this.prop_date.split("/")));
    const _time = date.buildDate({ year: _arr[0], months: _arr[1], date: _arr[2] });

    const temp = date.formatDate(_time, "YYYY/MM/DD");

    console.log(
      "prop_date",
      this.prop_date,
      temp,
      _arr,
      date.formatDate(_time, "YYYY/MM/DD")
    );

    this.last_date = temp;
    this.date = temp;
  },
  setup() {
    return {
      date: ref(getToday),
      event: [getToday],

      optionsFn(date) {
        return date <= getToday;
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
    };
  },
};
</script>
