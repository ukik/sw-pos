<template>
  <q-page id="page" class="q-pa-sm items-start row">
    <div class="q-col-gutter-sm row col-8" id="content">
      <DialogCalculatorRotasi
        ref="dialog_calculator"
        @onBubbleEvent="onBubbleEventDialogCalculatorRotasi"
      ></DialogCalculatorRotasi>

      <DialogConfirmRotasi
        ref="dialog_bayar"
        @onBubbleEvent="onBubbleEventDialogConfirmRotasi"
      ></DialogConfirmRotasi>

      <div class="col-12">
        <q-banner dense class="bg-positive text-white">
          <template v-slot:avatar>
            <q-icon name="info" color="white" />
          </template>
          Stok berubah setelah konfirmasi CHECK ROTASI sukses
        </q-banner>
        <q-banner dense class="bg-orange q-mt-sm text-white">
          <template v-slot:avatar>
            <q-icon name="warning" color="white" />
          </template>
          Hanya bisa dilakukan sekali dalam satu hari
        </q-banner>
      </div>

      <template v-for="(item, index) in items">
        <div class="col-4">
          <q-item
            @click="openDialogCalculatorRotasi(item)"
            clickable
            v-ripple
            class="bg-sw text-white q-pa-none shadow-2 row"
          >
            <q-list class="full-width col-12" color="white" bordered>
              <q-item class="q-pa-sm" dense>
                <q-item-section>
                  <q-item-label class="text-h6 text-capitalize">{{
                    item?.name
                  }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator></q-separator>
              <q-item class="q-pa-sm" dense>
                <q-item-section>
                  <q-item-label class="text-white" caption>Harga</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-white" caption
                    >Rp. {{ item?.price }}</q-item-label
                  >
                </q-item-section>
              </q-item>

              <q-separator></q-separator>

              <q-item class="q-pa-sm" dense>
                <q-item-section>
                  <q-item-label class="text-white" caption>Stok</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-white" caption
                    >{{ item?.stock }} kg</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-list>
          </q-item>

          <!-- <q-btn-group square spread>
            <q-btn
              @click="openDialogCalculatorRotasi(item)"
              dense
              color="orange"
              label="Stok-In"
            />
            <q-separator vertical></q-separator>
            <q-btn dense color="blue" label="Mutasi" />
          </q-btn-group> -->
        </div>
      </template>
    </div>

    <q-page-sticky class="q-pr-sm" position="top-right" :offset="[0, 0]">
      <q-item style="height: 35px" dense class="bg-sw flex flex-center text-white">
        <q-item-section>
          <q-item-label class="text-center">STRUK CHECK ROTASI</q-item-label>
        </q-item-section>
      </q-item>

      <q-scroll-area
        class="border-1"
        :style="`height: calc(${$q.screen.height}px - 98px - 50px - 50px - 50px + 15px); width: 250px`"
      >
        <q-list bordered separator>
          <template v-for="(item, index) in struk?.items">
            <SlideItemRotasi
              :item="item"
              @onBubbleEvent="onBubbleEventSlideItemRotasi($event, index)"
            >
            </SlideItemRotasi>
          </template>
        </q-list>
      </q-scroll-area>

      <q-item style="height: 35px" dense class="bg-sw items-center text-white">
        <q-item-section>
          <q-item-label class="text-left text-white" caption>TOTAL </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label lines="1" class="text-left text-white text-h6"
            >{{ getTotalStruk }} kg
          </q-item-label>
        </q-item-section>
      </q-item>

      <div class="full-width q-mt-sm col-12 row q-col-gutter-sm">
        <div class="col q-pl-none q-pt-none">
          <q-btn
            @click="openDialogConfirmRotasi"
            color="pink"
            class="text-h6 full-width"
            style="height: 50px"
            label="validasi"
            icon-right="security"
          />
        </div>
        <div class="col-auto q-pt-none">
          <q-btn
            @click="openDialogConfirmRotasi"
            color="teal"
            class="text-h6"
            style="height: 50px"
            icon-right="edit_document"
          />
        </div>
      </div>
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

import SlideItemRotasi from "src/components/SlideItemRotasi.vue";
import DialogCalculatorRotasi from "src/components/DialogCalculatorRotasi.vue";
import DialogConfirmRotasi from "src/components/DialogConfirmRotasi.vue";

// const items = ref();
</script>

<script>
import { date } from "quasar";
import { mapActions, mapWritableState, mapState } from "pinia";
import { useRotasiStore } from "src/stores/rotasi-store";
import { usePenjualanStore } from "src/stores/penjualan-store";

// const timeStamp = Date.now();
// const formattedString = date.formatDate(timeStamp, "YYYY-MM-DDTHH:mm:ss.SSSZ");

// console.log(formattedString);

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(useRotasiStore, {
      // getStruk: "getStruk",
      // getTotalStruk: "getTotalStruk",
      // getStruksLength: "getStruksLength",
      getTotal: "getTotal",
    }),
    ...mapWritableState(usePenjualanStore, {
      items: "items",
    }),
    ...mapWritableState(useRotasiStore, {
      struk: "struk",
      struks: "struks",
    }),
    getTotalStruk() {
      return Number(this.getTotal?.qty);
    },
  },
  methods: {
    ...mapActions(useRotasiStore, {
      addNewStruk: "addNewStruk",
      updateLocalStorage: "updateLocalStorage",
    }),
    openDialogCalculatorRotasi(item) {
      this.$refs.dialog_calculator?.onOpen(item);
    },
    openDialogConfirmRotasi() {
      if (this.getTotalStruk <= 0)
        return this.$q.notify({
          message: "Peringatan",
          caption: "Struk check rotasi kosong",
          icon: "warning",
          color: "negative",
          position: "top",
        });

      this.$refs.dialog_bayar?.onOpen(this.struk);
    },
    onBubbleEventDialogCalculatorRotasi(item) {
      console.log(this.struk);

      this.addNewStruk();

      this.struk?.items?.push(item);

      // this.items.forEach((el) => {
      //   if (item?.id == el?.id) {
      //     el.stock = Number(el?.stock) - Number(item?.qty);
      //   }
      // });

      // localStorage.setItem("CHECK-ROTASI-STRUK", JSON.stringify(this.struk));
    },
    onBubbleEventDialogConfirmRotasi() {},
    onBubbleEventSlideItemRotasi(item, index) {
      this.struk?.items?.splice(index, 1);

      if (this.struk?.items.length <= 0) this.struk = null;
      // this.items.forEach((el) => {
      //   if (item?.produk_id == el?.produk_id) {
      //     el.stock = Number(el?.stock) + Number(item?.qty);
      //   }
      // });
    },
  },
};
</script>

<style>
#page #content .q-list--bordered,
#page #content .q-list--separator > .q-item-type + .q-item-type {
  border: 1px solid rgba(255, 255, 255, 0.336);
}

#page #content .q-separator {
  background: rgb(255 255 255 / 35%);
}
</style>
