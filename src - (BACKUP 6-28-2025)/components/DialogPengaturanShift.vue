<template>
  <q-dialog persistent full-width full-height v-model="medium">
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

        <q-card-section class="scroll" style="height: calc(100vh - 55px - 50px - 50px)">
          <div class="row q-col-gutter-md">
            <!-- {{ form }} -->
            <div class="col-12">
              <q-input readonly label="Nama" v-model="form.nama" />
            </div>
            <div class="col-12">
              <q-input
                clearable
                outlined
                type="textarea"
                rows="4"
                label="Deskripsi"
                hint="Opsional"
                v-model="form.description"
              />
            </div>
            <div class="col-6">
              <div style="font-size: 16px" class="text-left q-mb-sm">Jam Mulai</div>
              <q-time class="full-width" v-model="form.jam_mulai" />
            </div>
            <div class="col-6">
              <!-- <q-input readonly label="Jam Selesai" v-model="label_jam_mulai" /> -->
              <div style="font-size: 16px" class="text-left q-mb-sm">Jam Selesai</div>
              <q-time class="full-width" color="indigo" v-model="form.jam_selesai" />
            </div>
            <!-- <div class="q-mb-md">
            <q-input
              mask="# # # #"
              clearable
              outlined
              label="PIN"
              :rules="[(val) => !!val || 'Wajib diisi PIN']"
              hint="Wajib diisi PIN"
              v-model="form.pin"
            />
          </div> -->
          </div>
        </q-card-section>

        <q-separator></q-separator>
        <q-card-actions align="center" class="bg-white text-teal">
          <q-btn type="submit" outline label="SIMPAN" icon="check_circle" v-close-popup />
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
      label_jam_mulai: "",
      label_jam_selesai: "",
      form: {
        id: "",
        nama: "",
        description: "",
        jam_mulai: "",
        jam_selesai: "",
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
      this.$emit("onBubbleEventOK", this.form);
    },
  },
};
</script>
