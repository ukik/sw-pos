<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <!-- <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" /> -->

        <q-toolbar-title class="text-uppercase">
          <q-avatar class="q-mr-sm">
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          {{ $route?.meta?.title }}
        </q-toolbar-title>

        <q-item>
          <q-item-section>
            <q-item-label class="text-white" caption>Modal Kas</q-item-label>
            <q-item-label overline class="text-white">
              Rp.{{ PENGATURAN_balance }}</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-separator color="white" vertical></q-separator>
        <q-btn
          class="q-mx-sm"
          dense
          flat
          round
          icon="support_agent"
          @click="onDialogGantiKasir"
        />
        <q-separator color="white" vertical></q-separator>
        <q-btn class="q-ml-sm" dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>

      <q-separator color="white"></q-separator>

      <q-tabs inline-label dense align="justify" class="bg-blue">
        <q-route-tab icon="event" :to="{ name: 'absensi' }" label="absensi" />
        <q-separator vertical color="white"></q-separator>
        <q-route-tab icon="point_of_sale" :to="{ name: 'penjualan' }" label="Penjualan" />
        <q-separator vertical color="white"></q-separator>
        <q-route-tab icon="inventory_2" :to="{ name: 'pengiriman' }" label="Pengiriman" />
        <q-route-tab icon="archive" :to="{ name: 'mutasi' }" label="Mutasi" />
        <q-separator vertical color="white"></q-separator>
        <q-route-tab
          icon="install_desktop"
          :to="{ name: 'check-in' }"
          label="Check Buka"
        />
        <q-route-tab
          icon="content_paste_go"
          :to="{ name: 'check-out' }"
          label="Check Tutup"
        />
        <q-separator vertical color="white"></q-separator>
        <q-route-tab
          icon="event_repeat"
          :to="{ name: 'check-rotasi' }"
          label="Check Rotasi"
        />
        <!-- <q-route-tab :to="{ name: 'riwayat_penjualan' }" label="Riwayat Penjualan" />
        <q-route-tab :to="{ name: 'riwayat_pengiriman' }" label="Riwayat Pengiriman" />
        <q-separator vertical color="white"></q-separator> -->
        <!-- <q-route-tab to="/page3" label="Tutup" /> -->
        <!-- <q-route-tab :to="{ name: 'generate' }" label="Generate" /> -->
      </q-tabs>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered> </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" bordered>
      <ListRightDrawer></ListRightDrawer>
    </q-drawer>

    <q-page-container>
      <DialogInvoicePenjualan ref="dialog_invoice_penjualan"></DialogInvoicePenjualan>
      <DialogInvoicePengiriman ref="dialog_invoice_pengiriman"></DialogInvoicePengiriman>
      <DialogInvoiceMutasi ref="dialog_invoice_mutasi"></DialogInvoiceMutasi>
      <DialogInvoiceRotasi ref="dialog_invoice_rotasi"></DialogInvoiceRotasi>
      <DialogInvoiceCheckIn ref="dialog_invoice_checkin"></DialogInvoiceCheckIn>
      <DialogInvoiceCheckOut ref="dialog_invoice_checkout"></DialogInvoiceCheckOut>
      <DialogInvoiceAbsensi ref="dialog_invoice_absensi"></DialogInvoiceAbsensi>
      <DialogGantiKasir ref="dialog_ganti_kasir"></DialogGantiKasir>

      <router-view v-if="indexTerms" name="index" />
      <router-view v-else name="default" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { date } from "quasar";

import { mapActions, mapState, mapWritableState } from "pinia";
import { usePenjualanStore } from "src/stores/penjualan-store";
import { usePengirimanStore } from "src/stores/pengiriman-store";
import { usePengaturanStore } from "src/stores/pengaturan-store";
import { useAbsensiStore } from "src/stores/absensi-store";

import { useMutasiStore } from "src/stores/mutasi-store";

