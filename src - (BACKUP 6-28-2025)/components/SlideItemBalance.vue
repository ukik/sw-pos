<template>
  <q-slide-item ref="slide" @left="onLeft" @right="onRight" left-color="red" right-color="red">
    <template v-slot:left>
      <q-btn @click="onDelete" icon="delete" round outline></q-btn>
    </template>
    <template v-slot:right>
      <q-btn @click="onDelete" icon="delete" round outline></q-btn>
    </template>

    <q-item class="q-px-sm">
      <q-item-section>
        <q-item-label class="text-capitalize text-caption">{{ item?.keterangan }}</q-item-label>
        <q-item-label class="text-capitalize row items-center">
          <div class="col">{{ item?.status }}</div>
          <div class="col-auto text-bold">Rp. {{ item?.nominal }}</div>
        </q-item-label>

      </q-item-section>

    </q-item>
  </q-slide-item>
</template>

<script>
import { useQuasar } from "quasar";
import { onBeforeUnmount } from "vue";

export default {
  props: ["item"],
  setup() {
    const $q = useQuasar();
    let timer;

    function finalize(reset) {
      timer = setTimeout(() => {
        reset();
      }, 2000);
    }

    onBeforeUnmount(() => {
      clearTimeout(timer);
    });

    return {
      onLeft({ reset }) {
        // $q.notify("Click tumbol (X) untuk menghapus");
        finalize(reset);
      },

      onRight({ reset }) {
        // $q.notify("Click tumbol (X) untuk menghapus");
        finalize(reset);
      },
    };
  },
  watch: {
    "$refs.slide": function (val) {
      console.log(val);
    },
  },
  methods: {
    getSum(item) {
      return Number(item?.price) * Number(item?.qty);
    },
    onDelete() {
      this.$refs["slide"].reset();
      setTimeout(() => {
        this.$emit("onBubbleEvent", this.item);
      }, 500);
    },
    onAction() {
      // this.$emit("onBubbleEvent", this.item);
    },
  },
};
</script>
