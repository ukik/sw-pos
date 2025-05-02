<template>
  <q-page id="page" class="q-pa-sm items-start row">
    <div class="row q-col-gutter-sm col-8" id="content">
      <DialogConfirmBalance
        ref="dialog_bayar"
        @onBubbleEventCatatan="openDialogCatatan"
      ></DialogConfirmBalance>

      <DialogCatatan
        @onBubbleEvent="struk.catatan = $event"
        ref="dialog_catatan"
      ></DialogCatatan>

      <MoneyCalculator
        @onBubbleEventOK="onBubbleEventOK"
        ref="money_calculator"
      ></MoneyCalculator>

      <q-form @submit="onTambah" class="col-12">
        <div class="row q-col-gutter-md">
          <!-- <div class="col-12">
            <q-banner dense class="bg-positive text-white">
              <template v-slot:avatar>
                <q-icon name="info" color="white" />
              </template>
              Kas modal lama akan diganti dengan kas modal baru
            </q-banner>
          </div> -->

          <div class="col-12">
            <q-input
              readonly
              clearable
              outlined
              mask="Rp. ##########"
              unmasked-value
              autogrow
              label="Nominal"
              :rules="[(val) => !!val || 'Wajib diisi']"
              hint="Wajib diisi"
              v-model="nominal"
              stack-label
            >
              <template v-slot:after>
                <q-btn
                  @click="onOpenMoneyCalculator"
                  color="primary"
                  unelevated
                  class="full-height"
                  icon="calculate"
                  label="Nominal"
                ></q-btn>
              </template>
            </q-input>
          </div>

          <div class="col-12">
            <q-input
              clearable
              outlined
              type="textarea"
              rows="4"
              autogrow
              label="Keterangan"
              :rules="[(val) => !!val || 'Wajib diisi']"
              hint="Wajib diisi"
              v-model="keterangan"
            />
          </div>

          <!-- <div class="col-6">
            <q-input type="password" maxlength="4" clearable outlined label="PIN Kasir"
              :rules="[(val) => !!val || 'Wajib diisi PIN Kasir (4 digits)']" hint="Wajib diisi PIN Kasir (4 digits)"
              v-model="pin" />
          </div> -->

          <div class="col-12">
            <q-select
              clearable
              hint="Wajib diisi"
              :rules="[(val) => !!val || 'Wajib diisi']"
              outlined
              v-model="status"
              :emit-value="false"
              option-label="nama"
              :options="['KAS KELUAR', 'KAS MASUK']"
              label="Pilih Tipe"
              color="teal"
              options-selected-class="text-deep-orange"
            >
            </q-select>
          </div>

          <div class="col-12 text-center">
            <q-btn type="submit" color="sw" class="text-h6" label="tambah" icon="add" />
          </div>
        </div>
      </q-form>
    </div>

    <q-page-sticky class="q-pr-sm" position="top-right" :offset="[0, 0]">
      <q-item style="height: 35px" dense class="bg-sw flex flex-center text-white">
        <q-item-section>
          <q-item-label class="text-center">STRUK KAS</q-item-label>
        </q-item-section>
      </q-item>

      <q-scroll-area
        class="border-1"
        :style="`height: calc(${$q.screen.height}px - 98px - 50px - 50px - 50px - 70px + 15px); width: 250px`"
      >
        <q-list bordered separator>
          <template v-for="(item, index) in struk?.items">
            <SlideItemBalance
              :item="item"
              @onBubbleEvent="onBubbleEventSlideItemBalance($event, index)"
            >
            </SlideItemBalance>
          </template>
        </q-list>
      </q-scroll-area>

      <q-item style="height: 35px" dense class="bg-blue items-center text-white">
        <q-item-section>
          <q-item-label class="text-left text-white" caption>KAS MASUK</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label lines="1" class="text-left text-white text-dark"
            >Rp. {{ getTotal?.total_masuk }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item style="height: 35px" dense class="bg-blue items-center text-white">
        <q-item-section>
          <q-item-label class="text-left text-white" caption>KAS KELUAR </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label lines="1" class="text-left text-white text-dark"
            >Rp. {{ getTotal?.total_keluar }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item style="height: 35px" dense class="bg-sw items-center text-white">
        <q-item-section>
          <q-item-label class="text-left text-white" caption>TOTAL KAS </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label lines="1" class="text-left text-white text-h6"
            >Rp. {{ getTotalSaldo }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <div
        v-if="getTotalSaldo >= 0"
        class="full-width q-mt-sm col-12 row q-col-gutter-sm"
      >
        <div class="col q-pl-none q-pt-none">
          <q-btn
            @click="openDialogConfirmBalance"
            color="pink"
            class="text-h6 full-width"
            style="height: 50px"
            label="validasi"
            icon-right="security"
          />
        </div>
        <div class="col-auto q-pt-none">
          <q-btn
            @click="openDialogCatatan"
            color="teal"
            class="text-h6"
            style="height: 50px"
            icon-right="edit_document"
          />
        </div>
      </div>
      <div v-else class="full-width q-mt-sm col-12">
        <q-btn
          @click="onNotifySaldoKurang"
          color="pink"
          class="text-h6 full-width"
          style="height: 50px"
          label="kas kurang"
          icon-right="warning"
        />
      </div>
    </q-page-sticky>

    <!-- <q-page-sticky class="q-pr-sm" position="top-right" :offset="[0, 0]">
      <q-item style="height: 35px" dense class="bg-sw flex flex-center text-white">
        <q-item-section>
          <q-item-label class="text-center">STRUK KAS</q-item-label>
        </q-item-section>
      </q-item>

      <q-scroll-area class="border-1"
        :style="`height: calc(${$q.screen.height}px - 98px - 50px - 50px - 50px + 15px); width: 250px`">
        <q-list bordered separator>
          <template v-for="(item, index) in struk?.items">
            <SlideItemBalance :item="item" @onBubbleEvent="onBubbleEventSlideItemBalance($event, index)">
            </SlideItemBalance>
          </template>
        </q-list>
      </q-scroll-area>

      <q-item style="height: 35px" dense class="bg-sw items-center text-white">
        <q-item-section>
          <q-item-label class="text-left text-white" caption>TOTAL </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label lines="1" class="text-left text-white text-h6">Rp. {{ getTotalStruk }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <div class="full-width q-mt-sm col-12 row q-col-gutter-sm">
        <div class="col row q-pl-none q-pt-none">
          <q-btn @click="openDialogConfirmBalance" color="pink" class="text-h6 full-width" style="height: 50px"
            label="validasi" icon-right="security" />
          <q-btn color="cyan" class="text-h6 full-width"
            style="height: 50px" label="lihat" icon-right="assignment" />
        </div>
      </div>

      <div class="full-width q-mt-sm col-12 row q-col-gutter-sm">
        <div class="col q-pl-none q-pt-none">
          <q-btn
            @click="openDialogConfirmBalance"
            color="pink"
            class="text-h6 full-width"
            style="height: 50px"
            label="validasi"
            icon-right="security"
          />
        </div>
        <div class="col-auto q-pt-none">
          <q-btn
            @click="openDialogCatatan"
            color="teal"
            class="text-h6"
            style="height: 50px"
            icon-right="edit_document"
          />
        </div>
      </div>

    </q-page-sticky> -->
  </q-page>
</template>

<script setup>
import { ref } from "vue";

import SlideItemBalance from "src/components/SlideItemBalance.vue";
import DialogConfirmBalance from "src/components/DialogConfirmBalance.vue";
import DialogCatatan from "src/components/DialogCatatan.vue";
import MoneyCalculator from "src/components/commons/MoneyCalculator.vue";
</script>

<script>
import { date } from "quasar";
import { mapActions, mapWritableState, mapState } from "pinia";
import { useBalanceStore } from "src/stores/balance-store";
import { usePenjualanStore } from "src/stores/penjualan-store";
import { usePengaturanStore } from "src/stores/pengaturan-store";

export default {
  components: {
    MoneyCalculator,
  },
  data() {
    return {
      status: "",
      // pin: null,
      keterangan: "",
      nominal: 0,
    };
  },
  computed: {
    ...mapState(useBalanceStore, {
      getTotal: "getTotal",
      getStrukItemID: "getStrukItemID",
      getTotalSaldo: "getTotalSaldo",
      // getTotalStruk:'getTotalStruk',
      // isCheckDone: "isCheckDone",
      // getCheckDone: "getCheckDone",
    }),
    ...mapWritableState(usePenjualanStore, {
      items: "items",
    }),
    ...mapWritableState(useBalanceStore, {
      struk: "struk",
      struks: "struks",
    }),
    ...mapState(usePengaturanStore, {
      balance: "balance",
    }),
  },
  methods: {
    ...mapActions(useBalanceStore, {
      addNewStruk: "addNewStruk",
      updateLocalStorage: "updateLocalStorage",
    }),
    onBubbleEventOK(event) {
      // console.log('onBubbleEventOK')
      this.nominal = Number(event?.price);
    },
    onNotify() {
      return this.$q.notify({
        message: "Peringatan",
        caption: "Formulir harus lengkap",
        icon: "warning",
        color: "negative",
        position: "top",
      });
    },
    onTambah() {
      console.log(this.struk);
      console.log(this.keterangan);
      console.log(this.status);
      console.log(this.nominal);

      if (!this.keterangan) return this.onNotify();
      if (!this.status) return this.onNotify();
      if (!this.nominal) return this.onNotify();

      this.addNewStruk();
      console.log(this.struk);

      this.struk?.items?.push({
        id: this.getStrukItemID,
        status: this.status,
        nominal: this.nominal,
        keterangan: this.keterangan,
      });

      // let total = 0
      // this.struk?.items.forEach(element => {
      //   total += Number(element?.nominal)
      // });

      this.struk.total_masuk = this.getTotal?.total_masuk;
      this.struk.total_keluar = this.getTotal?.total_keluar;
      this.struk.total_saldo = this.getTotalSaldo;

      this.status = "";
      this.keterangan = "";
      this.nominal = 0;

      // this.$emit("onBubbleEvent", );
    },
    onOpenMoneyCalculator() {
      this.$refs.money_calculator.onOpen();
    },
    onNotifySaldoKurang() {
      this.$q.notify({
        message: "Peringatan",
        caption: "Kas kurang",
        icon: "warning",
        color: "negative",
        position: "top",
      });
    },
    openDialogConfirmBalance() {
      if (this.getTotalStruk <= 0)
        return this.$q.notify({
          message: "Peringatan",
          caption: "Struk saldo kosong",
          icon: "warning",
          color: "negative",
          position: "top",
        });

      this.$refs.dialog_bayar?.onOpen(this.struk);
    },
    openDialogCatatan() {
      if (!this.struk?.id)
        return this.$q.notify({
          message: "Peringatan",
          caption: "Struk tidak bisa kosong",
          icon: "warning",
          color: "negative",
          position: "top",
        });
      this.$refs.dialog_catatan?.onOpen(this.struk.catatan);
    },
    onBubbleEventSlideItemBalance(item, index) {
      this.struk?.items?.splice(index, 1);

      if (this.struk?.items.length <= 0) this.struk = null;
    },
  },
};
</script>

<style>
#page #content .q-list--bordered,
#page #content .q-list--separator > .q-item-type + .q-item-type {
  border: 1px solid rgba(255, 255, 255, 0.336);
}

#page #content .q-separator {
  background: rgb(255 255 255 / 35%);
}
</style>
