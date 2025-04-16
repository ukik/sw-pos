<template>
  <q-page class="q-pa-sm">
    {{ invoice }}
    <table id="customers">
      <thead>
        <tr>
          <th>No</th>
          <th>Item</th>
          <th>Kg</th>
          <th>Harga</th>
          <th>Sub Total</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, i) in invoice?.items">
          <tr>
            <td>{{ item?.produk_id }}</td>
            <td>{{ item?.name }}</td>
            <td>{{ item?.qty }}</td>
            <td>{{ item?.price }}</td>
            <td></td>
          </tr>
        </template>
        <tr>
          <td colspan="4"></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </q-page>
</template>

<script>
import { mapState } from "pinia";
import { usePenjualanStore } from "src/stores/penjualan-store";

export default {
  computed: {
    ...mapState(usePenjualanStore, {
      // items: "items",
      // struks: "struks",
      invoice: "invoice",
    }),
  },
};
</script>

<style>
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
}
</style>
