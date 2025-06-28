<template>
  <div class="">
    <!-- <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Contacts</q-toolbar-title>
    </q-toolbar> -->

    <q-list separator>
      <q-item v-for="(item, index) in getSort" :key="index" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar size="md" color="primary" text-color="white">
            {{ item?.no_order }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-capitalize text-bold">{{ item?.name }}</q-item-label>
          <!-- <q-item-label caption lines="1"
            >{{ item?.stock }} - {{ item?.no_order }}</q-item-label
          > -->
        </q-item-section>

        <q-item-section side>
          <q-item-label caption>Harga</q-item-label>
          <q-item-label class="text-bold" lines="1">{{ item?.stock }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label caption>Harga</q-item-label>
          <q-item-label class="text-bold" lines="1">{{ item?.stock }}</q-item-label>
        </q-item-section>

        <q-item-section side v-if="false">
          <q-item-label caption>Harga</q-item-label>
          <q-item-label class="text-bold" lines="1">{{ item?.stock }}</q-item-label>

          <!-- <div class="row">
            <q-chip square outline color="indigo" text-color="white" icon="sell">
              Rp. {{ item?.price }}
            </q-chip>
            <q-chip square outline color=" bg-sw" text-color="sw" icon="kitchen">
              {{ item?.stock }} kg
            </q-chip>
          </div> -->
        </q-item-section>
      </q-item>

      <!-- <q-separator /> -->
      <!-- <q-item-label header>Offline</q-item-label> -->

      <!-- <q-item
        v-for="contact in offline"
        :key="contact.id"
        class="q-mb-sm"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar>
            <img :src="`https://cdn.quasar.dev/img/${contact.avatar}`" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ contact.name }}</q-item-label>
          <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" color="grey" />
        </q-item-section>
      </q-item> -->
    </q-list>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { usePenjualanStore } from "src/stores/penjualan-store";

export default {
  data() {
    return {
      items: [],
    };
  },
  computed: {
    ...mapState(usePenjualanStore, {
      getItems: "items",
    }),
    getSort() {
      return this.items.sort(function (a, b) {
        var keyA = a?.no_order, //new Date(a.updated_at),
          keyB = b?.no_order; //new Date(b.updated_at);
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
    },
  },
  mounted() {
    this.items = JSON.parse(JSON.stringify(this.getItems));
  },
};
</script>
