<template>
  <q-dialog persistent full-width v-model="medium">
    <q-card class="q-mt-md" style="width: 700px; max-width: 80vw">
      <q-form @submit="onSave">
        <q-card-section class="bg-sw text-white q-py-none">
          <q-toolbar class="q-px-none">
            <q-toolbar-title>
              <div class="text-h6">FORMULIR SHIFT</div>
            </q-toolbar-title>

            <q-btn v-close-popup flat dense color="white" rounded icon="close"></q-btn>
          </q-toolbar>
        </q-card-section>

        <q-separator></q-separator>

        <q-card-section class="scroll">
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input
                clearable
                outlined
                label="Nama"
                hint="Wajib diisi"
                :rules="[(val) => !!val || 'Wajib diisi']"
                v-model="form.nama"
              />
            </div>
            <div class="col-12">
              <q-input
                clearable
                :rules="[(val) => !!val || 'Wajib diisi']"
                hint="Wajib diisi"
                outlined
                type="textarea"
                rows="10"
                label="Alamat"
                v-model="form.alamat"
              />
            </div>
          </div>
        </q-card-section>

        <q-separator></q-separator>
        <q-card-actions align="center" class="bg-white text-teal">
          <q-btn type="submit" outline label="SIMPAN" icon="check_circle" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return {
      medium: false,
      form: {
        id: "",
        nama: "",
        alamat: "",
      },
    };
  },
  methods: {
    onOpen(payload) {
      this.medium = true;

      console.log(this.form);

      this.form = JSON.parse(JSON.stringify(payload));
    },

    onSave() {
      console.log(this.form);

      if (!this.form?.nama && !this.form?.alamat) {
        return this.$q.notify({
          message: "Peringatan",
          caption: "Formulir wajib lengkap",
          icon: "warning",
          color: "negative",
          position: "top",
        });
      }

      this.$emit("onBubbleEventOK", this.form);
      this.medium = false;
    },
  },
};
</script>
