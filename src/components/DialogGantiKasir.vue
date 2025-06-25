<template>
  <q-dialog persistent full-height v-model="confirm">
    <q-card>
      <q-form @submit="onSubmit">
        <q-card-section class="row items-center text-white bg-primary q-py-none">
          <!-- <q-avatar icon="support_agent" color="primary" text-color="white" />
        <span class="q-ml-sm"
          >Ganti kasir PIKET yang bertanggungjawab pada shift sekarang</span
        > -->

          <q-toolbar class="q-px-none">
            <q-toolbar-title>
              <div class="text-h6">KASIR PIKET</div>
            </q-toolbar-title>

            <q-btn
              v-if="_cashier?.id"
              v-close-popup
              flat
              dense
              color="white"
              rounded
              icon="close"
            ></q-btn>
          </q-toolbar>
        </q-card-section>

        <q-separator></q-separator>

        <q-card-section
          class="scroll"
          style="height: calc(100vh - 50px - 105px); min-width: 500px"
        >
          <q-banner dense class="bg-red text-white q-mb-md">
            <template v-slot:avatar>
              <q-icon name="support_agent" color="white" />
            </template>
            Ganti kasir PIKET yang bertanggungjawab pada shift sekarang
          </q-banner>

          <div v-if="cashier?.id" class="col-6 q-mb-md">
            <q-list bordered>
              <q-item v-ripple clickable @click="openDialogPengaturanCashier(cashier)">
                <!-- <q-badge floating>Klik untuk mengganti NAMA</q-badge> -->
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="cashier?.foto ? cashier?.foto : $defaultImage1" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label caption>Kasir Piket</q-item-label>
                  <q-item-label>{{
                    cashier?.nama ? cashier?.nama : "Piket Kosong"
                  }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label caption>SHIFT</q-item-label>
                  <q-item-label>{{ getAbsensi?.shift }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <div class="text-caption q-mt-sm">Klik untuk mengganti NAMA</div>
          </div>

          <div>
            <q-select
              class="q-mb-md"
              hint="Wajib diisi"
              :rules="[(val) => !!val || 'Wajib diisi']"
              outlined
              v-model="cashier"
              :emit-value="false"
              option-label="nama"
              :options="list_cashiers"
              label="Pilih Kasir PIKET"
              color="teal"
              options-selected-class="text-deep-orange"
            >
            </q-select>
          </div>

          <!-- <div class="col-12">
            <q-input
              type="password"
              :hint="getPinLabel"
              :rules="[(val) => !!val || getPinLabel]"
              mask="####"
              unmasked-value
              outlined
              clearable
              v-model="pin"
              label="PIN Kasir"
            />
          </div> -->
        </q-card-section>

        <q-separator></q-separator>

        <q-card-actions align="center">
          <q-btn
            color="positive"
            type="submit"
            outline
            label="SIMPAN"
            icon="check_circle"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useAbsensiStore } from "src/stores/absensi-store";
import { usePengaturanStore } from "src/stores/pengaturan-store";
import { usePenjualanStore } from "src/stores/penjualan-store";

export default {
  data() {
    return {
      confirm: false,
      cashier: null,
      pin: null,
    };
  },
  computed: {
    ...mapState(useAbsensiStore, {
      ABSENSI_struks: "struks",
    }),
    ...mapState(usePengaturanStore, {
      list_cashiers: "list_cashiers",
    }),

    ...mapWritableState(usePenjualanStore, {
      PENJUALAN_struk: "struk",
    }),

    ...mapWritableState(usePengaturanStore, {
      _cashier: "cashier",
    }),
    getPinLabel() {
      const name = this.cashier?.nama ? " - " + this.cashier?.nama : "";
      return `Wajib diisi PIN Kasir`;
    },
    getAbsensi() {
      let temp = null;
      this.ABSENSI_struks.forEach((el) => {
        if (el?.cashier_id == this.cashier?.id) temp = el;
      });
      return temp;
    },
  },
  watch: {
    list_cashiers(val) {
      val.forEach((element) => {
        if (element?.id == this.cashier?.id) {
          this.cashier = element;
        }
      });
    },
    cashier(val) {
      // alert(JSON.stringify(val));
      this.pin = null;
    },
  },
  methods: {
    ...mapActions(usePengaturanStore, {
      setCashier: "setCashier",
    }),
    openDialogPengaturanCashier(payload) {
      this.$global.$emit("MainLayout", {
        label: "openDialogPengaturanCashier",
        value: payload,
      });
    },
    onOpen() {
      this.confirm = true;

      this.cashier = JSON.parse(JSON.stringify(this._cashier));
    },
    onSubmit() {
      // console.log(this.cashier, this.pin);

      // if (this.cashier?.pin != this.pin) {
      //   return this.$q.notify({
      //     message: "Peringatan",
      //     caption: "PIN tidak cocok",
      //     icon: "warning",
      //     color: "negative",
      //     position: "top",
      //   });
      // }

      // this._cashier = this.cashier;
      this.setCashier(this.cashier);

      const vm = this;
      vm.confirm = false;

      this.PENJUALAN_struk = {};

      this.$swal({
        // position: "top-end",
        icon: "success",
        title: "KASIR PIKET",
        text: `Sekarang ${this._cashier?.nama}`,
        showConfirmButton: false,
        // confirmButtonText: `Invoice ${item.code}`,
        timer: 2000,
      }).then((result) => {
        vm.confirm = false;
      });
    },
  },
};
</script>
