<template>
  <q-dialog :persistent="false" full-width full-height v-model="fixed">
    <q-card>
      <q-form @submit="onSubmit">
        <q-card-actions class="q-pa-none q-pl-xs">
          <q-toolbar class="bg-redx text-black">
            <q-toolbar-title> KONFIRMASI MUTASI </q-toolbar-title>
            <q-btn v-close-popup flat round dense color="red" outline icon="close" />
          </q-toolbar>
        </q-card-actions>

        <q-separator />

        <q-card-section
          style="height: calc(100vh - 50px - 50px - 67.44px)"
          class="scroll q-pa-sm"
        >
          <q-select
            clearable
            class="q-mb-md"
            hint="Wajib diisi"
            :rules="[(val) => !!val || 'Wajib diisi']"
            outlined
            v-model="mutasi_courir"
            :emit-value="false"
            option-label="nama"
            :options="list_courirs"
            label="Pilih Kurir"
            color="teal"
            options-selected-class="text-deep-orange"
          >
            <!-- <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section avatar>
                  <q-icon :name="scope.opt.icon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ scope.opt.label }}</q-item-label>
                  <q-item-label caption>{{ scope.opt.description }}</q-item-label>
                </q-item-section>
              </q-item>
            </template> -->
          </q-select>

          <!-- <div class="row q-col-gutter-md q-mb-md">
            <div class="col-6">
              <q-input
                hint="Wajib diisi (4 digits)"
                :rules="[(val) => !!val || 'Wajib diisi (4 digits)']"
                type="password"
                mask="####"
                unmasked-value
                outlined
                clearable
                v-model="pin1"
                label="PIN Kasir"
              />
            </div>
            <div class="col-6">
              <q-input
                hint="Wajib diisi (4 digits)"
                :rules="[(val) => !!val || 'Wajib diisi (4 digits)']"
                type="password"
                mask="####"
                unmasked-value
                outlined
                clearable
                v-model="pin2"
                label="PIN Kurir"
              />
            </div>
          </div> -->

          <q-banner class="bg-primary text-white rounded-borders q-mb-sm">
            <template v-slot:avatar>
              <q-icon name="support_agent" color="white" />
            </template>
            Dengan melakukan centang "SETUJU", <br />
            <b class="text-capitalize">{{ item?.cashier?.nama }} </b> sebagai KASIR PIKET
            sudah sepakat jumlah barang yang diterima valid
            <template v-slot:action>
              <q-checkbox
                keep-color
                :color="item?.cashier_confirm ? 'primary' : 'white'"
                dark
                v-model="item.cashier_confirm"
                label="SETUJU"
              />
            </template>
          </q-banner>

          <q-banner class="bg-primary text-white rounded-borders">
            <template v-slot:avatar>
              <q-icon name="engineering" color="white" />
            </template>
            Dengan melakukan centang "SETUJU", <br />
            <b class="text-capitalize">{{ item?.courir?.nama }} </b> sebagai KURIR sudah
            sepakat jumlah barang yang diterima valid
            <template v-slot:action>
              <q-checkbox
                keep-color
                :color="item.courir_confirm ? 'primary' : 'white'"
                dark
                v-model="item.courir_confirm"
                label="SETUJU"
              />
            </template>
          </q-banner>

          <q-banner inline-actions class="bg-red text-white rounded-borders q-mt-sm">
            <template v-slot:avatar>
              <q-icon name="scale" color="white" />
            </template>
            Total berat barang diterima
            <template v-slot:action>
              <span class="text-h6">{{ this.getTotal?.qty }} kg</span>
            </template>
          </q-banner>
        </q-card-section>

        <q-separator />

        <q-card-actions class="q-col-gutter-md" align="center">
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
import { useMutasiStore } from "src/stores/mutasi-store";
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
      list_courirs: "list_courirs",
      cashier: "cashier",
    }),
    ...mapWritableState(usePengaturanStore, {
      mutasi_courir: "mutasi_courir",
    }),
    ...mapState(useMutasiStore, {
      getTotal: "getTotal",
    }),
    ...mapWritableState(useMutasiStore, {
      struk: "struk",
    }),
  },
  watch: {
    mutasi_courir: {
      deep: true,
      handler(val) {
        this.setCourir(val?.value);
        console.log("mutasi_courir", this.struk);
        // this.item = this.struk;

        this.item = {
          ...this.struk,
          courir: this.mutasi_courir,
        };
      },
    },
  },
  methods: {
    ...mapActions(useMutasiStore, {
      addItemToStruk: "addItemToStruk",
      setCourir: "setCourir",
    }),
    ...mapActions(usePenjualanStore, {
      onSyncPenjualanMutasiItems: "onSyncPenjualanMutasiItems",
      isItemOverWeight: "isItemOverWeight",
    }),
    onNotify() {
      this.$q.notify({
        message: "Peringatan",
        caption: "Lengkapi formulir",
        icon: "warning",
        color: "negative",
        position: "top",
      });
    },
    async onSubmit() {
      console.log("onSubmit", this.item);
      if (!this.item?.courir_confirm) return this.onNotify();
      if (!this.item?.cashier_confirm) return this.onNotify();
      if (!this.item?.courir) return this.onNotify();

      // if (this.mutasi_courir?.pin != this.pin2 || this.cashier?.pin != this.pin1) {
      //   return this.$q.notify({
      //     message: "Peringatan",
      //     caption: "PIN tidak cocok",
      //     icon: "warning",
      //     color: "negative",
      //     position: "top",
      //   });
      // }

      this.fixed = false;

      this.item.qty = this.getTotal?.qty;
      this.item.stok_awal = this.getTotal?.stok_awal;
      this.item.stok_akhir = this.getTotal?.stok_akhir;

      this.struk = this.item;

      const is_item_over_weight = await this.isItemOverWeight(this.struk?.items);
      console.log("isItemOverWeight", is_item_over_weight);
      if (is_item_over_weight) return;

      this.addItemToStruk();

      this.$global.$emit("MainLayout", {
        label: "DialogConfirmMutasi",
        value: this.struk,
      });

      this.onSyncPenjualanMutasiItems(this.struk);

      // this.struk = null;
    },

    onOpen(item) {
      this.fixed = true;
      this.item = item;

      this.pin1 = null;
      this.pin2 = null;
      this.mutasi_courir = null;

      if (this.struk?.courir_confirm) this.struk.courir_confirm = false;
      if (this.struk?.cashier_confirm) this.struk.cashier_confirm = false;
    },
  },
};
</script>