import DialogInvoicePenjualan from "src/components/DialogInvoicePenjualan.vue";
import DialogInvoiceMutasi from "src/components/DialogInvoiceMutasi.vue";
import { useRotasiStore } from "src/stores/rotasi-store";
import { useCheckInStore } from "src/stores/checkin-store";
import { useCheckOutStore } from "src/stores/checkout-store";
import DialogInvoiceRotasi from "src/components/DialogInvoiceRotasi.vue";
import DialogInvoiceCheckIn from "src/components/DialogInvoiceCheckIn.vue";
import DialogInvoiceCheckOut from "src/components/DialogInvoiceCheckOut.vue";
import DialogInvoicePengiriman from "src/components/DialogInvoicePengiriman.vue";
import DialogInvoiceAbsensi from "src/components/DialogInvoiceAbsensi.vue";
import DialogGantiKasir from "src/components/DialogGantiKasir.vue";

import ListRightDrawer from "src/components/ListRightDrawer.vue";

const timeStamp = Date.now();
// const formattedString = date.formatDate(timeStamp, "YYYY-MM-DD HH:mm:ss");
const tanggalString = date.formatDate(timeStamp, "YYYY-MM-DD");

export default {
  components: {
    DialogInvoicePenjualan,
    DialogInvoicePengiriman,
    DialogInvoiceMutasi,
    DialogInvoiceRotasi,
    DialogInvoiceCheckIn,
    DialogInvoiceCheckOut,
    DialogInvoiceAbsensi,
    ListRightDrawer,
    DialogGantiKasir,
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
  data() {
    return {
      tanggalString,
      // position: null,
    };
  },
  computed: {
    ...mapWritableState(usePengaturanStore, {
      position: "position",
      PENGATURAN_cashier: "cashier",
      PENGATURAN_cabang: "cabang",
      PENGATURAN_balance: "balance",
      PENGATURAN_list_cashiers: "list_cashiers",
      PENGATURAN_list_courirs: "list_courirs",
      // PENGATURAN_list_shifts: "list_shifts",
    }),
    ...mapState(usePenjualanStore, {
      PENJUALAN_items: "items",
      PENJUALAN_struk: "struk",
      PENJUALAN_invoice: "invoice",
    }),
    ...mapState(usePengirimanStore, {
      // PENGIRIMAN_items: "items",
      PENGIRIMAN_struk: "struk",
      PENGIRIMAN_invoice: "invoice",
    }),
    ...mapState(useMutasiStore, {
      // MUTASI_items: "items",
      MUTASI_struk: "struk",
      MUTASI_invoice: "invoice",
    }),
    ...mapState(useRotasiStore, {
      // ROTASI_items: "items",
      ROTASI_struk: "struk",
      ROTASI_invoice: "invoice",
    }),
    ...mapState(useCheckInStore, {
      // CHECKIN_items: "items",
      CHECKIN_struk: "struk",
      CHECKIN_struks: "struks",
      CHECKIN_invoice: "invoice",
    }),
    ...mapState(useCheckOutStore, {
      // CHECKOUT_items: "items",
      CHECKOUT_struk: "struk",
      CHECKOUT_invoice: "invoice",
    }),
    ...mapState(useAbsensiStore, {
      // CHECKOUT_items: "items",
      ABSENSI_struk: "struk",
      ABSENSI_invoice: "invoice",
    }),
    indexTerms() {
      if (
        this.$route.name == "pengaturan_produk" ||
        this.$route.name == "pengaturan_kasir" ||
        this.$route.name == "pengaturan_kurir" ||
        this.$route.name == "pengaturan_outlet"
      ) {
        return false;
      }

      if (!this.PENGATURAN_cashier) return true;
      if (this.PENGATURAN_list_cashiers?.length <= 0) return true;
      if (this.PENGATURAN_list_courirs?.length <= 0) return true;
    },
  },
  watch: {
    // jika di halaman check-in/check-out/check-rotasi
    "$route.name": {
      deep: true,
      immediate: true,
      handler(val) {
        switch (val) {
          case "check-rotasi":
            this.ROTASI_loadLocalStorageStruks(tanggalString);
            break;
          case "check-in":
            this.CHECKIN_loadLocalStorageStruks(tanggalString);
            break;
          case "check-out":
            this.CHECKOUT_loadLocalStorageStruks(tanggalString);
            break;
          case "absensi":
            this.ABSENSI_loadLocalStorageStruks(tanggalString);
            break;
        }
      },
    },
    // ---------------------------- //
    PENJUALAN_items(val) {
      console.log("MAINLAYOUT PENJUALAN_items");
      localStorage.setItem("PENJUALAN-ITEMS", JSON.stringify(val));
    },
    PENJUALAN_struk: {
      deep: true,
      handler(val) {
        console.log("MAINLAYOUT PENJUALAN_struk");
        localStorage.setItem("PENJUALAN-STRUK", JSON.stringify(val));
        localStorage.setItem("PENJUALAN-ITEMS", JSON.stringify(this.PENJUALAN_items));
      },
    },
    PENJUALAN_invoice(val) {
      console.log("MAINLAYOUT PENJUALAN_invoice");
      localStorage.setItem("PENJUALAN-INVOICE", JSON.stringify(val));
    },
    // ---------------------------- //
    PENGIRIMAN_struk: {
      deep: true,
      handler(val) {
        console.log("MAINLAYOUT PENGIRIMAN_struk");
        localStorage.setItem("PENGIRIMAN-STRUK", JSON.stringify(val));
        localStorage.setItem("PENJUALAN-ITEMS", JSON.stringify(this.PENJUALAN_items));
      },
    },
    PENGIRIMAN_invoice(val) {
      console.log("MAINLAYOUT PENGIRIMAN_invoice");
      localStorage.setItem("PENGIRIMAN-INVOICE", JSON.stringify(val));
    },
    // ---------------------------- //
    MUTASI_struk: {
      deep: true,
      handler(val) {
        console.log("MAINLAYOUT MUTASI_struk");
        localStorage.setItem("MUTASI-STRUK", JSON.stringify(val));
        localStorage.setItem("PENJUALAN-ITEMS", JSON.stringify(this.PENJUALAN_items));
      },
    },
    MUTASI_invoice(val) {
      console.log("MAINLAYOUT MUTASI_invoice");
      localStorage.setItem("MUTASI-INVOICE", JSON.stringify(val));
    },
    // ---------------------------- //
    ROTASI_struk: {
      deep: true,
      handler(val) {
        console.log("MAINLAYOUT ROTASI_struk");
        localStorage.setItem("ROTASI-STRUK", JSON.stringify(val));
        localStorage.setItem("PENJUALAN-ITEMS", JSON.stringify(this.PENJUALAN_items));
      },
    },
    ROTASI_invoice(val) {
      console.log("MAINLAYOUT ROTASI_invoice");
      localStorage.setItem("ROTASI-INVOICE", JSON.stringify(val));
    },
    // ---------------------------- //
    CHECKIN_struk: {
      deep: true,
      handler(val) {
        console.log("MAINLAYOUT CHECKIN_struk");
        localStorage.setItem("CHECK-BUKA-STRUK", JSON.stringify(val));
        localStorage.setItem("PENJUALAN-ITEMS", JSON.stringify(this.PENJUALAN_items));
      },
    },
    CHECKIN_invoice(val) {
      console.log("MAINLAYOUT CHECKIN_invoice");
      localStorage.setItem("CHECK-BUKA-INVOICE", JSON.stringify(val));
    },
    // ---------------------------- //
    CHECKOUT_struk: {
      deep: true,
      handler(val) {
        console.log("MAINLAYOUT CHECKOUT_struk");
        localStorage.setItem("CHECK-TUTUP-STRUK", JSON.stringify(val));
        localStorage.setItem("PENJUALAN-ITEMS", JSON.stringify(this.PENJUALAN_items));
      },
    },
    CHECKOUT_invoice(val) {
      console.log("MAINLAYOUT CHECKOUT_invoice");
      localStorage.setItem("CHECK-TUTUP-INVOICE", JSON.stringify(val));
    },
    // ---------------------------- //
    ABSENSI_struk: {
      deep: true,
      handler(val) {
        console.log("MAINLAYOUT ABSENSI_struk");
        localStorage.setItem("ABSENSI-STRUK", JSON.stringify(val));
      },
    },
    ABSENSI_invoice(val) {
      console.log("MAINLAYOUT ABSENSI_invoice");
      localStorage.setItem("ABSENSI-INVOICE", JSON.stringify(val));
    },

    //
    PENGATURAN_cabang(val) {
      localStorage.setItem("PENGATURAN-DAFTAR-CABANG", JSON.stringify(val));
    },
    PENGATURAN_list_cashiers(val) {
      console.log("MAINLAYOUT PENGATURAN_list_cashiers");
      localStorage.setItem("PENGATURAN-DAFTAR-KASIR", JSON.stringify(val));
    },
    PENGATURAN_list_courirs(val) {
      console.log("MAINLAYOUT PENGATURAN_list_courirs");
      localStorage.setItem("PENGATURAN-DAFTAR-KURIR", JSON.stringify(val));
    },
    // PENGATURAN_list_shifts(val) {
    //   console.log("MAINLAYOUT PENGATURAN_list_shifts");
    //   localStorage.setItem("PENGATURAN-DAFTAR-SHIFT", JSON.stringify(val));
    // },
  },
  methods: {
    ...mapActions(usePenjualanStore, {
      PENJUALAN_initLocalStorage: "initLocalStorage",
      PENJUALAN_updateLocalStorage: "updateLocalStorage",
      onBayar: "onBayar",
    }),
    ...mapActions(usePengirimanStore, {
      PENGIRIMAN_initLocalStorage: "initLocalStorage",
      PENGIRIMAN_updateLocalStorage: "updateLocalStorage",
    }),
    ...mapActions(useMutasiStore, {
      MUTASI_initLocalStorage: "initLocalStorage",
      MUTASI_updateLocalStorage: "updateLocalStorage",
    }),
    ...mapActions(useRotasiStore, {
      ROTASI_initLocalStorage: "initLocalStorage",
      ROTASI_updateLocalStorage: "updateLocalStorage",
      ROTASI_loadLocalStorageStruks: "loadLocalStorageStruks",
    }),
    ...mapActions(useCheckInStore, {
      CHECKIN_initLocalStorage: "initLocalStorage",
      CHECKIN_updateLocalStorage: "updateLocalStorage",
      CHECKIN_loadLocalStorageStruks: "loadLocalStorageStruks",
    }),
    ...mapActions(useCheckOutStore, {
      CHECKOUT_initLocalStorage: "initLocalStorage",
      CHECKOUT_updateLocalStorage: "updateLocalStorage",
      CHECKOUT_loadLocalStorageStruks: "loadLocalStorageStruks",
    }),
    ...mapActions(usePengaturanStore, {
      PENGATURAN_initLocalStorage: "initLocalStorage",
    }),
    ...mapActions(useAbsensiStore, {
      ABSENSI_initLocalStorage: "initLocalStorage",
      ABSENSI_updateLocalStorage: "updateLocalStorage",
      ABSENSI_loadLocalStorageStruks: "loadLocalStorageStruks",
    }),
    onDialogGantiKasir() {
      this.$refs.dialog_ganti_kasir.onOpen();
    },
    onSwal(item, route_name, title) {
      const vm = this;

      this.$swal({
        // position: "top-end",
        icon: "success",
        title: title,
        text: `Struk diterbitkan ${item?.created_at}`,
        showConfirmButton: true,
        confirmButtonText: `Invoice ${item.code}`,
        // timer: 1500,
        allowOutsideClick: () => {
          const popup = vm.$swal.getPopup();
          popup.classList.remove("swal2-show");
          setTimeout(() => {
            popup.classList.add("animate__animated", "animate__headShake");
          });
          setTimeout(() => {
            popup.classList.remove("animate__animated", "animate__headShake");
          }, 500);
          return false;
        },
      }).then((result) => {
        if (result.isConfirmed) {
          if (route_name == "riwayat_penjualan") {
            // vm.$router.push({
            //   name: route_name,
            // });
            vm.$refs.dialog_invoice_penjualan?.onOpen();
          } else if (route_name == "riwayat_pengiriman") {
            vm.$refs.dialog_invoice_pengiriman?.onOpen();
          } else if (route_name == "riwayat_mutasi") {
            vm.$refs.dialog_invoice_mutasi?.onOpen();
          } else if (route_name == "riwayat_rotasi") {
            vm.$refs.dialog_invoice_rotasi?.onOpen();
          } else if (route_name == "riwayat_checkin") {
            vm.$refs.dialog_invoice_checkin?.onOpen();
          } else if (route_name == "riwayat_checkout") {
            vm.$refs.dialog_invoice_checkout?.onOpen();
          }
        }
      });
    },
    getPosition() {
      var options = {
        enableHighAccuracy: true,
        maximumAge: 3600000,
      };

      if (!navigator?.geolocation) return; //(this.position = "NO SUPPORTED");

      var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

      const vm = this;

      function onSuccess(position) {
        vm.position = position;
      }

      function onError(error) {
        // alert("code: " + error.code + "\n" + "message: " + error.message + "\n");
      }
    },

    watchPosition() {
      var options = {
        maximumAge: 3600000,
        timeout: 3000,
        enableHighAccuracy: true,
      };

      if (!navigator?.geolocation) return; //(this.position = "NO SUPPORTED");

      var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

      const vm = this;

      function onSuccess(position) {
        vm.position = position;
      }

      function onError(error) {
        // alert("code: " + error.code + "\n" + "message: " + error.message + "\n");
      }
    },
  },
  created() {
    this.PENJUALAN_initLocalStorage();
    this.PENGIRIMAN_initLocalStorage();
    this.MUTASI_initLocalStorage();
    this.ROTASI_initLocalStorage();
    this.CHECKIN_initLocalStorage();
    this.CHECKOUT_initLocalStorage();
    this.PENGATURAN_initLocalStorage();
    this.ABSENSI_initLocalStorage();
  },
  mounted() {
    const vm = this;

    console.log("navigator?.geolocation", navigator?.geolocation);

    if (navigator?.geolocation) {
      this.getPosition();
      this.watchPosition();
    }

    this.$global.$off("MainLayout");
    this.$global.$on("MainLayout", function (event) {
      switch (event?.label) {
        case "DialogAbsensi":
          vm.ABSENSI_updateLocalStorage();
          vm.onSwal(event.value, "riwayat_absensi", event.tipe);
          break;
        case "DialogBayarPenjualan":
          vm.PENJUALAN_updateLocalStorage();
          vm.onBayar();
          vm.onSwal(event.value, "riwayat_penjualan", "PENJUALAN SELESAI");
          break;
        case "DialogConfirmPengiriman":
          vm.PENGIRIMAN_updateLocalStorage();
          vm.onSwal(event.value, "riwayat_pengiriman", "PENGIRIMAN SELESAI");
          break;
        case "DialogConfirmMutasi":
          vm.MUTASI_updateLocalStorage();
          vm.onSwal(event.value, "riwayat_mutasi", "MUTASI SELESAI");
          break;
        case "DialogConfirmRotasi":
          vm.ROTASI_updateLocalStorage();
          vm.onSwal(event.value, "riwayat_rotasi", "CHECK ROTASI SELESAI");
          break;
        case "DialogConfirmCheckIn":
          vm.CHECKIN_updateLocalStorage();
          vm.onSwal(event.value, "riwayat_checkin", "CHECK BUKA SELESAI");
          break;
        case "DialogConfirmCheckOut":
          vm.CHECKOUT_updateLocalStorage();
          vm.onSwal(event.value, "riwayat_checkout", "CHECK TUTUP SELESAI");
          break;
        case "DialogGantiKasir":
          vm.onDialogGantiKasir();
          break;
      }
    });

    // setTimeout(() => {
    if ("geolocation" in navigator) {
      // Request the user's current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          vm.position = position;
          console.log("position", vm.position);
          // Success callback: update latitude and longitude
          // this.struk.latitude = position.coords.latitude;
          // this.struk.longitude = position.coords.longitude;
        },
        (error) => {
          // Error callback: handle different error cases
        }
      );
    }
    // }, 1000);
  },
};
</script>
