<template>
  <q-dialog :persistent="false" full-width :full-height="!isCheckDone" v-model="fixed">
    <q-card>
      <q-form @submit="onSubmit">
        <q-card-actions class="q-pa-none q-pl-xs">
          <q-toolbar class="bg-redx text-black">
            <q-toolbar-title> KONFIRMASI CEK ROTASI </q-toolbar-title>
            <q-btn v-close-popup flat round dense color="red" outline icon="close" />
          </q-toolbar>
        </q-card-actions>

        <q-separator />

        <q-card-section
          style="height: calc(100vh - 50px - 50px - 67.44px)"
          class="scroll"
        >
          <div v-if="isCheckDone" class="row q-col-gutter-md">
            <div class="col-6 q-mb-sm">
              <q-list bordered>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar>
                      <img
                        :src="
                          item?.cashier_pemberi?.foto
                            ? item?.cashier_pemberi?.foto
                            : $defaultImage1
                        "
                      />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label caption>Kasir</q-item-label>
                    <q-item-label>{{ item?.cashier_pemberi?.nama }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
            <div class="col-6 q-mb-sm">
              <q-list bordered>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar>
                      <img
                        :src="
                          item?.cashier_penerima?.foto
                            ? item?.cashier_penerima?.foto
                            : $defaultImage1
                        "
                      />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label caption>Kasir</q-item-label>
                    <q-item-label>{{ item?.cashier_penerima?.nama }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>

          <div v-if="!isCheckDone" class="row q-col-gutter-md">
            <div class="col-6">
              <q-select
                clearable
                class="q-mb-md"
                hint="Wajib diisi"
                :rules="[(val) => !!val || 'Wajib diisi']"
                outlined
                v-model="rotasi_cashier_pemberi"
                :emit-value="false"
                option-label="nama"
                :options="list_cashiers"
                label="Pilih Kasir (Pemberi)"
                color="teal"
                options-selected-class="text-deep-orange"
              >
              </q-select>
            </div>
            <div class="col-6">
              <q-select
                clearable
                class="q-mb-md"
                hint="Wajib diisi"
                :rules="[(val) => !!val || 'Wajib diisi']"
                outlined
                v-model="rotasi_cashier_penerima"
                :emit-value="false"
                option-label="nama"
                :options="list_cashiers"
                label="Pilih Kasir (Penerima)"
                color="teal"
                options-selected-class="text-deep-orange"
              >
              </q-select>
            </div>
          </div>

          <div v-if="!isCheckDone" class="row q-col-gutter-md q-mb-md">
            <div class="col-6">
              <q-input
                hint="Wajib diisi (4 digits) (Pemberi)"
                :rules="[(val) => !!val || 'Wajib diisi (4 digits) (Pemberi)']"
                type="password"
                mask="####"
                unmasked-value
                outlined
                clearable
                v-model="pin1"
                label="PIN Kasir Pemberi"
              />
            </div>
            <div class="col-6">
              <q-input
                hint="Wajib diisi (4 digits) (Penerima)"
                :rules="[(val) => !!val || 'Wajib diisi (4 digits) (Penerima)']"
                type="password"
                mask="####"
                unmasked-value
                outlined
                clearable
                v-model="pin2"
                label="PIN Kasir Penerima"
              />
            </div>
          </div>

          <q-banner class="bg-orange q-mb-sm text-white">
            <template v-slot:avatar>
              <q-icon name="warning" color="white" />
            </template>
            Hanya bisa dilakukan sekali dalam satu hari
            <template v-if="isCheckDone" v-slot:action>
              <span class="">SELESAI PROSES: {{ getCheckDone?.created_at }}</span>
            </template>
          </q-banner>

          <q-banner
            v-if="isCheckDone"
            class="bg-green text-white rounded-borders q-mb-sm"
          >
            <template v-slot:avatar>
              <q-icon name="check_circle" color="white" />
            </template>
            <b class="text-capitalize">{{ item?.cashier_pemberi?.nama }} </b> sebagai
            KASIR PEMBERI sudah sepakat jumlah barang yang diterima valid
            <template v-slot:action>
              <span class="">STOK ROTASI SUDAH DICEK</span>
            </template>
          </q-banner>

          <q-banner
            v-if="isCheckDone"
            class="bg-green text-white rounded-borders q-mb-sm"
          >
            <template v-slot:avatar>
              <q-icon name="check_circle" color="white" />
            </template>
            <b class="text-capitalize">{{ item?.cashier_penerima?.nama }} </b> sebagai
            KASIR PENERIMA sudah sepakat jumlah barang yang diterima valid
            <template v-slot:action>
              <span class="">STOK ROTASI SUDAH DICEK</span>
            </template>
          </q-banner>

          <q-banner
            v-if="!isCheckDone"
            class="bg-primary text-white rounded-borders q-mb-sm"
          >
            <template v-slot:avatar>
              <q-icon
                v-if="!item?.cashier_pemberi?.foto"
                name="support_agent"
                color="white"
              />

              <q-avatar v-else>
                <img
                  :src="
                    item?.cashier_pemberi?.foto
                      ? item?.cashier_pemberi?.foto
                      : $defaultImage1
                  "
                />
              </q-avatar>
            </template>
            Dengan melakukan centang "SETUJU", <br />
            <b class="text-capitalize">{{ item?.cashier_pemberi?.nama }} </b> sebagai
            KASIR PEMBERI sudah sepakat jumlah barang yang diterima valid
            <template v-slot:action>
              <q-checkbox
                keep-color
                :color="item.cashier_1_confirm ? 'primary' : 'white'"
                dark
                v-model="item.cashier_1_confirm"
                label="SETUJU"
              />
            </template>
          </q-banner>

          <q-banner v-if="!isCheckDone" class="bg-primary text-white rounded-borders">
            <template v-slot:avatar>
              <q-icon
                v-if="!item?.cashier_penerima?.foto"
                name="support_agent"
                color="white"
              />

              <q-avatar v-else>
                <img
                  :src="
                    item?.cashier_penerima?.foto
                      ? item?.cashier_penerima?.foto
                      : $defaultImage1
                  "
                />
              </q-avatar>
            </template>
            Dengan melakukan centang "SETUJU", <br />
            <b class="text-capitalize">{{ item?.cashier_penerima?.nama }} </b> sebagai
            KASIR PENERIMA sudah sepakat jumlah barang yang diterima valid
            <template v-slot:action>
              <q-checkbox
                keep-color
                :color="item.cashier_2_confirm ? 'primary' : 'white'"
                dark
                v-model="item.cashier_2_confirm"
                label="SETUJU"
              />
            </template>
          </q-banner>

          <q-banner inline-actions class="bg-red text-white rounded-borders q-mt-sm">
            <template v-slot:avatar>
              <q-icon name="scale" color="white" />
            </template>
            Total berat barang menyusut
            <template v-slot:action>
              <span class="text-h6"
                >{{ isCheckDone ? getCheckDone?.qty : getTotal?.qty }} kg</span
              >
            </template>
          </q-banner>
        </q-card-section>

        <q-separator v-if="!isCheckDone" />

        <q-card-actions v-if="!isCheckDone" class="q-col-gutter-md" align="center">
          <div class="">
            <q-btn
              type="submit"
              color="positive"
              class="text-h6"
              style="height: 50px"
              label="konfirmasi"
              icon-right="verified"
            />
          </div>
          <div class="">
            <q-btn
              @click="$emit('onBubbleEventCatatan')"
              color="teal"
              class="text-h6"
              style="height: 50px"
              icon-right="edit_document"
              label="catatan"
            />
          </div>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import TableRiwayatPenjualan from "./TableRiwayatPenjualan.vue";
import { mapState, mapActions, mapWritableState } from "pinia";
import { useRotasiStore } from "src/stores/rotasi-store";
import { usePenjualanStore } from "src/stores/penjualan-store";
import { usePengaturanStore } from "src/stores/pengaturan-store";

export default {
  components: {
    TableRiwayatPenjualan,
  },
  setup() {
    return {
      fixed: ref(false),
    };
  },
  data() {
    return {
      item: null,
      pin1: null,
      pin2: null,
    };
  },
  computed: {
    ...mapState(usePengaturanStore, {
      list_cashiers: "list_cashiers",
      // list_shifts: "list_shifts",
      getShiftData: "getShiftData",
    }),
    ...mapWritableState(usePengaturanStore, {
      rotasi_cashier_pemberi: "rotasi_cashier_pemberi",
      rotasi_cashier_penerima: "rotasi_cashier_penerima",
      // rotasi_shift_pemberi: "rotasi_shift_pemberi",
      // rotasi_shift_penerima: "rotasi_shift_penerima",
    }),
    ...mapState(useRotasiStore, {
      getTotal: "getTotal",
      isCheckDone: "isCheckDone",
      getCheckDone: "getCheckDone",
    }),
    ...mapWritableState(useRotasiStore, {
      struk: "struk",
    }),
  },
  watch: {
    rotasi_cashier_pemberi: {
      deep: true,
      handler(val) {
        console.log("rotasi_cashier_pemberi A", val);
        this.item.cashier_pemberi = val; //this.struk;
        console.log("rotasi_cashier_pemberi B", this.struk);
      },
    },
    rotasi_cashier_penerima: {
      deep: true,
      handler(val) {
        console.log("rotasi_cashier_penerima A", val);
        this.item.cashier_penerima = val; //this.struk;
        console.log("rotasi_cashier_penerima B", this.struk);
      },
    },
    // rotasi_shift_pemberi: {
    //   deep: true,
    //   handler(val) {
    //     console.log("rotasi_shift_pemberi", this.struk);
    //     this.item.shift_pemberi = val?.value; //this.struk;
    //   },
    // },
    // rotasi_shift_penerima: {
    //   deep: true,
    //   handler(val) {
    //     console.log("rotasi_shift_penerima", this.struk);
    //     this.item.shift_penerima = val?.value;
    //   },
    // },
  },
  methods: {
    ...mapActions(useRotasiStore, {
      addItemToStruk: "addItemToStruk",
      // setCourir: "setCourir",
    }),
    ...mapActions(usePenjualanStore, {
      onSyncPenjualanRotasiItems: "onSyncPenjualanRotasiItems",
      isItemOverWeight: "isItemOverWeight",
    }),
    onNofityForm() {
      this.$q.notify({
        message: "Peringatan",
        caption: "Lengkapi formulir",
        icon: "warning",
        color: "negative",
        position: "top",
      });
    },
    async onSubmit() {
      if (this.isCheckDone) {
        return this.$q.notify({
          message: "Peringatan",
          caption: "Maksimal cek buka 1 kali sehari",
          icon: "warning",
          color: "negative",
          position: "top",
        });
      }

      console.log("onSubmit", this.item);
      if (!this.item?.cashier_1_confirm) return this.onNofityForm();
      if (!this.item?.cashier_2_confirm) return this.onNofityForm();
      if (!this.item?.cashier_pemberi) return this.onNofityForm();
      if (!this.item?.cashier_penerima) return this.onNofityForm();
      // if (!this.item?.shift_pemberi) return this.onNofityForm();
      // if (!this.item?.shift_penerima) return this.onNofityForm();

      if (
        this.rotasi_cashier_pemberi?.pin != this.pin1 ||
        this.rotasi_cashier_penerima?.pin != this.pin2
      ) {
        return this.$q.notify({
          message: "Peringatan",
          caption: "PIN tidak cocok",
          icon: "warning",
          color: "negative",
          position: "top",
        });
      }

      this.fixed = false;

      this.item.stok_awal = this.getTotal?.stok_awal;
      this.item.stok_akhir = this.getTotal?.stok_akhir;
      this.item.qty = this.getTotal?.qty;

      this.struk = this.item;

      const is_item_over_weight = await this.isItemOverWeight(this.struk?.items);
      console.log("isItemOverWeight", is_item_over_weight);
      if (is_item_over_weight) return;

      this.addItemToStruk();

      this.$global.$emit("MainLayout", {
        label: "DialogConfirmRotasi",
        value: this.struk,
      });

      this.onSyncPenjualanRotasiItems(this.struk);

      // this.struk = null;
    },

    onOpen(item) {
      this.fixed = true;
      this.item = item;

      if (this.isCheckDone) this.item = this.getCheckDone;

      this.pin1 = null;
      this.pin2 = null;

      this.rotasi_cashier_pemberi = null;
      this.rotasi_cashier_penerima = null;

      // this.rotasi_shift_pemberi = null;
      // this.rotasi_shift_penerima = null;

      if (this.struk?.cashier_1_confirm) this.struk.cashier_1_confirm = false;
      if (this.struk?.cashier_2_confirm) this.struk.cashier_2_confirm = false;

      if (this.struk?.cashier_pemberi) this.struk.cashier_pemberi = false;
      if (this.struk?.cashier_penerima) this.struk.cashier_penerima = false;

      // if (this.struk?.shift_pemberi) this.struk.shift_pemberi = false;
      // if (this.struk?.shift_penerima) this.struk.shift_penerima = false;
    },
  },
};
</script>
