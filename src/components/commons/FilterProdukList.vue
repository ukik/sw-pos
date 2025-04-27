<template>
  <q-btn-group class="q-mt-sm" spread>
    <q-btn
      @click="mode = 0"
      :glossy="mode == 0"
      :outline="mode != 0"
      dense
      color="red"
      label="semua"
    />
    <q-btn
      @click="mode = 1"
      :glossy="mode == 1"
      :outline="mode != 1"
      dense
      color="red"
      label="stok ada"
    />
    <q-btn
      @click="mode = 2"
      :glossy="mode == 2"
      :outline="mode != 2"
      dense
      color="red"
      label="stok habis"
    />
  </q-btn-group>
</template>

<script>
import { mapActions, mapWritableState, mapState } from "pinia";
import { usePenjualanStore } from "src/stores/penjualan-store";

export default {
  computed: {
    ...mapWritableState(usePenjualanStore, {
      mode: "mode",
    }),
  },
};
</script>
