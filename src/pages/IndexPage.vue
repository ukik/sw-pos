<template>
  <q-page class="flex flex-center row q-py-lg">
    <div class="col-12 text-center">
      <img
        class="q-pb-lg"
        alt="Quasar logo"
        src="images/logo.jpg"
        style="width: 200px; height: auto"
      />
    </div>

    <div class="col-xl-6 col-lg-6 col-md-7 col-sm-10 col-xs-12">
      <q-list separator="" class="col-12" bordered>
        <q-item-label header>LENGKAPI</q-item-label>
        <q-item :to="{ name: 'pengaturan_kasir' }" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white"> 1 </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>DAFTAR KASIR</q-item-label>
            <q-item-label caption lines="1">{{ getKasirLabel }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon
              size="xl"
              :name="getKasirLabelColor?.icon"
              :color="getKasirLabelColor?.color"
            />
          </q-item-section>
        </q-item>

        <q-item :to="{ name: 'pengaturan_kurir' }" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white"> 2 </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>DAFTAR KURIR</q-item-label>
            <q-item-label caption lines="1">Tidak boleh kosong</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon
              size="xl"
              :name="getKurirLabelColor?.icon"
              :color="getKurirLabelColor?.color"
            />
          </q-item-section>
        </q-item>

        <q-item @click="onDialogGantiKasir" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white"> 3 </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>KASIR PIKET</q-item-label>
            <q-item-label caption lines="1">{{ getPiketLabel }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon
              size="xl"
              :name="getPiketLabelColor?.icon"
              :color="getPiketLabelColor?.color"
            />
          </q-item-section>
        </q-item>
      </q-list>

      <q-item :to="{ name: 'absensi' }" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white"> 4 </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>ABSENSI HARIAN</q-item-label>
          <q-item-label caption lines="1">Tidak boleh kosong</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon
            size="xl"
            :name="getPiketSudahAbsensiColor?.icon"
            :color="getPiketSudahAbsensiColor?.color"
          />
        </q-item-section>
      </q-item>
    </div>
  </q-page>
</template>

<script>
import { mapState } from "pinia";
import { usePengaturanStore } from "src/stores/pengaturan-store";
import { useAbsensiStore } from "src/stores/absensi-store";

export default {
  computed: {
    ...mapState(useAbsensiStore, ["getPiketSudahAbsensi"]),
    ...mapState(usePengaturanStore, ["cashier", "list_cashiers", "list_courirs"]),
    getPiketSudahAbsensiColor() {
      return !this.getPiketSudahAbsensi?.id
        ? {
            color: "negative",
            icon: "cancel",
          }
        : {
            color: "positive",
            icon: "check_circle",
          };
    },

    getPiketLabel() {
      return this.cashier?.id
        ? `Bertugas sekarang ${this.cashier?.nama}`
        : `Tidak boleh kosong`;
    },
    getKasirLabel() {
      return this.list_cashiers?.length > 0
        ? `Terdapat ${this.list_cashiers?.length} orang kasir`
        : `Tidak boleh kosong`;
    },
    getKurirLabel() {
      return this.list_courirs?.length > 0
        ? `Terdapat ${this.list_courirs?.length} orang kurir`
        : `Tidak boleh kosong`;
    },
    getPiketLabelColor() {
      return !this.cashier?.id
        ? {
            color: "negative",
            icon: "cancel",
          }
        : {
            color: "positive",
            icon: "check_circle",
          };
    },
    getKasirLabelColor() {
      return this.list_cashiers?.length <= 0
        ? {
            color: "negative",
            icon: "cancel",
          }
        : {
            color: "positive",
            icon: "check_circle",
          };
    },
    getKurirLabelColor() {
      return this.list_courirs?.length <= 0
        ? {
            color: "negative",
            icon: "cancel",
          }
        : {
            color: "positive",
            icon: "check_circle",
          };
    },
  },
  methods: {
    onDialogGantiKasir() {
      this.$global.$emit("MainLayout", {
        label: "DialogGantiKasir",
      });
    },
  },
};
//
</script>
