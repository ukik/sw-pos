<template>
  <q-dialog @hide="onHide" full-width full-height :persistent="false" v-model="fixed">
    <q-card>
      <q-card-actions class="q-pa-none q-pl-xs">
        <q-toolbar class="bg-redx text-black">
          <q-toolbar-title> PEMBAYARAN </q-toolbar-title>
          <q-btn v-close-popup flat round dense color="red" outline icon="close" />
        </q-toolbar>
      </q-card-actions>

      <q-separator></q-separator>

      <q-card-section class="q-py-none">
        <q-form class="row q-col-gutter-md">
          <div class="col-4">
            <q-input
              borderless
              readonly
              input-class="text-h6"
              v-model="balance"
              label="Saldo"
            >
              <template v-slot:prepend> Rp. </template>
            </q-input>
          </div>
          <div class="col-4">
            <q-input
              borderless
              readonly
              input-class="text-h6"
              v-model="getTotalStruk"
              label="Tagihan"
            >
              <template v-slot:prepend> Rp. </template>
            </q-input>
          </div>
          <div class="col-4">
            <q-input
              borderless
              readonly
              input-class="text-h6"
              v-model="getChangeLabel"
              label="Kembalian"
            >
              <template v-slot:prepend> Rp. </template>
            </q-input>
          </div>
        </q-form>
      </q-card-section>

      <q-separator></q-separator>

      <q-card-section>
        <q-input
          mask="Rp. ###############"
          unmasked-value
          readonly
          input-class="text-h5"
          v-model="model"
          type="text"
          outlined
        >
          <template v-slot:before>
            <span>Bayar</span>
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
        style="height: calc(100% - 86.2px - 88px - 25px)"
        class="scroll q-pb-none"
      >
        <div class="row q-col-gutter-md full-height">
          <div class="row col q-col-gutter-sm flex justify-center">
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

      <!-- <q-separator /> -->

      <!-- <q-card-actions align="right" class="bg-sw text-white overflow-hidden row">
        <div class="col-auto">
          <q-btn @click="fixed = false" color="white" outline label="Tutup" icon="close">
          </q-btn>
        </div>
        <q-item class="q-pa-none col text-right">
          <q-item-section>
            <q-item-label>Sub-Total</q-item-label>
            <q-item-label class="text-h6" lines="1"
              >{{ model }} kg x Rp. {{ item?.price }} = Rp. {{ getSum }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-actions> -->
    </q-card>
  </q-dialog>
</template>

<script>
import { date } from "quasar";

import { mapActions, mapState, mapWritableState } from "pinia";
import { usePengaturanStore } from "src/stores/pengaturan-store";
import { usePenjualanStore } from "src/stores/penjualan-store";
import { ref } from "vue";

function uuidv4() {
  return "100000".replace(/[018]/g, (c) =>
    // return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16)
  );
}

const timeStamp = Date.now();
const formattedString = date.formatDate(timeStamp, "YYYY-MM-DD HH:mm:ss");
// const formattedString = date.formatDate(timeStamp, "YYYY-MM-DDTHH:mm:ss.SSSZ");

export default {
  setup() {
    return {
      fixed: ref(false),
    };
  },
  data() {
    return {
      item: null,
      model: 0,
      is_btn_comma_used: false,
      // form: {
      //   balance: 0,
      //   bill: 0,
      //   bayar: 0,
      //   change: 0,
      // },
    };
  },
  computed: {
    ...mapState(usePenjualanStore, {
      getTotalStruk: "getTotalStruk",
      getStruksLength: "getStruksLength",
      getTotal: "getTotal",
    }),
    ...mapWritableState(usePenjualanStore, {
      struk: "struk",
      struks: "struks",
      invoice: "invoice",
    }),
    ...mapWritableState(usePengaturanStore, {
      balance: "balance",
    }),
    getChange() {
      if (!this.struk?.bayar) return 0;
      return this.struk?.bayar - this.getTotalStruk;
    },
    getChangeLabel() {
      return this.getChange < 0 ? "Tidak Cukup" : this.getChange;
    },
    getFirstModel() {
      return this.model.toString().charAt(0);
    },
  },
  watch: {
    model(val) {
      this.struk.bayar = val;
    },
  },
  methods: {
    ...mapActions(usePenjualanStore, {
      addItemToStruk: "addItemToStruk",
    }),
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
      if (this.getChange < 0 || this.model <= 0)
        return this.$q.notify({
          message: "Peringatan",
          caption: "Uang dibayar kurang",
          icon: "warning",
          color: "negative",
          position: "top",
        });

      this.fixed = false;

      if (this.model === 0) return;

      const _struk = {
        ...this.item,
        // id: this.getStruksLength + 1,
        // code: "#" + uuidv4(),
        // type: "penjualan",
        // cashier: "Nina",
        // shift: "A",
        // status: "",
        balance: this.balance,
        bill: this.getTotalStruk,
        bayar: this.model,
        change: this.getChange,
        qty: this.getTotal?.qty,
        created_at: formattedString,
      };

      this.struk = _struk;

      this.addItemToStruk();

      // this.$emit("onBubbleEvent", _struk);

      this.$global.$emit("MainLayout", {
        label: "DialogBayarPenjualan",
        value: this.struk,
      });

      this.struk = null;

      // localStorage.clear("PENJUALAN-STRUK");

      // const vm = this;

      // this.$swal({
      //   // position: "top-end",
      //   icon: "success",
      //   title: "Penjualan Selesai",
      //   text: `Struk diterbitkan ${_struk?.created_at}`,
      //   showConfirmButton: true,
      //   confirmButtonText: `${_struk.code}`,
      //   // timer: 1500,
      //   allowOutsideClick: () => {
      //     const popup = Swal.getPopup();
      //     popup.classList.remove("swal2-show");
      //     setTimeout(() => {
      //       popup.classList.add("animate__animated", "animate__headShake");
      //     });
      //     setTimeout(() => {
      //       popup.classList.remove("animate__animated", "animate__headShake");
      //     }, 500);
      //     return false;
      //   },
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //     vm.$router.push({
      //       name: "riwayat_penjualan",
      //     });
      //   }
      // });
    },
    onOpen(item) {
      this.fixed = true;
      this.item = item;

      this.model = 0;

      console.log("this.getStruksLength + 1,", this.getStruksLength + 1);
      console.log("onOpen", this.struks);
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
