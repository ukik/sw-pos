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
        Lakukan CEK PERGANTIAN SHIFT sebelum melakukan STOK AKHIR
        <template v-slot:action>
          <q-btn
            size="18px"
            :to="{ name: 'check-rotasi' }"
            color="primary"
            label="CEK PERGANTIAN SHIFT"
          />
        </template>
      </q-banner>
    </div>
  </q-page>
</template>
