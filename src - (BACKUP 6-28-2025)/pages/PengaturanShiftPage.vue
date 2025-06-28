<template>
  <q-page id="page" class="q-pa-sm items-start">
    <div class="q-col-gutter-smX rowx colX" id="content">
      <DialogPengaturanShift
        ref="dialog_shift"
        @onBubbleEvent="onBubbleEventDialogPengaturanShift"
        @onBubbleEventOK="onBubbleEventOK"
      ></DialogPengaturanShift>

      <q-list separator bordered class="col-12">
        <q-item
          v-for="(item, index) in list_shifts"
          @click="openDialogPengaturanShift(item)"
          :key="index"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <!-- <q-avatar color="primary" text-color="white"> -->
            <q-icon size="35px" color="blue-5" name="alarm"></q-icon>
            <!-- </q-avatar> -->
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-capitalize text-h6">{{ item?.nama }}</q-item-label>
            <q-item-label caption lines="1">{{ item?.description }}</q-item-label>
          </q-item-section>

          <q-item-section side style="max-width: 200px">
            <q-item class="text-right">
              <q-item-section>
                <q-item-label caption lines="1">Mulai - Selesai</q-item-label>
                <q-item-label class="text-capitalize text-h6"
                  >{{ item?.jam_mulai }} - {{ item?.jam_selesai }}</q-item-label
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

import DialogPengaturanShift from "src/components/DialogPengaturanShift.vue";
// import DialogCatatan from "src/components/DialogCatatan.vue";
</script>

<script>
import { date } from "quasar";
import { mapActions, mapWritableState, mapState } from "pinia";
// import { usePenjualanStore } from "src/stores/penjualan-store";
import { usePengaturanStore } from "src/stores/pengaturan-store";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapWritableState(usePengaturanStore, {
      list_shifts: "list_shifts",
      // struk: "struk",
    }),
  },
  methods: {
    ...mapActions(usePengaturanStore, {
      onEditShift: "onEditShift",
    }),
    openDialogPengaturanShift(item) {
      this.$refs.dialog_shift?.onOpen(item);
    },
    onBubbleEventOK(payload) {
      console.log("onBubbleEventOK", payload);
      this.onEditShift(payload);
    },

    onBubbleEventDialogPengaturanShift() {},
  },
};
</script>
