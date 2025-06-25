<template>
  <q-page class="flex flex-center row q-py-lg">
    <div class="col-12 text-center">
      <img
        class="q-pb-lg"
        alt="Quasar logo"
        src="images/logo.jpg"
        style="width: 200px; height: auto"
      />
      <q-banner class="q-mx-lg bg-grey-3 text-left">
        <template v-slot:avatar>
          <q-icon name="warning" color="red" />
        </template>
        Lakukan STOK AWAL sebelum melakukan CEK ROTASI
        <template v-slot:action>
          <q-btn
            size="18px"
            :to="{ name: 'check-in' }"
            color="primary"
            label="STOK AWAL"
          />
        </template>
      </q-banner>
    </div>
  </q-page>
</template>
