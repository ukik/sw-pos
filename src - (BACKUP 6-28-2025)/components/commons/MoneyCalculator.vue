<template>
  <q-dialog @hide="onHide" full-width persistent v-model="fixed">
    <q-card>
      <q-card-actions class="q-pa-none q-pl-xs">
        <q-toolbar class="bg-redx text-black">
          <q-toolbar-title class="text-uppercase"> KAS MODAL </q-toolbar-title>
          <q-btn v-close-popup flat round dense color="red" outline icon="close" />
        </q-toolbar>
      </q-card-actions>

      <q-separator></q-separator>

      <q-card-section class="q-pb-none">
        <q-input
          class="q-pb-md"
          mask="Rp. ###############"
          unmasked-value
          readonly
          input-class="text-h5"
          v-model="model"
          type="text"
          outlined
          :rules="[(val) => !!val || 'Wajib diisi']"
          hide-hint
        >
          <template v-slot:before>
            <span>Harga</span>
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

      <q-card-section class="scroll" style="height: calc(100vh - 100px - 150px)">
        <div class="row q-col-gutter-md full-height">
          <div class="row col q-col-gutter-sm flex justify-center q-mb-md">
            <div class="col-4">
              <q-btn @click="onAdd(1)" class="full-width full-height" dense color="dark">
                <span class="text-h4 q-py-sm">1</span>
              </q-btn>
            </div>
            <div class="col-4">
              <q-btn @click="onAdd(2)" class="full-width full-height" dense color="dark">
                <span class="text-h4 q-py-sm">2</span>
              </q-btn>
            </div>
            <div class="col-4">
              <q-btn @click="onAdd(3)" class="full-width full-height" dense color="dark">
                <span class="text-h4 q-py-sm">3</span>
              </q-btn>
            </div>
            <div class="col-4">
              <q-btn @click="onAdd(4)" class="full-width full-height" dense color="dark">
                <span class="text-h4 q-py-sm">4</span>
              </q-btn>
            </div>
            <div class="col-4">
              <q-btn @click="onAdd(5)" class="full-width full-height" dense color="dark">
                <span class="text-h4 q-py-sm">5</span>
              </q-btn>
            </div>
            <div class="col-4">
              <q-btn @click="onAdd(6)" class="full-width full-height" dense color="dark">
                <span class="text-h4 q-py-sm">6</span>
              </q-btn>
            </div>
            <div class="col-4">
              <q-btn @click="onAdd(7)" class="full-width full-height" dense color="dark">
                <span class="text-h4 q-py-sm">7</span>
              </q-btn>
            </div>
            <div class="col-4">
              <q-btn @click="onAdd(8)" class="full-width full-height" dense color="dark">
                <span class="text-h4 q-py-sm">8</span>
              </q-btn>
            </div>
            <div class="col-4">
              <q-btn @click="onAdd(9)" class="full-width full-height" dense color="dark">
                <span class="text-h4 q-py-sm">9</span>
              </q-btn>
            </div>

            <div class="col-4">
              <q-btn
                :disable="getFirstModel == 0"
                @click="onRemove"
                class="full-width full-height"
                dense
                color="pink"
              >
                <q-icon class="text-h4 q-py-sm" name="arrow_back" size="40px"></q-icon>
              </q-btn>
            </div>

            <div class="col-4">
              <q-btn
                :disable="getFirstModel == 0"
                @click="onAdd(0)"
                class="full-width full-height"
                dense
                color="dark"
              >
                <span class="text-h4 q-py-sm">0</span>
              </q-btn>
            </div>

            <div class="col-4">
              <q-btn
                :disable="getFirstModel == 0"
                @click="onAdd('00')"
                class="full-width full-height"
                dense
                color="dark"
              >
                <span class="text-h4 q-py-sm">00</span>
              </q-btn>
            </div>
          </div>

          <div class="col-3 row">
            <!-- <div class="col-12" style="height: 30%">
              <q-btn
                @click="$emit('onBubbleEventCatatan')"
                color="orange"
                class="text-h6 full-width full-height"
                icon-right="edit_document"
                label="catatan"
              />
            </div> -->
            <div class="col-12 q-pb-md" style="height: 100%">
              <q-btn @click="onClose" class="full-width full-height" dense color="teal">
                <div class="items-center no-wrap">
                  <q-icon name="check_circle" size="50px"></q-icon>
                  <div class="text-center text-h6 q-mt-sm">SELESAI</div>
                </div>
              </q-btn>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { date } from "quasar";
import { ref } from "vue";

//const timeStamp = Date.now();
//const formattedString = date.formatDate(Date.now(), "YYYY-MM-DD HH:mm:ss");

export default {
  setup() {
    return {
      fixed: ref(false),
    };
  },
  data() {
    return {
      item: {
        no_order: null,
      },
      model: 0,
    };
  },
  computed: {
    getFirstModel() {
      return this.model.toString().charAt(0);
    },
  },
  watch: {},
  methods: {
    onHide() {},
    onAdd(val) {
      let temp = this.model.toString();

      const first = temp.charAt(0);

      if (first == 0) {
        // console.log("first", first);
        if (val == "0") return;
        if (val == "00") return;

        temp = val.toString();
      } else {
        temp += val.toString();
      }

      this.model = temp.toString();
    },
    onClose() {
      // if (this.model <= 0)
      //   return this.$q.notify({
      //     message: "Peringatan",
      //     caption: "Kas Modal jangan kosong",
      //     icon: "warning",
      //     color: "negative",
      //     position: "top",
      //   });

      // if (this.model === 0) return;

      this.fixed = false;

      this.item.price = this.model;

      this.$emit("onBubbleEventOK", this.item);

      // this.$global.$emit("MainLayout", {
      //   label: "DialogBayarPenjualan",
      //   value: this.struk,
      // });
    },
    onOpen(item) {
      this.fixed = true;
      // this.item = JSON.parse(JSON.stringify(item));

      this.model = 0;
    },
    onRemove() {
      let _model = JSON.parse(JSON.stringify(this.model));
      _model = _model?.substring(0, _model.length - 1);
      this.model = _model;
      if (_model.length <= 0) return (this.model = 0);
    },
  },
};
</script>
