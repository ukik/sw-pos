<template>
  <q-page id="page" class="q-pa-sm items-start">
    <DialogPengaturanOutlet
      ref="dialog_outlet"
      @onBubbleEvent="onBubbleEventDialogPengaturanOutlet"
      @onBubbleEventOK="onBubbleEventOK"
    ></DialogPengaturanOutlet>

    <q-card flat bordered rounded>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-input outlined readonly label="Nama" v-model="cabang.nama" />
          </div>
          <div class="col-12">
            <q-input
              clearable
              outlined
              readonly
              type="textarea"
              autogrow
              label="Alamat"
              v-model="cabang.alamat"
            />
          </div>
        </div>
      </q-card-section>

      <q-separator></q-separator>
      <q-card-actions align="center" class="bg-white text-teal">
        <q-btn
          @click="openDialogPengaturanOutlet"
          outline
          label="SUNTING"
          icon="edit"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { usePengaturanStore } from "src/stores/pengaturan-store";
import DialogPengaturanOutlet from "src/components/DialogPengaturanOutlet.vue";

export default {
  components: {
    DialogPengaturanOutlet,
  },
  data() {
    return {};
  },
  computed: {
    ...mapWritableState(usePengaturanStore, {
      cabang: "cabang",
    }),
  },
  methods: {
    ...mapActions(usePengaturanStore, {}),
    openDialogPengaturanOutlet() {
      this.$refs.dialog_outlet?.onOpen(this.cabang);
    },
    onBubbleEventOK(payload) {
      console.log("onBubbleEventOK", payload);
      this.cabang = payload;
    },

    onBubbleEventDialogPengaturanOutlet() {},
  },
};
</script>
