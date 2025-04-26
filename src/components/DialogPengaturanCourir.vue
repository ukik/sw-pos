<template>
  <q-dialog persistent full-width full-height v-model="medium">
    <q-card class="q-mt-md" style="width: 700px; max-width: 80vw">
      <q-form @submit="onSave">
        <q-card-section class="bg-sw text-white q-py-none">
          <q-toolbar class="q-px-none">
            <q-toolbar-title>
              <div class="text-h6">FORMULIR KURIR</div>
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
            <q-field
              v-if="isCordova"
              ref="fieldRef"
              outlined
              v-model="foto"
              hint="Wajib diisi foto"
              :error="imageUrl ? false : true"
              error-message="Wajib diisi foto"
              :rules="[(val) => !!val || 'Wajib diisi foto']"
            >
              <CamerCordova
                @onBubbleEvent="onBubbleEventFoto"
                class="q-my-sm"
              ></CamerCordova>
            </q-field>

            <q-file
              v-else
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
              type="password"
              mask="####"
              unmasked-value
              clearable
              outlined
              label="PIN Kurir"
              :rules="[(val) => !!val || 'Wajib diisi PIN Kurir']"
              hint="Wajib diisi PIN Kurir"
              v-model="form.pin"
            />
          </div>
          <div class="q-mb-md">
            <q-input
              clearable
              outlined
              type="textarea"
              rows="4"
              label="Alamat"
              :rules="[(val) => !!val || 'Wajib diisi alamat']"
              hint="Wajib diisi alamat"
              v-model="form.alamat"
            />
          </div>

          <div class="q-mb-md">
            <q-input
              type="password"
              mask="####"
              unmasked-value
              clearable
              outlined
              label="PIN Master"
              :rules="[(val) => !!val || 'Wajib diisi PIN Master']"
              hint="Wajib diisi PIN Master"
              v-model="pin_master"
            />
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
import { mapActions, mapState } from "pinia";
import { usePengaturanStore } from "src/stores/pengaturan-store";

export default {
  data() {
    return {
      medium: false,

      pin_master: null,

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
  computed: {
    ...mapState(usePengaturanStore, {
      get_pin_master: "pin_master",
    }),
  },
  methods: {
    onBubbleEventFoto(payload) {
      if (!payload) {
        this.imageUrl = null;
        this.form.foto = null;
        return;
      }
      this.imageUrl = payload;
      this.form.foto = payload;

      return this.$q.notify({
        message: "Sukses",
        caption: "Foto berhasil diambil",
        icon: "positive",
        color: "done",
        position: "top",
      });
    },
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
    onNotify() {
      this.$q.notify({
        message: "Peringatan",
        caption: "Formulir wajib dilengkapi",
        icon: "warning",
        color: "negative",
        position: "top",
      });
    },
    onSave() {
      this.form.pin = Number(this.form.pin);

      if (!this.form.nama) return this.onNotify();
      if (!this.form.alamat) return this.onNotify();
      if (!this.form.pin) return this.onNotify();
      if (!this.form.foto) return this.onNotify();

      if (!this.pin_master) return this.onNotify();
      if (this.pin_master != this.get_pin_master)
        return this.$q.notify({
          message: "Peringatan",
          caption: "PIN Master salah",
          icon: "warning",
          color: "negative",
          position: "top",
        });

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

      this.medium = false;
    },
  },
};
</script>
