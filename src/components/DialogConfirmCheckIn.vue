<template>
  <q-dialog :persistent="false" full-width full-height v-model="fixed">
    <q-card>
      <q-form @submit="onSubmit">
        <q-card-actions class="q-pa-none q-pl-xs">
          <q-toolbar class="bg-redx text-black">
            <q-toolbar-title> KONFIRMASI CHECK BUKA </q-toolbar-title>
            <q-btn v-close-popup flat round dense color="red" outline icon="close" />
          </q-toolbar>
        </q-card-actions>

        <q-separator />

        <q-card-section
          style="height: calc(100vh - 50px - 50px - 67.44px)"
          class="scroll q-pa-sm"
        >
          <q-list bordered class="q-mb-sm">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar>
                  <img :src="`https://cdn.quasar.dev/img/avatar1.jpg`" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ cashier?.nama }}</q-item-label>
                <q-item-label caption lines="1"
                  >Shift ({{ shift?.nama }}) - Mulai: {{ shift?.jam_mulai }} - Selesai:
                  {{ shift?.jam_selesai }}</q-item-label
                >
              </q-item-section>

              <q-item-section side>
                <q-icon name="chat_bubble" color="grey" />
              </q-item-section>
            </q-item>
          </q-list>

          <div v-if="!isCheckDone" class="row q-col-gutter-md q-mb-md">
            <div class="col-12">
              <q-input
                type="password"
                hint="Wajib diisi (4 digit)"
                :rules="[(val) => !!val || 'Wajib diisi (4 digit)']"
                mask="####"
                unmasked-value
                outlined
                clearable
                v-model="pin1"
                label="PIN Kasir"
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
            <b class="text-capitalize">{{ item?.cashier }} </b> sebagai KASIR sudah
            sepakat jumlah barang yang diterima valid
            <template v-slot:action>
              <span class="">STOK BUKA SUDAH DICEK</span>
            </template>
          </q-banner>

          <q-banner v-else class="bg-primary text-white rounded-borders q-mb-sm">
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

        <q-card-actions v-if="!isCheckDone" align="center">
          <q-btn
            :disable="isCheckDone"
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
import { useCheckInStore } from "src/stores/checkin-store";
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
      cashier: "cashier",
      courir: "courir",
      shift: "shift",
    }),
    ...mapWritableState(usePengaturanStore, {}),
    ...mapState(useCheckInStore, {
      struks: "struks",
      getTotal: "getTotal",
      isCheckDone: "isCheckDone",
      getCheckDone: "getCheckDone",
    }),
    ...mapWritableState(useCheckInStore, {
      struk: "struk",
    }),
  },
  watch: {},
  methods: {
    ...mapActions(useCheckInStore, {
      addItemToStruk: "addItemToStruk",
    }),
    ...mapActions(usePenjualanStore, {
      onSyncPenjualanCheckInItems: "onSyncPenjualanCheckInItems",
    }),
    onSubmit() {
      if (this.isCheckDone) {
        return this.$q.notify({
          message: "Peringatan",
          caption: "Maksimal check buka 1 kali sehari",
          icon: "warning",
          color: "negative",
          position: "top",
        });
      }

      if (!this.item?.cashier_confirm) {
        return this.$q.notify({
          message: "Peringatan",
          caption: "Lengkapi formulir",
          icon: "warning",
          color: "negative",
          position: "top",
        });
      }

      if (this.checkin_cashier?.pin != this.pin2) {
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
        label: "DialogConfirmCheckIn",
        value: this.struk,
      });

      this.onSyncPenjualanCheckInItems(this.struk);

      this.struk = null;
    },

    onOpen(item) {
      this.fixed = true;
      this.item = item;

      this.pin1 = null;
      this.struk.cashier_confirm = false;
    },
  },
};
</script>
