<template>
  <q-dialog persistent full-width full-height v-model="medium">
    <q-card class="q-mt-md" style="width: 700px; max-width: 80vw">
      <q-form @submit="onSave">
        <q-card-section class="bg-sw text-white q-py-none">
          <q-toolbar class="q-px-none">
            <q-toolbar-title>
              <div class="text-h6">FORMULIR KASIR</div>
            </q-toolbar-title>

            <q-btn v-close-popup flat dense color="white" rounded icon="close"></q-btn>
          </q-toolbar>
        </q-card-section>

        <q-separator></q-separator>

        <q-card-section class="scroll" style="height: calc(100vh - 55px - 50px - 50px)">
          <div v-if="imageUrl" class="text-center q-mb-md">
            <q-img
              :src="imageUrl"
              spinner-color="white"
              style="height: 300px; width: 300px"
            />
          </div>
          <div class="q-mb-md">
            <q-file
              @update:model-value="onUpdateValueFile"
              clearable
              outlined
              accept=".jpg, .pdf, image/*"
              label="Foto"
              hint="Pilihan diisi foto"
              v-model="foto"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>

          <div class="q-mb-md">
            <q-input
              clearable
              outlined
              label="Nama"
              :rules="[(val) => !!val || 'Wajib diisi nama']"
              hint="Wajib diisi nama"
              v-model="form.nama"
            />
          </div>

          <div class="q-mb-md">
            <q-input
              mask="# # # #"
              clearable
              outlined
              label="PIN"
              :rules="[(val) => !!val || 'Wajib diisi PIN']"
              hint="Wajib diisi PIN"
              v-model="form.pin"
            />
          </div>
          <div class="q-mb-md">
            <q-input
              clearable
              outlined
              type="textarea"
              rows="6"
              label="Alamat"
              :rules="[(val) => !!val || 'Wajib diisi alamat']"
              hint="Wajib diisi alamat"
              v-model="form.alamat"
            />
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
import { mapActions } from "pinia";

export default {
  data() {
    return {
      medium: false,

      foto: null,
      imageUrl: "",
      form: {
        id: "",
        nama: "",
        alamat: "",
        pin: null,
        foto: null,
      },
    };
  },
  methods: {
    onOpen(payload) {
      this.medium = true;
      // this.text = item;
      console.log(this.form);

      if (!payload) return;

      this.form = JSON.parse(JSON.stringify(payload));
      this.foto = this.form?.foto ? [this.form?.foto] : [];
      this.imageUrl = this.form?.foto ? this.form?.foto : "";
    },
    async onUpdateValueFile(payload) {
      console.log(payload);

      if (!payload) {
        this.imageUrl = null;
        this.form.foto = null;
        return;
      }

      const vm = this;

      var reader = new FileReader();
      var baseString;
      reader.onloadend = async function () {
        baseString = reader.result;
        const temp = await vm.$compressImage(baseString);
        // console.log("reader.onloadend", temp, baseString);
        vm.imageUrl = temp;
        vm.form.foto = temp;
      };
      reader.readAsDataURL(payload);

      // const base64 = await FileSystem.readAsStringAsync(payload, { encoding: "base64" });
      // console.log(base64);
      // this.imageUrl = URL.createObjectURL(this.foto);
      // const [file] = payload;
      // if (file) {
      //   blah.src = URL.createObjectURL(file);
      // }
    },
    onSave() {
      this.$emit("onBubbleEventOK", this.form);

      this.foto = null;
      this.imageUrl = "";
      this.form = {
        id: "",
        nama: "",
        alamat: "",
        pin: null,
        foto: null,
      };
    },
  },
};
</script>
