<template>
  <q-page id="page" class="q-pa-sm items-start">
    <DialogPengaturanCourir
      @onBubbleEventOK="onBubbleEventOK"
      ref="dialog_pengaturan_courir"
    >
    </DialogPengaturanCourir>

    <q-card-section
      v-if="list_courirs.length <= 0"
      class="flex flex-center"
      style="height: calc(100% - 50px)"
    >
      <q-img style="width: 200px; height: 200px" src="images/no-data.png"></q-img>
    </q-card-section>

    <div v-else class="q-col-gutter-sm row col">
      <template v-for="(item, i) in list_courirs">
        <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 col-6">
          <q-card @click="openDialogPengaturanCourir(item, 'UPDATE')" clickable v-ripple>
            <q-img style="height: 325px" :src="item?.foto ? item?.foto : $defaultImage" />
            <q-separator></q-separator>

            <q-card-section>
              <div class="text-h6">{{ item?.nama }}</div>
            </q-card-section>

            <!-- <q-separator></q-separator> -->

            <!-- <q-card-section>
              <div class="text-caption">Alamat</div>
              <div class="text-subtitle2">{{ item?.alamat }}</div>
            </q-card-section> -->
          </q-card>
        </div>
      </template>
    </div>

    <!-- <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        @click="openDialogPengaturanCourir(null, 'CREATE')"
        fab
        icon="add"
        color="sw"
      />
    </q-page-sticky> -->
  </q-page>
</template>

<script setup>
import { ref } from "vue";

import DialogPengaturanCourir from "src/components/DialogPengaturanCourir.vue";
</script>

<script>
import { date } from "quasar";
import { mapActions, mapWritableState, mapState } from "pinia";
import { usePenjualanStore } from "src/stores/penjualan-store";
import { usePengaturanStore } from "src/stores/pengaturan-store";

export default {
  data() {
    return {
      tipe: null,
    };
  },
  computed: {
    ...mapWritableState(usePenjualanStore, {
      items: "items",
      // struk: "struk",
    }),
    ...mapWritableState(usePengaturanStore, {
      list_courirs: "list_courirs",
    }),
  },
  methods: {
    ...mapActions(usePengaturanStore, {
      onEditCourir: "onEditCourir",
    }),

    openDialogPengaturanCourir(payload, tipe) {
      this.tipe = tipe;
      this.$refs.dialog_pengaturan_courir?.onOpen(payload);
    },
    onBubbleEventOK(payload) {
      this.onEditCourir(payload, this.tipe);
      return;

      let temp = JSON.parse(JSON.stringify(this.list_courirs));
      let _temp = JSON.parse(JSON.stringify(payload));

      console.log("onBubbleEventOK XXXXXXX", _temp);

      // kalo foreach gak bisa, ini bisa
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].id == _temp.id) {
          temp[i] = _temp;
          console.log("onBubbleEventOK 1111", temp[i], _temp);
        }
      }

      console.log("onBubbleEventOK zzzzzzz", temp);

      this.list_courirs = temp;
    },
  },
};
</script>
