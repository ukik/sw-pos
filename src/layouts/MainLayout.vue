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

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>

      <q-separator color="white"></q-separator>

      <q-tabs dense align="left" class="bg-blue">
        <q-route-tab :to="{ name: 'penjualan' }" label="Penjualan" />
        <q-route-tab :to="{ name: 'riwayat_penjualan' }" label="Riwayat Penjualan" />
        <q-separator vertical color="white"></q-separator>
        <q-route-tab :to="{ name: 'pengiriman' }" label="Pengiriman" />
        <q-route-tab :to="{ name: 'mutasi' }" label="Mutasi" />
        <q-route-tab :to="{ name: 'rotasi' }" label="Rotasi" />
        <q-route-tab :to="{ name: 'check-in' }" label="Cek Buka" />
        <q-route-tab :to="{ name: 'check-out' }" label="Cek Tutup" />
        <q-route-tab :to="{ name: 'riwayat_pengiriman' }" label="Riwayat Pengiriman" />
        <q-separator vertical color="white"></q-separator>
        <!-- <q-route-tab to="/page3" label="Tutup" /> -->
        <!-- <q-route-tab :to="{ name: 'generate' }" label="Generate" /> -->
      </q-tabs>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
      {{ position }}
    </q-drawer>

    <q-page-container>
      <DialogInvoicePenjualan ref="dialog_invoice_penjualan"></DialogInvoicePenjualan>
      <DialogInvoiceMutasi ref="dialog_invoice_mutasi"></DialogInvoiceMutasi>

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

import { mapActions, mapState, mapWritableState } from "pinia";
import { usePenjualanStore } from "src/stores/penjualan-store";
import { usePengirimanStore } from "src/stores/pengiriman-store";
import { usePengaturanStore } from "src/stores/pengaturan-store";
import { useMutasiStore } from "src/stores/mutasi-store";

import DialogInvoicePenjualan from "src/components/DialogInvoicePenjualan.vue";
import DialogInvoiceMutasi from "src/components/DialogInvoiceMutasi.vue";

export default {
  components: {
    DialogInvoicePenjualan,
    DialogInvoiceMutasi,
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
      // position: null,
    };
  },
  computed: {
    ...mapWritableState(usePengaturanStore, {
      position: "position",
    }),
    ...mapState(usePenjualanStore, {
      PENJUALAN_items: "items",
      PENJUALAN_struk: "struk",
      PENJUALAN_invoice: "invoice",
    }),
    ...mapState(usePengirimanStore, {
      PENGIRIMAN_items: "items",
      PENGIRIMAN_struk: "struk",
      PENGIRIMAN_invoice: "invoice",
    }),
    ...mapState(useMutasiStore, {
      MUTASI_items: "items",
      MUTASI_struk: "struk",
      MUTASI_invoice: "invoice",
    }),
  },
  watch: {
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
    PENGIRIMAN_items(val) {
      console.log("MAINLAYOUT PENGIRIMAN_items");
      localStorage.setItem("PENGIRIMAN-ITEMS", JSON.stringify(val));
    },
    PENGIRIMAN_struk: {
      deep: true,
      handler(val) {
        console.log("MAINLAYOUT PENGIRIMAN_struk");
        localStorage.setItem("PENGIRIMAN-STRUK", JSON.stringify(val));
        localStorage.setItem("PENGIRIMAN-ITEMS", JSON.stringify(this.PENJUALAN_items));
      },
    },
    PENGIRIMAN_invoice(val) {
      console.log("MAINLAYOUT PENGIRIMAN_invoice");
      localStorage.setItem("PENGIRIMAN-INVOICE", JSON.stringify(val));
    },
    // ---------------------------- //
    MUTASI_items(val) {
      console.log("MAINLAYOUT MUTASI_items");
      localStorage.setItem("MUTASI-ITEMS", JSON.stringify(val));
    },
    MUTASI_struk: {
      deep: true,
      handler(val) {
        console.log("MAINLAYOUT MUTASI_struk");
        localStorage.setItem("MUTASI-STRUK", JSON.stringify(val));
        localStorage.setItem("MUTASI-ITEMS", JSON.stringify(this.PENJUALAN_items));
      },
    },
    MUTASI_invoice(val) {
      console.log("MAINLAYOUT MUTASI_invoice");
      localStorage.setItem("MUTASI-INVOICE", JSON.stringify(val));
    },
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
          if (route_name == "riwayat_pengiriman") {
            vm.$router.push({
              name: route_name,
            });
          } else if (route_name == "riwayat_mutasi") {
            vm.$refs.dialog_invoice_mutasi?.onOpen();
          } else if (route_name == "riwayat_penjualan") {
            vm.$refs.dialog_invoice_penjualan?.onOpen();
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
        // alert(
        //   "Latitude: " +
        //     position.coords.latitude +
        //     "\n" +
        //     "Longitude: " +
        //     position.coords.longitude +
        //     "\n" +
        //     "Altitude: " +
        //     position.coords.altitude +
        //     "\n" +
        //     "Accuracy: " +
        //     position.coords.accuracy +
        //     "\n" +
        //     "Altitude Accuracy: " +
        //     position.coords.altitudeAccuracy +
        //     "\n" +
        //     "Heading: " +
        //     position.coords.heading +
        //     "\n" +
        //     "Speed: " +
        //     position.coords.speed +
        //     "\n" +
        //     "Timestamp: " +
        //     position.timestamp +
        //     "\n"
        // );
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
        // alert(
        //   "Latitude: " +
        //     position.coords.latitude +
        //     "\n" +
        //     "Longitude: " +
        //     position.coords.longitude +
        //     "\n" +
        //     "Altitude: " +
        //     position.coords.altitude +
        //     "\n" +
        //     "Accuracy: " +
        //     position.coords.accuracy +
        //     "\n" +
        //     "Altitude Accuracy: " +
        //     position.coords.altitudeAccuracy +
        //     "\n" +
        //     "Heading: " +
        //     position.coords.heading +
        //     "\n" +
        //     "Speed: " +
        //     position.coords.speed +
        //     "\n" +
        //     "Timestamp: " +
        //     position.timestamp +
        //     "\n"
        // );
      }

      function onError(error) {
        // alert("code: " + error.code + "\n" + "message: " + error.message + "\n");
      }
    },
  },
  mounted() {
    const vm = this;

    this.PENJUALAN_initLocalStorage();
    this.PENGIRIMAN_initLocalStorage();
    this.MUTASI_initLocalStorage();

    console.log("navigator?.geolocation", navigator?.geolocation);

    if (navigator?.geolocation) {
      this.getPosition();
      this.watchPosition();
    }

    this.$global.$off("MainLayout");
    this.$global.$on("MainLayout", function (event) {
      switch (event?.label) {
        case "DialogConfirmMutasi":
          vm.MUTASI_updateLocalStorage();
          vm.onSwal(event.value, "riwayat_mutasi", "MUTASI SELESAI");
          break;
        case "DialogConfirmPengiriman":
          vm.PENGIRIMAN_updateLocalStorage();
          vm.onSwal(event.value, "riwayat_pengiriman", "PENGIRIMAN SELESAI");
          break;
        case "DialogBayarPenjualan":
          vm.PENJUALAN_updateLocalStorage();
          vm.onBayar();
          vm.onSwal(event.value, "riwayat_penjualan", "PENJUALAN SELESAI");
          break;
      }
    });

    setTimeout(() => {
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
    }, 1000);
  },
};
</script>
