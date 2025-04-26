<template>
  <q-dialog position="top" persistent full-width v-model="medium">
    <q-card class="q-mt-md" style="width: 700px; max-width: 80vw">
      <q-card-section class="bg-sw text-white q-py-none">
        <q-toolbar class="q-px-none">
          <q-toolbar-title>
            <div class="text-h6">CATATAN TAMBAHAN</div>
          </q-toolbar-title>

          <q-btn v-close-popup flat dense color="white" rounded icon="close"></q-btn>
        </q-toolbar>
      </q-card-section>
      <q-separator></q-separator>

      <q-card-section style="height: calc(100% - 55px - 50px)">
        <q-input
          clearable
          dense
          outlined
          type="textarea"
          rows="5"
          hint="Tambahkan catatan jika perlu"
          v-model="text"
        />
      </q-card-section>

      <q-separator></q-separator>
      <q-card-actions align="center" class="bg-white text-teal">
        <q-btn @click="onSave" outline label="SIMPAN" icon="check_circle" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return {
      medium: false,
      text: null,
    };
  },
  methods: {
    onOpen(item) {
      this.medium = true;
      this.text = item;
    },
    onSave() {
      this.$emit("onBubbleEvent", this.text);
    },
  },
};
</script>
