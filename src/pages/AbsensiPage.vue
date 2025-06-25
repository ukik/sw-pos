<template>
  <q-page id="page" class="q-pa-sm items-start">
    <DialogAbsensi
      :dialog="medium"
      ref="dialog_absensi"
      @onBubbleEvent="onBubbleEventDialogAbsensi"
    ></DialogAbsensi>

    <DialogPengaturanCashier
      @onBubbleEventOK="onBubbleEventOK"
      ref="dialog_pengaturan_cashier"
    >
    </DialogPengaturanCashier>

    <!-- <q-dialog persistent full-width full-height v-model="medium"> xxxxxxx </q-dialog> -->
    <div class="q-col-gutter-smX rowx colX">
      <div class="col-12 q-mb-sm row q-col-gutter-sm">
        <div class="col-12">
          <!-- <q-btn label="DELETE LOCAL STORAGE" @click="deleteLocalStorage"></q-btn> -->
          <q-banner
            inline-actions
            dense
            class="bg-white border-1 shadow-1 full-height text-white rounded-borders"
          >
            <q-item @click="onGantiKasir" clickable v-ripple dense class="q-px-sm">
              <q-badge floating>Klik untuk mengganti KASIR PIKET</q-badge>
              <q-item-section avatar>
                <q-avatar>
                  <img :src="cashier?.foto ? cashier?.foto : $defaultImage1" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label caption class="text-dark">KASIR PIKET</q-item-label>
                <q-item-label class="text-capitalize text-h6 text-dark">{{
                  cashier?.nama ? cashier?.nama : "Piket Kosong"
                }}</q-item-label>
              </q-item-section>
            </q-item>
            <!-- <template v-slot:action>
              <q-btn icon="support_agent" outline label="ganti piket" />
            </template> -->
          </q-banner>
        </div>
        <div class="col">
          <q-banner dense class="bg-red full-height text-white">
            <template v-slot:avatar>
              <q-icon name="warning" color="white" />
            </template>
            Wajib absensi datang dan pulang
            <!-- {{ list_cashiers }} -->
          </q-banner>
        </div>
        <!-- <div class="col-auto">
          <q-btn
            unelevated
            color="positive"
            label="konfirmasi"
            icon="alarm"
            class="full-height"
          />
        </div> -->
        <div class="col-auto flex flex-center">
          <q-btn
            unelevated
            class="full-height"
            :label="`Filter ${today}`"
            icon="event"
            color="primary"
          >
            <q-popup-proxy
              :breakpoint="768"
              v-model="proxy"
              @before-show="updateProxy"
              :cover="false"
              transition-show="scale"
              transition-hide="scale"
            >
              <DatePicker :prop_date="today" @onBubbleEvent="onBubbleEvent"></DatePicker>
            </q-popup-proxy>
          </q-btn>
        </div>
      </div>

      <q-list separator bordered class="col-12">
        <q-item-label class="text-left" header>ABSENSI DATANG</q-item-label>
        <q-separator></q-separator>

        <template v-for="(item, index) in getListCashier">
          <q-separator v-if="index > 0"></q-separator>
          <div class="row">
            <div class="col-auto q-ma-sm">
              <div>
                <q-btn
                  @click="openDialogPengaturanCashier(item, 'UPDATE')"
                  icon="person"
                  class="full-height"
                  color="primary"
                ></q-btn>
              </div>
              <div class="q-mt-sm">
                <q-btn
                  @click="openDialogAbsensi(item, 'ABSENSI DATANG')"
                  icon="edit"
                  class="full-height"
                  color="positive"
                ></q-btn>
              </div>
            </div>
            <!-- <q-separator vertical></q-separator>
            <div class="col-auto q-ma-sm">
              <q-btn
                @click="openDialogAbsensi(item, 'ABSENSI DATANG')"
                icon="edit"
                class="full-height"
                color="positive"
              ></q-btn>
            </div> -->
            <q-separator vertical></q-separator>
            <q-item
              class="col"
              @click="openDialogAbsensi(item, 'ABSENSI DATANG')"
              :key="index"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-avatar>
                  <img
                    :src="item?.absensi?.foto ? item?.absensi?.foto : $defaultImage1"
                  />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-capitalize text-h6"
                  >{{ item?.nama }}

                  <template v-if="item?.id == cashier?.id">
                    <q-chip
                      class="text-body2"
                      icon="done"
                      color="green"
                      text-color="white"
                      >KASIR PIKET</q-chip
                    >
                  </template>
                </q-item-label>
                <q-item-label
                  >Modal Awal: Rp. {{ item?.absensi?.modal_awal }}</q-item-label
                >
                <q-item-label caption
                  >Catatan Masuk: {{ item?.absensi?.catatan_masuk }}</q-item-label
                >
              </q-item-section>

              <q-item-section side style="max-width: 200px">
                <q-item class="text-right">
                  <q-item-section>
                    <q-item-label class="text-dark" lines="1">{{
                      item?.absensi?.shift
                    }}</q-item-label>
                    <q-item-label caption lines="1">Jam Masuk</q-item-label>
                    <q-item-label class="text-capitalize text-h6">{{
                      item?.absensi?.jam_mulai
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-item-section>
            </q-item>
          </div>
        </template>
      </q-list>
      <q-list separator bordered class="col-12 q-mt-sm">
        <q-item-label class="text-left" header>ABSENSI PULANG</q-item-label>
        <q-separator></q-separator>

        <template v-for="(item, index) in getListCashier">
          <q-separator v-if="index > 0"></q-separator>
          <div class="row">
            <div class="col-auto q-ma-sm">
              <div>
                <q-btn
                  @click="openDialogPengaturanCashier(item, 'UPDATE')"
                  icon="person"
                  class="full-height"
                  color="primary"
                ></q-btn>
              </div>
              <div class="q-mt-sm">
                <q-btn
                  @click="openDialogAbsensi(item, 'ABSENSI PULANG')"
                  icon="edit"
                  class="full-height"
                  color="positive"
                ></q-btn>
              </div>
            </div>
            <q-separator vertical></q-separator>
            <!-- <div class="col-auto q-ma-sm">
              <q-btn
                @click="openDialogPengaturanCashier(item, 'UPDATE')"
                icon="person"
                class="full-height"
                color="primary"
              ></q-btn>
            </div>
            <q-separator vertical></q-separator>
            <div class="col-auto q-ma-sm">
              <q-btn
                @click="openDialogAbsensi(item, 'ABSENSI PULANG')"
                icon="edit"
                class="full-height"
                color="positive"
              ></q-btn>
            </div>
            <q-separator vertical></q-separator> -->
            <q-item
              @click="openDialogAbsensi(item, 'ABSENSI PULANG')"
              :key="index"
              clickable
              v-ripple
              class="col"
            >
              <q-item-section avatar>
                <q-avatar>
                  <img
                    :src="item?.absensi?.foto ? item?.absensi?.foto : $defaultImage1"
                  />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-capitalize text-h6"
                  >{{ item?.nama }}
                  <template v-if="item?.id == cashier?.id">
                    <q-chip
                      class="text-body2"
                      icon="done"
                      color="green"
                      text-color="white"
                      >KASIR PIKET</q-chip
                    >
                  </template>
                </q-item-label>
                <q-item-label
                  >Modal Awal: Rp. {{ item?.absensi?.modal_awal }}</q-item-label
                >
                <q-item-label caption
                  >Catatan Pulang: {{ item?.absensi?.catatan_pulang }}</q-item-label
                >
              </q-item-section>

              <q-item-section side style="max-width: 200px">
                <q-item class="text-right">
                  <q-item-section>
                    <q-item-label class="text-dark" lines="1">{{
                      item?.absensi?.shift
                    }}</q-item-label>

                    <q-item-label caption lines="1">Jam Selesai</q-item-label>
                    <q-item-label class="text-capitalize text-h6">{{
                      item?.absensi?.jam_selesai
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-item-section>
            </q-item>
          </div>
        </template>
        <!-- <q-card-section class="flex flex-center" style="height: calc(100% - 50px)">
          <q-img style="width: 200px; height: 200px" src="images/no-data.png"></q-img>
        </q-card-section> -->
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
</script>

<script>
import { ref } from "vue";
import { date } from "quasar";
import { mapActions, mapWritableState, mapState } from "pinia";
// import { usePenjualanStore } from "src/stores/penjualan-store";
import { usePengaturanStore } from "src/stores/pengaturan-store";
import DatePicker from "./AbsensiPage/DatePicker.vue";
import { useAbsensiStore } from "src/stores/absensi-store";
import DialogAbsensi from "src/components/DialogAbsensi.vue";
import DialogPengaturanCashier from "src/components/DialogPengaturanCashier.vue";

const timeStamp = Date.now();
const formattedString = date.formatDate(Date.now(), "YYYY/MM/DD");
const waktuString = date.formatDate(Date.now(), "HH:mm:ss");

export default {
  components: {
    DatePicker,
    DialogAbsensi,
    DialogPengaturanCashier,
  },
  setup() {
    return {
      updateProxy() {},
    };
  },
  emits: ["onBubbleEvent"],
  data() {
    return {
      today: "",
      proxy: false,
      medium: false,
      tipe: null,
    };
  },
  async mounted() {
    this.today = date.formatDate(Date.now(), "YYYY/MM/DD");

    // await this.$nextTick()
    // if (!this.cashier?.id) {
    //   this.$global.$emit("MainLayout", {
    //     label: "DialogGantiKasir",
    //   });
    // }

    if (this.list_cashiers?.length <= 0) {
      this.$refs.dialog_pengaturan_cashier?.onOpen(null);
    }
  },
  computed: {
    ...mapState(usePengaturanStore, {
      list_cashiers: "list_cashiers",
      cabang: "cabang",
      cashier: "cashier",
    }),
    ...mapWritableState(useAbsensiStore, {
      struks: "struks",
      struk: "struk",
    }),
    ...mapState(useAbsensiStore, {
      // getLocalStorageStruks: "getLocalStorageStruks",
    }),
    getStruksEmpty() {
      return this.struks?.length <= 0 ? false : true;
    },
    getListCashier() {
      let temp = JSON.parse(JSON.stringify(this.list_cashiers));

      for (let i = 0; i < temp.length; i++) {
        const el1 = temp[i];
        for (let j = 0; j < this.struks.length; j++) {
          const el2 = this.struks[j];
          if (el2?.cashier?.id == el1.id) {
            el1["absensi"] = el2;

            console.log(el1);
          }
        }
      }
      // temp.forEach((el1) => {
      //   this.struks.forEach((el2) => {
      //     console.log("xxxxxx", el2.id == el1.id);
      //     // if (el2.id == el1.id) {
      //     //   el1["absensi"] = el2;
      //     // }
      //   });
      // });

      console.log("getListCashier", temp);

      return temp;
    },
  },
  watch: {
    today() {
      setTimeout(() => {
        this.proxy = false;
      }, 300);
    },
  },
  methods: {
    ...mapActions(useAbsensiStore, {
      loadLocalStorageStruks: "loadLocalStorageStruks",
      addNewStruk: "addNewStruk",
      deleteLocalStorage: "deleteLocalStorage",
    }),
    ...mapActions(usePengaturanStore, {
      onEditCashier: "onEditCashier",
    }),
    onGantiKasir() {
      this.$global.$emit("MainLayout", {
        label: "DialogGantiKasir",
      });
    },
    openDialogPengaturanCashier(payload, tipe) {
      this.tipe = tipe;
      this.$refs.dialog_pengaturan_cashier?.onOpen(payload);
    },
    async openDialogAbsensi(item, title) {
      console.log(item?.id, this.cashier?.id, this.item?.id != this.cashier?.id);

      // this.$refs.dialog_absensi?.onOpen();

      if (!this.cashier?.id) {
        this.$global.$emit("MainLayout", {
          label: "DialogGantiKasir",
        });

        return this.$q.notify({
          message: "Peringatan",
          caption: "Pilih kasir piket",
          icon: "warning",
          color: "negative",
          position: "top",
        });
      }

      // if (item?.id != this.cashier?.id) {
      //   return this.$q.notify({
      //     message: "Peringatan",
      //     caption: "Harus sesuai dengan KASIR PIKET",
      //     icon: "warning",
      //     color: "negative",
      //     position: "top",
      //   });
      // }

      let temp = {};

      // await this.$nextTick(() => {
      if (item?.id == this.struk?.cashier_id) {
        temp = this.struk;
        temp["cashier"] = item;
      } else {
        this.addNewStruk();
        temp = this.struk;
      }

      this.struk.cashier_id = item.id;

      if (item?.absensi) temp = item;

      console.log("openDialogAbsensi", temp, item?.absensi);
      // });

      // alert(JSON.stringify(temp));
      // this.$refs.dialog_absensi?.onOpen();
      this.$refs.dialog_absensi?.onOpen(temp, title);
    },
    onBubbleEvent(payload) {
      console.log("onBubbleEvent", payload);
      this.loadLocalStorageStruks(payload?.split("/").join("-"));
      this.today = payload;
    },
    onBubbleEventDialogAbsensi() {},
    onBubbleEventOK(payload) {
      this.onEditCashier(payload, this.tipe);
      return;
    },
  },
};
</script>
