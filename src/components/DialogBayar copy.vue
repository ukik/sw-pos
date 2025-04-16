<template>
  <q-dialog :persistent="false" v-model="fixed">
    <q-card>
      <q-card-section>
        <div class="text-h6">Bayar</div>
      </q-card-section>

      <q-separator />

      <q-card-section style="height: 50vh; width: 500px" class="scroll">
        <q-form class="q-col-gutter-md">
          <div>
            <q-input
              mask="Rp. ###############"
              readonly
              input-class="text-h6"
              v-model="form.balance"
              label="Saldo"
            />
          </div>
          <div>
            <q-input
              mask="Rp. ###############"
              readonly
              input-class="text-h6"
              v-model="form.bill"
              label="Tagihan"
            />
          </div>
          <div>
            <q-input
              readonly
              mask="Rp. ###############"
              input-class="text-h6"
              unmasked-value
              v-model="form.bayar"
              label="Bayar"
            >
              <template v-slot:after>
                <q-btn
                  label="Kalkulator"
                  color="primary"
                  class="full-height"
                  icon="calculate"
                ></q-btn>
              </template>
            </q-input>
          </div>
          <div>
            <q-input
              readonly
              mask="Rp. ###############"
              input-class="text-h6"
              unmasked-value
              v-model="form.change"
              label="Kembalian"
            />
          </div>
        </q-form>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="Decline" color="primary" v-close-popup />
        <q-btn flat label="Accept" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      fixed: ref(false),
    };
  },
  data() {
    return {
      form: {
        balance: 10000,
        bill: 0,
        bayar: 0,
        change: 0,
      },
    };
  },
  watch: {
    "form.bayar": function (val) {
      this.form.bayar = 11;
      console.log("onUpdateBayar", this.form.bayar);
      console.log("s1.substring(1);");
    },
  },
  methods: {
    onUpdateBayar() {
      this.form.bayar = 11;
      console.log("onUpdateBayar", this.form.bayar);
    },
    onOpen(item) {
      this.fixed = true;
    },
  },
};
</script>
