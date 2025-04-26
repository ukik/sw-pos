<template>
  <div class="" style="">
    <q-list padding class="rounded-borders text-primary">
      <q-item-label class="text-h6" header>Riwayat</q-item-label>

      <q-item
        clickable
        v-ripple
        :active="link === 'riwayat_penjualan'"
        @click="link = 'riwayat_penjualan'"
        :to="{ name: 'riwayat_penjualan' }"
        active-class="bg-sw text-white"
      >
        <q-item-section avatar>
          <q-icon name="point_of_sale" />
        </q-item-section>

        <q-item-section>Penjualan</q-item-section>
      </q-item>

      <q-separator spaced />

      <q-item
        clickable
        v-ripple
        :active="link === 'riwayat_absensi'"
        @click="link = 'riwayat_absensi'"
        active-class="bg-sw text-white"
        :to="{ name: 'riwayat_absensi' }"
      >
        <q-item-section avatar>
          <q-icon name="event" />
        </q-item-section>

        <q-item-section>Absensi</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'riwayat_balance'"
        @click="link = 'riwayat_balance'"
        active-class="bg-sw text-white"
        :to="{ name: 'riwayat_balance' }"
      >
        <q-item-section avatar>
          <q-icon name="account_balance" />
        </q-item-section>

        <q-item-section>Saldo</q-item-section>
      </q-item>


      <q-separator spaced />

      <q-item
        clickable
        v-ripple
        :active="link === 'riwayat_pengiriman'"
        @click="link = 'riwayat_pengiriman'"
        active-class="bg-sw text-white"
        :to="{ name: 'riwayat_pengiriman' }"
      >
        <q-item-section avatar>
          <q-icon name="inventory_2" />
        </q-item-section>

        <q-item-section>Pengiriman</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'riwayat_mutasi'"
        @click="link = 'riwayat_mutasi'"
        active-class="bg-sw text-white"
        :to="{ name: 'riwayat_mutasi' }"
      >
        <q-item-section avatar>
          <q-icon name="archive" />
        </q-item-section>

        <q-item-section>Mutasi</q-item-section>
      </q-item>

      <q-separator spaced />

      <q-item
        clickable
        v-ripple
        :active="link === 'riwayat_checkin'"
        @click="link = 'riwayat_checkin'"
        active-class="bg-sw text-white"
        :to="{ name: 'riwayat_checkin' }"
      >
        <q-item-section avatar>
          <q-icon name="install_desktop" />
        </q-item-section>

        <q-item-section>Cek Buka</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'riwayat_checkout'"
        @click="link = 'riwayat_checkout'"
        active-class="bg-sw text-white"
        :to="{ name: 'riwayat_checkout' }"
      >
        <q-item-section avatar>
          <q-icon name="content_paste_go" />
        </q-item-section>

        <q-item-section>Cek Tutup</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'riwayat_rotasi'"
        @click="link = 'riwayat_rotasi'"
        active-class="bg-sw text-white"
        :to="{ name: 'riwayat_rotasi' }"
      >
        <q-item-section avatar>
          <q-icon name="event_repeat" />
        </q-item-section>

        <q-item-section>Cek Rotasi</q-item-section>
      </q-item>

      <q-separator spaced />

      <q-item-label class="text-h6" header>Pengaturan</q-item-label>

      <q-item
        clickable
        v-ripple
        :active="link === 'pengaturan_produk'"
        @click="link = 'pengaturan_produk'"
        active-class="bg-sw text-white"
        :to="{ name: 'pengaturan_produk' }"
      >
        <q-item-section avatar>
          <q-icon name="fastfood" />
        </q-item-section>

        <q-item-section>Produk</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'pengaturan_kasir'"
        @click="link = 'pengaturan_kasir'"
        active-class="bg-sw text-white"
        :to="{ name: 'pengaturan_kasir' }"
      >
        <q-item-section avatar>
          <q-icon name="support_agent" />
        </q-item-section>

        <q-item-section>Kasir</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'pengaturan_kurir'"
        @click="link = 'pengaturan_kurir'"
        active-class="bg-sw text-white"
        :to="{ name: 'pengaturan_kurir' }"
      >
        <q-item-section avatar>
          <q-icon name="engineering" />
        </q-item-section>

        <q-item-section>Kurir</q-item-section>
      </q-item>

      <!-- FITUR SHIFT DI CANCEL -->
      <!-- <q-item
        clickable
        v-ripple
        :active="link === 'pengaturan_shift'"
        @click="link = 'pengaturan_shift'"
        active-class="bg-sw text-white"
        :to="{ name: 'pengaturan_shift' }"
      >
        <q-item-section avatar>
          <q-icon name="alarm" />
        </q-item-section>

        <q-item-section>Shift</q-item-section>
      </q-item> -->

      <q-item
        clickable
        v-ripple
        :active="link === 'pengaturan_outlet'"
        @click="link = 'pengaturan_outlet'"
        active-class="bg-sw text-white"
        :to="{ name: 'pengaturan_outlet' }"
      >
        <q-item-section avatar>
          <q-icon name="store" />
        </q-item-section>

        <q-item-section>Outlet</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      link: ref(""),
    };
  },
  watch: {
    "$route.name": {
      immediate: true,
      deep: true,
      handler(payload) {
        console.log("ListRightDrawer", payload);
        switch (payload) {
          case "riwayat_penjualan":
          case "riwayat_pengiriman":
          case "riwayat_mutasi":
          case "riwayat_checkin":
          case "riwayat_rotasi":
          case "riwayat_checkout":
          case "riwayat_absensi":
          case "riwayat_balance":
          case "pengaturan_produk":
          case "pengaturan_kasir":
          case "pengaturan_kurir":
          case "pengaturan_outlet":
          case "pengaturan_shift":
            this.link = payload;
            break;
          default:
            this.link = "";
            break;
        }
      },
    },
  },
};
</script>

<style lang="sass">
.my-menu-link
  color: white
  background: #F2C037
</style>
