<template>
  <q-page id="page" class="q-pa-sm items-start row">
    <div class="q-col-gutter-sm row col-8" id="content">
      <DialogCalculatorCheckOut
        ref="dialog_calculator"
        @onBubbleEvent="onBubbleEventDialogCalculatorCheckOut"
      ></DialogCalculatorCheckOut>

      <DialogConfirmCheckOut
        ref="dialog_bayar"
        @onBubbleEvent="onBubbleEventDialogConfirmCheckOut"
        @onBubbleEventCatatan="openDialogCatatan"
      ></DialogConfirmCheckOut>

      <DialogCatatan
        @onBubbleEvent="struk.catatan = $event"
        ref="dialog_catatan"
      ></DialogCatatan>

      <div class="col-12">
        <q-banner dense class="bg-positive text-white">
          <template v-slot:avatar>
            <q-icon name="info" color="white" />
          </template>
          Stok berubah setelah konfirmasi STOK AKHIR sukses
        </q-banner>
        <q-banner dense class="bg-orange q-mt-sm text-white">
          <template v-slot:avatar>
            <q-icon name="warning" color="white" />
          </template>
          Wajib dilakukan saat toko ditutup, hanya 1 kali sehari
          <div v-if="isCheckDone" class="">
            SELESAI PROSES: {{ getCheckDone?.created_at }}
          </div>
        </q-banner>
        <FilterProdukList></FilterProdukList>
      </div>

      <template v-for="(item, index) in getItemsByStok">
        <div class="col-4">
          <q-item
            @click="openDialogCalculatorCheckOut(item)"
            clickable
            v-ripple
            class="bg-sw text-white q-pa-none shadow-2 row"
          >
            <q-list class="full-width col-12" color="white" bordered>
              <q-item class="q-pa-sm" dense>
                <q-item-section>
                  <q-item-label lines="1" class="text-produk text-capitalize">{{
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
        </div>
      </template>
    </div>

    <q-page-sticky class="q-pr-sm" position="top-right" :offset="[0, 0]">
      <q-item style="height: 35px" dense class="bg-sw flex flex-center text-white">
        <q-item-section>
          <q-item-label class="text-center">STRUK STOK AKHIR</q-item-label>
        </q-item-section>
      </q-item>

      <q-scroll-area
        class="border-1"
        :style="`height: calc(${$q.screen.height}px - 98px - 50px - 50px - 50px + 15px); width: 250px`"
      >
        <q-list bordered separator>
          <template v-for="(item, index) in struk?.items">
            <SlideItemCheckOut
              :item="item"
              @onBubbleEvent="onBubbleEventSlideItemCheckOut($event, index)"
            >
            </SlideItemCheckOut>
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
            v-if="!isCheckDone"
            @click="openDialogConfirmCheckOut"
            color="pink"
            class="text-h6 full-width"
            style="height: 50px"
            label="validasi"
            icon-right="security"
          />
          <q-btn
            v-else
            @click="openDialogConfirmCheckOutPreview"
            color="cyan"
            class="text-h6 full-width"
            style="height: 50px"
            label="lihat"
            icon-right="assignment"
          />
        </div>
        <div class="col-auto q-pt-none">
          <q-btn
            @click="openDialogCatatan"
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

import SlideItemCheckOut from "src/components/SlideItemCheckOut.vue";
import DialogCalculatorCheckOut from "src/components/DialogCalculatorCheckOut.vue";
import DialogConfirmCheckOut from "src/components/DialogConfirmCheckOut.vue";
import DialogCatatan from "src/components/DialogCatatan.vue";
</script>

<script>
import { date } from "quasar";
import { mapActions, mapWritableState, mapState } from "pinia";
import { useCheckOutStore } from "src/stores/checkout-store";
import { usePenjualanStore } from "src/stores/penjualan-store";
import { useRotasiStore } from "src/stores/rotasi-store";
import { useAbsensiStore } from "../stores/absensi-store";
import { usePengaturanStore } from "src/stores/pengaturan-store";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(useAbsensiStore, {
      ABSENSI_struks: "struks",
    }),
    ...mapState(usePengaturanStore, {
      cashier: "cashier",
    }),
    ...mapState(useCheckOutStore, {
      getTotal: "getTotal",
      isCheckDone: "isCheckDone",
      getCheckDone: "getCheckDone",
    }),
    ...mapState(useRotasiStore, {
      ROTASI_isCheckDone: "isCheckDone",
    }),
    ...mapWritableState(usePenjualanStore, {
      items: "items",
      getItemsByStok: "getItemsByStok",
    }),
    ...mapWritableState(useCheckOutStore, {
      struk: "struk",
      struks: "struks",
    }),
    getTotalStruk() {
      return Number(this.getTotal?.qty);
    },
  },
  methods: {
    ...mapActions(useCheckOutStore, {
      addNewStruk: "addNewStruk",
      updateLocalStorage: "updateLocalStorage",
    }),
    ...mapActions(usePenjualanStore, {
      isItemOverWeight: "isItemOverWeight",
    }),
    openDialogCatatan() {
      if (!this.struk?.id)
        return this.$q.notify({
          message: "Peringatan",
          caption: "Struk tidak bisa kosong",
          icon: "warning",
          color: "negative",
          position: "top",
        });
      this.$refs.dialog_catatan?.onOpen(this.struk.catatan);
    },
    openDialogCalculatorCheckOut(item) {
      console.log(item);

      let isAbsensi = null;
      this.ABSENSI_struks.forEach((element) => {
        if (element?.cashier_id == this.cashier?.id) {
          isAbsensi = element;
        }
      });
      if (isAbsensi?.shift != "SHIFT 2") {
        return this.$q.notify({
          message: "Peringatan",
          caption: "Cek STOK AWAL harus SHIFT 2",
          icon: "warning",
          color: "negative",
          position: "top",
        });
      }

      // if (!this.ROTASI_isCheckDone)
      //   return this.$q.notify({
      //     message: "Peringatan",
      //     caption: "Wajib cek rotasi dulu",
      //     icon: "warning",
      //     color: "negative",
      //     position: "top",
      //   });

      if (Number(item?.stock) <= 0)
        return this.$q.notify({
          message: "Peringatan",
          caption: "Stok kosong",
          icon: "warning",
          color: "negative",
          position: "top",
        });

      if (this.isCheckDone)
        return this.$q.notify({
          message: "Peringatan",
          caption: "Maksimal 1 kali STOK AWAL",
          icon: "warning",
          color: "negative",
          position: "top",
        });

      this.$refs.dialog_calculator?.onOpen(item);
    },
    openDialogConfirmCheckOutPreview() {
      if (this.isCheckDone) return this.$refs.dialog_bayar?.onOpen(this.struk);
    },
    async openDialogConfirmCheckOut() {
      // if (this.getTotalStruk <= 0)
      //   return this.$q.notify({
      //     message: "Peringatan",
      //     caption: "Struk STOK AWAL kosong",
      //     icon: "warning",
      //     color: "negative",
      //     position: "top",
      //   });

      const is_item_over_weight = await this.isItemOverWeight(this.struk?.items);
      console.log("isItemOverWeight", is_item_over_weight);
      if (is_item_over_weight) return;

      this.$refs.dialog_bayar?.onOpen(this.struk);
    },
    onBubbleEventDialogCalculatorCheckOut(item) {
      console.log(this.struk);

      this.addNewStruk();

      // Anti Duplicate Item Struk
      // ======================================================
      let arr = JSON.parse(JSON.stringify(this.struk?.items));
      console.log("arr", arr);
      let temp_qty = item?.qty;
      for (var i = 0; i <= arr.length; i++) {
        if (item?.produk_id == arr[i]?.produk_id) {
          temp_qty += Number(arr[i]?.qty);
        }
      }
      arr.push(item);
      arr = this.$removeDuplicates(arr, "produk_id");
      console.log("arr 1", arr);
      for (var i = 0; i <= arr.length; i++) {
        if (item?.produk_id == arr[i]?.produk_id) {
          arr[i].qty = item?.qty; // temp_qty; // karena ini data diganti jadi langsung saja yang baru
          // arr[i].stok_awal = temp_qty; // karena ini data diganti jadi langsung saja yang baru
          // if (temp_qty > arr[i].stock) { // karena ini data diganti jadi langsung saja yang baru
          if (item?.qty > arr[i].stock) {
            return this.$q.notify({
              message: "Peringatan",
              caption: "Stok " + arr[i].name + " tidak cukup",
              icon: "warning",
              color: "negative",
              position: "top",
            });
          }
        }
      }

      console.log("arr 2", arr);
      this.struk.items = arr;
      // ======================================================

      // this.struk?.items?.push(item);
      // this.struk.stok_awal = this.getTotal?.stok_awal;
      // this.struk.stok_akhir = this.getTotal?.stok_akhir;
      // // this.struk.bill = this.getTotalStruk;
      // this.struk.qty = this.getTotal?.qty;
    },
    onBubbleEventDialogConfirmCheckOut() {},
    onBubbleEventSlideItemCheckOut(item, index) {
      this.struk?.items?.splice(index, 1);

      if (this.struk?.items.length <= 0) this.struk = null;
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
