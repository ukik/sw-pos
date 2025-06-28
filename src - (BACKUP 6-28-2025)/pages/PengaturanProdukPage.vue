<template>
  <q-page id="page" class="q-pa-sm items-start">
    <div class="q-col-gutter-smX rowx colX">
      <DialogPengaturanProduk
        ref="dialog_produk"
        @onBubbleEvent="onBubbleEventDialogPengaturanProduk"
        @onBubbleEventOK="onBubbleEventOK"
      ></DialogPengaturanProduk>

      <q-list separator bordered class="col-12">
        <q-item
          v-for="(item, index) in items"
          @click="openDialogPengaturanProduk(item)"
          :key="index"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-avatar size="md" color="primary" text-color="white">
              {{ item?.no_order }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-capitalize text-h6">{{ item?.name }}</q-item-label>
            <q-item-label caption lines="1">Stok: {{ item?.stock }} kg</q-item-label>
          </q-item-section>

          <q-item-section side style="max-width: 200px">
            <q-item class="text-right">
              <q-item-section>
                <q-item-label caption class="">HARGA</q-item-label>
                <q-item-label class="text-h6" lines="1"
                  >Rp. {{ item?.price }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

import DialogPengaturanProduk from "src/components/DialogPengaturanProduk.vue";
import DialogCatatan from "src/components/DialogCatatan.vue";
</script>

<script>
import { date } from "quasar";
import { mapActions, mapWritableState, mapState } from "pinia";
import { usePenjualanStore } from "src/stores/penjualan-store";
import { usePengaturanStore } from "src/stores/pengaturan-store";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapWritableState(usePenjualanStore, {
      items: "items",
      // struk: "struk",
    }),
  },
  methods: {
    ...mapActions(usePenjualanStore, {
      onEditProduct: "onEditProduct",
    }),
    openDialogPengaturanProduk(item) {
      this.$refs.dialog_produk?.onOpen(item);
    },
    onBubbleEventOK(payload) {
      console.log("onBubbleEventOK", payload);
      this.onEditProduct(payload);
    },

    onBubbleEventDialogPengaturanProduk() {},
  },
};
</script>
