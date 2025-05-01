<template>
  <q-page id="page" class="q-pa-sm items-start row">
    <div class="q-col-gutter-sm row col-8" id="content">
      <DialogCalculatorMutasi
        ref="dialog_calculator"
        @onBubbleEvent="onBubbleEventDialogCalculatorMutasi"
      ></DialogCalculatorMutasi>

      <DialogConfirmMutasi
        ref="dialog_bayar"
        @onBubbleEvent="onBubbleEventDialogConfirmMutasi"
        @onBubbleEventCatatan="openDialogCatatan"
      ></DialogConfirmMutasi>

      <DialogCatatan
        @onBubbleEvent="struk.catatan = $event"
        ref="dialog_catatan"
      ></DialogCatatan>

      <div class="col-12">
        <q-banner dense class="bg-positive text-white">
          <template v-slot:avatar>
            <q-icon name="info" color="white" />
          </template>
          Stok berubah setelah konfirmasi MUTASI sukses
        </q-banner>
        <FilterProdukList></FilterProdukList>
      </div>

      <template v-for="(item, index) in getItemsByStok">
        <div class="col-4">
          <q-item
            @click="openDialogCalculatorMutasi(item)"
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

          <!-- <q-btn-group square spread>
            <q-btn
              @click="openDialogCalculatorMutasi(item)"
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
          <q-item-label class="text-center">STRUK MUTASI</q-item-label>
        </q-item-section>
      </q-item>

      <q-scroll-area
        class="border-1"
        :style="`height: calc(${$q.screen.height}px - 98px - 50px - 50px - 50px + 15px); width: 250px`"
      >
        <q-list bordered separator>
          <template v-for="(item, index) in struk?.items">
            <SlideItemPengiriman
              :item="item"
              @onBubbleEvent="onBubbleEventSlideItemPengiriman($event, index)"
            >
            </SlideItemPengiriman>
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
            @click="openDialogConfirmMutasi"
            color="pink"
            class="text-h6 full-width"
            style="height: 50px"
            label="validasi"
            icon-right="security"
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

import SlideItemPengiriman from "src/components/SlideItemPengiriman.vue";
import DialogCalculatorMutasi from "src/components/DialogCalculatorMutasi.vue";
import DialogConfirmMutasi from "src/components/DialogConfirmMutasi.vue";
import DialogCatatan from "src/components/DialogCatatan.vue";

// const items = ref();
</script>

<script>
import { date } from "quasar";
import { mapActions, mapWritableState, mapState } from "pinia";
import { useMutasiStore } from "src/stores/mutasi-store";
import { usePenjualanStore } from "src/stores/penjualan-store";

// const timeStamp = Date.now();
// const formattedString = date.formatDate(Date.now(), "YYYY-MM-DDTHH:mm:ss.SSSZ");

// console.log(formattedString);

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(useMutasiStore, {
      // getStruk: "getStruk",
      // getTotalStruk: "getTotalStruk",
      // getStruksLength: "getStruksLength",
      getTotal: "getTotal",
    }),
    ...mapWritableState(usePenjualanStore, {
      items: "items",
      getItemsByStok: "getItemsByStok",
    }),
    ...mapWritableState(useMutasiStore, {
      struk: "struk",
      struks: "struks",
    }),
    // getTotal() {
    //   let sum = {
    //     stock: 0,
    //     qty: 0,
    //   };
    //   this.struk?.items?.forEach((element) => {
    //     sum.stock += element?.stock;
    //     sum.qty += element?.qty;
    //   });

    //   console.log(sum);

    //   return sum;
    // },
    getTotalStruk() {
      return Number(this.getTotal?.qty);
    },
  },
  methods: {
    ...mapActions(useMutasiStore, {
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
    openDialogCalculatorMutasi(item) {
      console.log(item);

      if (Number(item?.stock) <= 0)
        return this.$q.notify({
          message: "Peringatan",
          caption: "Stok kosong",
          icon: "warning",
          color: "negative",
          position: "top",
        });

      this.$refs.dialog_calculator?.onOpen(item);
    },
    async openDialogConfirmMutasi() {
      if (this.getTotalStruk <= 0)
        return this.$q.notify({
          message: "Peringatan",
          caption: "Struk pengiriman kosong",
          icon: "warning",
          color: "negative",
          position: "top",
        });

      const is_item_over_weight = await this.isItemOverWeight(this.struk?.items);
      console.log("isItemOverWeight", is_item_over_weight);
      if (is_item_over_weight) return;

      this.$refs.dialog_bayar?.onOpen(this.struk);
    },
    onBubbleEventDialogCalculatorMutasi(item) {
      console.log(this.struk, item);

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
      for (var i = 0; i <= arr.length; i++) {
        if (item?.produk_id == arr[i]?.produk_id) {
          arr[i].qty = temp_qty;
          arr[i].stok_awal = temp_qty;
          if (temp_qty > arr[i].stock) {
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

      console.log("arr", arr);
      this.struk.items = arr;
      // ======================================================

      // this.struk?.items?.push(item);

      // this.struk.qty = this.getTotal?.qty;
      // this.struk.stok_awal = this.getTotal?.stok_awal;
      // this.struk.stok_akhir = this.getTotal?.stok_akhir;

      // this.items.forEach((el) => {
      //   if (item?.id == el?.id) {
      //     el.stock = Number(el?.stock) - Number(item?.qty);
      //   }
      // });

      // localStorage.setItem("MUTASI-STRUK", JSON.stringify(this.struk));
    },
    onBubbleEventDialogConfirmMutasi() {},
    onBubbleEventSlideItemPengiriman(item, index) {
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
