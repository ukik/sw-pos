<template>
  <q-dialog v-model="confirm" persistent>
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

            <q-btn v-close-popup flat dense color="white" rounded icon="close"></q-btn>
          </q-toolbar>
        </q-card-section>

        <q-separator></q-separator>

        <q-card-section style="min-width: 500px">
          <q-banner dense class="bg-red full-height text-white q-mb-md">
            <template v-slot:avatar>
              <q-icon name="support_agent" color="white" />
            </template>
            {{ _cashier }}

            Ganti kasir PIKET yang bertanggungjawab pada shift sekarang
          </q-banner>

          <div class="col-6 q-mb-md">
            <q-list bordered>
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="cashier?.foto ? cashier?.foto : $defaultImage" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label caption>Kasir Piket</q-item-label>
                  <q-item-label>{{
                    cashier?.nama ? cashier?.nama : "Piket Kosong"
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
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
          <div class="col-12">
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
          </div>
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
import { mapState, mapWritableState } from "pinia";
import { usePengaturanStore } from "src/stores/pengaturan-store";

export default {
  data() {
    return {
      confirm: false,
      cashier: null,
      pin: null,
    };
  },
  computed: {
    ...mapState(usePengaturanStore, {
      list_cashiers: "list_cashiers",
    }),

    ...mapWritableState(usePengaturanStore, {
      _cashier: "cashier",
    }),
    getPinLabel() {
      const name = this.cashier?.nama ? " - " + this.cashier?.nama : "";
      return `Wajib diisi PIN ${name}`;
    },
  },
  methods: {
    onOpen() {
      this.confirm = true;

      this.cashier = JSON.parse(JSON.stringify(this._cashier));
    },
    onSubmit() {
      if (this.cashier?.pin != this.pin) {
        return this.$q.notify({
          message: "Peringatan",
          caption: "PIN tidak cocok",
          icon: "warning",
          color: "negative",
          position: "top",
        });
      }

      this._cashier = this.cashier;

      this.$swal({
        // position: "top-end",
        icon: "success",
        title: "KASIR PIKET SELESAI",
        text: `Kasir Piket ${this._cashier?.nama}`,
        showConfirmButton: false,
        // confirmButtonText: `Invoice ${item.code}`,
        timer: 2500,
      });
    },
  },
};
</script>
