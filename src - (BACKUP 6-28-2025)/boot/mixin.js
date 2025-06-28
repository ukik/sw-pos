
import { defineBoot } from '#q-app/wrappers'


// import VueSweetalert2 from 'vue-sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';
// import { defineAsyncComponent } from 'vue'

import { usePengaturanStore } from "src/stores/pengaturan-store";
import { useAbsensiStore } from 'src/stores/absensi-store';
import { mapState } from 'pinia';


export default defineBoot(async ({ app, store }) => {

  // const { setPosition, position } = usePengaturanStore(store) // inject disini ya

  app.mixin({
    computed: {
      ...mapState(usePengaturanStore, {
        PENGATURAN_cashier: "cashier",
      }),
      ...mapState(useAbsensiStore, {
        // CHECKOUT_items: "items",
        // ABSENSI_isAbsensi: "isAbsensi",
        ABSENSI_struks: "struks",
        // ABSENSI_struk: "struk",
        // ABSENSI_invoice: "invoice",
        // ABSENSI_getPiketSudahAbsensi: "getPiketSudahAbsensi",
      }),
      getAbsensiShift() {
        let isAbsensi = null;
        this.ABSENSI_struks.forEach((element) => {
          if (element?.cashier_id == this.PENGATURAN_cashier?.id) {
            isAbsensi = element;
          }
        });
        return isAbsensi;
      },
    },
    methods: {
      getAbsensiShiftManual(cashier_id) {
        let isAbsensi = null;
        this.ABSENSI_struks.forEach((element) => {
          if (element?.cashier_id == cashier_id) {
            return isAbsensi = element;
          }
        });
        return isAbsensi;
      }

    }
  })

})
