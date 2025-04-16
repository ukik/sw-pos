<template>
  <q-dialog :persistent="false" full-width v-model="fixed">
    <q-card>
      <q-form @submit="onSubmit">
        <q-card-actions class="q-pa-none q-pl-xs">
          <q-toolbar class="bg-redx text-black">
            <q-toolbar-title> KONFIRMASI CHECK TUTUP </q-toolbar-title>
            <q-btn v-close-popup flat round dense color="red" outline icon="close" />
          </q-toolbar>
        </q-card-actions>

        <q-separator />

        <q-card-section style="" class="scroll q-pa-sm">
          <!-- <q-input
            class="q-mb-md"
            hint="Wajib diisi"
            :rules="[(val) => !!val || 'Wajib diisi']"
            outlined
            counter
            clearable
            maxlength="100"
            v-model="item.courir"
            label="Nama Kurir"
          /> -->

          <!-- <SelectCashier></SelectCashier> -->
          <q-select
            clearable
            class="q-mb-md"
            hint="Wajib diisi"
            :rules="[(val) => !!val || 'Wajib diisi']"
            outlined
            v-model="checkout_courir"
            :emit-value="false"
            :options="list_courirs"
            label="Pilih Kurir"
            color="teal"
            options-selected-class="text-deep-orange"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section avatar>
                  <q-icon :name="scope.opt.icon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ scope.opt.label }}</q-item-label>
                  <q-item-label caption>{{ scope.opt.description }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-6">
              <q-input
                hint="Wajib diisi"
                :rules="[(val) => !!val || 'Wajib diisi']"
                mask="# # # #"
                unmasked-value
                outlined
                clearable
                v-model="pin1"
                label="PIN Kasir"
              />
            </div>
            <div class="col-6">
              <q-input
                hint="Wajib diisi"
                :rules="[(val) => !!val || 'Wajib diisi']"
                mask="# # # #"
                unmasked-value
                outlined
                clearable
                v-model="pin2"
                label="PIN Kurir"
              />
            </div>
          </div>

          <q-banner class="bg-primary text-white rounded-borders q-mb-sm">
            <template v-slot:avatar>
              <q-icon name="support_agent" color="white" />
            </template>
            Dengan melakukan centang "SETUJU", <br />
            <b class="text-capitalize">{{ item?.cashier }} </b> sebagai KASIR sudah
            sepakat jumlah barang yang diterima valid
            <template v-slot:action>
              <q-checkbox
                keep-color
                :color="item.cashier_confirm ? 'primary' : 'white'"
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
            <b class="text-capitalize">{{ item?.courir }} </b> sebagai KURIR sudah sepakat
            jumlah barang yang diterima valid
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

        <q-card-actions align="center">
          <q-btn
            type="submit"
            color="positive"
            class="text-h6"
            style="height: 50px"
            label="konfirmasi"
            icon-right="verified"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import TableRiwayatPenjualan from "./TableRiwayatPenjualan.vue";
import { mapState, mapActions, mapWritableState } from "pinia";
import { useCheckOutStore } from "src/stores/checkout-store";
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
      list_cashiers: "list_cashiers",
    }),
    ...mapWritableState(usePengaturanStore, {
      checkout_courir: "checkout_courir",
      checkout_cashier: "checkout_cashier",
    }),
    ...mapState(useCheckOutStore, {
      getTotal: "getTotal",
    }),
    ...mapWritableState(useCheckOutStore, {
      struk: "struk",
    }),
  },
  watch: {
    checkout_courir: {
      deep: true,
      handler(val) {
        this.setCourir(val?.value);
        console.log("checkout_courir", this.struk);
        this.item = this.struk;
      },
    },
  },
  methods: {
    ...mapActions(useCheckOutStore, {
      addItemToStruk: "addItemToStruk",
      setCourir: "setCourir",
    }),
    ...mapActions(usePenjualanStore, {
      onSyncPenjualanCheckOutItems: "onSyncPenjualanCheckOutItems",
    }),
    onSubmit() {
      if (
        !this.item?.courir_confirm ||
        !this.item?.cashier_confirm ||
        !this.item?.courir
      ) {
        return this.$q.notify({
          message: "Peringatan",
          caption: "Lengkapi formulir",
          icon: "warning",
          color: "negative",
          position: "top",
        });
      }

      console.log(
        "this.checkout_courir?.pin !== this.pin1",
        this.checkout_courir?.pin,
        this.pin1
      );
      console.log(
        "this.checkout_courir?.pin !== this.pin2",
        this.checkout_cashier?.pin,
        this.pin2
      );
      if (
        this.checkout_courir?.pin != this.pin1 ||
        this.checkout_cashier?.pin != this.pin2
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

      this.addItemToStruk();

      this.$global.$emit("MainLayout", {
        label: "DialogConfirmCheckOut",
        value: this.struk,
      });

      this.onSyncPenjualanCheckOutItems(this.struk);

      this.struk = null;
    },

    onOpen(item) {
      this.fixed = true;
      this.item = item;
    },
  },
};
</script>
