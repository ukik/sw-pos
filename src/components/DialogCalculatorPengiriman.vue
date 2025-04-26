<template>
  <q-dialog full-width full-height :persistent="false" v-model="fixed">
    <q-card>
      <q-card-actions align="between" class="bg-swx overflow-hidden q-pa-none q-pl-xs">
        <q-toolbar>
          <q-toolbar-title>PENGIRIMAN</q-toolbar-title>
          <q-btn @click="fixed = false" flat dense color="negative" rounded icon="close">
          </q-btn>
        </q-toolbar>
      </q-card-actions>

      <q-separator />

      <q-card-section align="" class="row">
        <q-list class="col row" color="white" bordered>
          <q-item class="col-3 q-pa-sm" dense>
            <q-item-section>
              <q-item-label caption>Nama Produk</q-item-label>
              <q-item-label class="text-capitalize">{{ item?.name }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item class="col-3 q-pa-sm" dense>
            <q-item-section>
              <q-item-label caption>Stok Awal</q-item-label>
              <q-item-label>{{ item?.stock }} kg</q-item-label>
            </q-item-section>
          </q-item>

          <q-item class="col-3 q-pa-sm" dense>
            <q-item-section>
              <q-item-label caption>Stok Masuk</q-item-label>
              <q-item-label>{{ getStokBaru }} kg</q-item-label>
            </q-item-section>
          </q-item>

          <q-item class="col-3 q-pa-sm" dense>
            <q-item-section>
              <q-item-label caption>Stok Akhir</q-item-label>
              <q-item-label lines="1">{{ getStokAkhir }} kg</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-separator></q-separator>

      <q-card-section>
        <q-input readonly v-model="model" type="text" input-class="text-h5" outlined>
          <template v-slot:append>
            <span class="text-h6">kg</span>
          </template>
          <template v-slot:before>
            <span>Berat</span>
          </template>
          <template v-slot:after>
            <q-btn
              v-if="model !== '0'"
              @click="model = '0'"
              color="red"
              class="full-height full-width"
              icon="delete"
            ></q-btn>
          </template>
        </q-input>
      </q-card-section>

      <q-separator />

      <q-card-section
        style="height: calc(100% - 86.2px - 88px - 25px - 30px)"
        class="scroll"
      >
        <div class="row q-col-gutter-md">
          <div class="row col q-col-gutter-sm flex justify-center">
            <div class="col-4">
              <q-btn @click="onAdd(1)" class="full-width" dense color="dark">
                <span class="text-h4 q-py-sm">1</span>
              </q-btn>
            </div>
            <div class="col-4">
              <q-btn @click="onAdd(2)" class="full-width" dense color="dark">
                <span class="text-h4 q-py-sm">2</span>
              </q-btn>
            </div>
            <div class="col-4">
              <q-btn @click="onAdd(3)" class="full-width" dense color="dark">
                <span class="text-h4 q-py-sm">3</span>
              </q-btn>
            </div>
            <div class="col-4">
              <q-btn @click="onAdd(4)" class="full-width" dense color="dark">
                <span class="text-h4 q-py-sm">4</span>
              </q-btn>
            </div>
            <div class="col-4">
              <q-btn @click="onAdd(5)" class="full-width" dense color="dark">
                <span class="text-h4 q-py-sm">5</span>
              </q-btn>
            </div>
            <div class="col-4">
              <q-btn @click="onAdd(6)" class="full-width" dense color="dark">
                <span class="text-h4 q-py-sm">6</span>
              </q-btn>
            </div>
            <div class="col-4">
              <q-btn @click="onAdd(7)" class="full-width" dense color="dark">
                <span class="text-h4 q-py-sm">7</span>
              </q-btn>
            </div>
            <div class="col-4">
              <q-btn @click="onAdd(8)" class="full-width" dense color="dark">
                <span class="text-h4 q-py-sm">8</span>
              </q-btn>
            </div>
            <div class="col-4">
              <q-btn @click="onAdd(9)" class="full-width" dense color="dark">
                <span class="text-h4 q-py-sm">9</span>
              </q-btn>
            </div>

            <div class="col-4">
              <q-btn
                :disable="model === '0'"
                @click="onRemove"
                class="full-width"
                dense
                color="pink"
              >
                <q-icon class="text-h4 q-py-sm" name="arrow_back" size="40px"></q-icon>
              </q-btn>
            </div>

            <div class="col-4">
              <q-btn @click="onAdd(0)" class="full-width" dense color="dark">
                <span class="text-h4 q-py-sm">0</span>
              </q-btn>
            </div>

            <div class="col-4">
              <q-btn
                @click="onAdd(',')"
                :disable="is_btn_comma_used"
                class="full-width"
                dense
                color="primary"
              >
                <q-badge v-if="is_btn_comma_used" color="red" floating
                  >Maksimal 1</q-badge
                >
                <span class="text-h4 q-py-sm">,</span>
              </q-btn>
            </div>
          </div>

          <div class="col-3">
            <q-btn @click="onClose" class="full-width full-height" dense color="teal">
              <div class="items-center no-wrap">
                <q-icon name="check_circle" size="50px"></q-icon>
                <div class="text-center text-h6 q-mt-sm">SELESAI</div>
              </div>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";

import { mapState } from "pinia";
import { usePengirimanStore } from "src/stores/pengiriman-store";

export default {
  setup() {
    return {
      fixed: ref(false),
    };
  },
  data() {
    return {
      item: null,
      model: "0",
      is_btn_comma_used: false,
    };
  },
  // mounted() {
  //   this.isBtnCommaUsed();
  // },
  computed: {
    ...mapState(usePengirimanStore, ["getStrukItemID"]),
    getStokAkhir() {
      let _model = JSON.parse(JSON.stringify(this.model));
      _model = _model.replace(",", ".");

      return Number(this.item?.stock) + Number(_model);
    },
    getStokBaru() {
      let _model = JSON.parse(JSON.stringify(this.model));
      return _model.replace(",", ".");
    },
  },
  watch: {
    model(val) {
      this.isBtnCommaUsed();
    },
  },
  methods: {
    isBtnCommaUsed() {
      this.is_btn_comma_used = this.model?.includes(",") ? true : false;
    },
    onAdd(val) {
      let temp = "";
      temp = this.model.toString();

      if (temp == "0") {
        if (val !== ",") {
          temp = "";
        }
      }

      temp += val.toString();

      this.model = temp.toString();
    },
    onClose() {
      let _model = JSON.parse(JSON.stringify(this.model));
      _model = _model.replace(",", ".");

      if (_model === "0")
        return this.$q.notify({
          message: "Peringatan",
          caption: "Tidak boleh kosong",
          icon: "warning",
          color: "negative",
          position: "top",
        });

      this.fixed = false;

      this.$emit("onBubbleEvent", {
        ...this.item,
        id: this.getStrukItemID,
        produk_id: this.item?.id,
        qty: Number(_model),
        stok_awal: Number(this.item?.stock),
        stok_akhir: Number(this.item?.stock) + Number(_model),
      });
    },
    onOpen(item) {
      this.fixed = true;
      this.item = item;

      this.model = "0";
    },
    onRemove() {
      let _model = JSON.parse(JSON.stringify(this.model));
      _model = _model.substring(0, _model.length - 1);

      if (_model.length <= 0) return (this.model = "0");
      this.model = _model;
    },
  },
};
</script>
