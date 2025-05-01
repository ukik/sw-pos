<template>
  <q-dialog
    @hide="item.cashier_confirm = false"
    :persistent="false"
    full-width
    full-height
    v-model="fixed"
  >
    <q-card>
      <q-form @submit="onSubmit">
        <q-card-actions class="q-pa-none q-pl-xs">
          <q-toolbar class="bg-redx text-black">
            <q-toolbar-title> KONFIRMASI KAS </q-toolbar-title>
            <q-btn v-close-popup flat round dense color="red" outline icon="close" />
          </q-toolbar>
        </q-card-actions>

        <q-separator />

        <q-card-section
          style="height: calc(100vh - 50px - 50px - 67.44px)"
          class="scroll q-pa-sm"
        >
          <q-banner class="bg-primary text-white rounded-borders q-mb-sm">
            <template v-slot:avatar>
              <q-icon name="support_agent" color="white" />
            </template>
            Dengan melakukan centang "SETUJU", <br />
            <b class="text-capitalize">{{ item?.cashier?.nama }} </b> sebagai KASIR PIKET
            sudah sepakat jumlah kas yang diproses valid
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

          <q-banner
            inline-actions
            class="bg-white border-1 text-dark rounded-borders q-mt-sm"
          >
            <template v-slot:avatar>
              <q-icon name="account_balance" color="red" />
            </template>
            <!-- <template v-slot:action> -->
            <q-list bordered separator>
              <q-item>
                <q-item-section>
                  <q-item-label caption>KAS SEBELUMNYA</q-item-label>
                  <q-item-label class="text-bold"> Rp. {{ balance }} </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption>KAS MASUK</q-item-label>
                  <q-item-label class="text-bold">
                    Rp. {{ getTotal?.total_masuk }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption>KAS KELUAR</q-item-label>
                  <q-item-label class="text-bold">
                    Rp. {{ getTotal?.total_keluar }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption>TOTAL KAS</q-item-label>
                  <q-item-label class="text-h6"> Rp. {{ getTotalSaldo }} </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <!-- <span class="text-h6">Rp. {{ balance }} - Rp. {{ this.getTotal?.total }} = Rp. {{ getTotalSaldo }} </span> -->
            <!-- </template> -->
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
import { mapState, mapActions, mapWritableState } from "pinia";
import { useBalanceStore } from "src/stores/balance-store";
import { usePengaturanStore } from "src/stores/pengaturan-store";

export default {
  setup() {
    return {
      fixed: ref(false),
    };
  },
  data() {
    return {
      item: null,
    };
  },
  computed: {
    ...mapState(useBalanceStore, {
      getTotal: "getTotal",
      getTotalSaldo: "getTotalSaldo",
    }),
    ...mapWritableState(useBalanceStore, {
      struk: "struk",
    }),
    ...mapState(usePengaturanStore, {
      balance: "balance",
    }),
    // getSaldo() {
    //   return Number(this.balance) - Number(this.getTotal?.total)
    // }
  },
  methods: {
    ...mapActions(useBalanceStore, {
      addItemToStruk: "addItemToStruk",
    }),

    onSubmit() {
      if (!this.item?.cashier_confirm) {
        return this.$q.notify({
          message: "Peringatan",
          caption: "Lengkapi formulir",
          icon: "warning",
          color: "negative",
          position: "top",
        });
      }

      this.fixed = false;

      // this.item.qty = this.getTotal?.qty;
      // this.item.stok_awal = this.getTotal?.stok_awal;
      // this.item.stok_akhir = this.getTotal?.stok_akhir;

      this.struk = this.item;

      this.addItemToStruk();

      // console.log('onSubmit', this.struk)
      // return

      this.$global.$emit("MainLayout", {
        label: "DialogConfirmBalance",
        value: this.struk,
      });

      // this.struk = null;
    },

    onOpen(item) {
      this.fixed = true;
      this.item = item;

      if (this.struk?.cashier_confirm) this.struk.cashier_confirm = false;
    },
  },
};
</script>
