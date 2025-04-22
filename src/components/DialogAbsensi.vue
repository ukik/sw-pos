<template>
  <q-dialog persistent full-width full-height v-model="medium">
    <q-card class="q-mt-md" style="width: 700px; max-width: 80vw">
      <q-form @submit="onSave">
        <q-card-section class="bg-sw text-white q-py-none">
          <q-toolbar class="q-px-none">
            <q-toolbar-title>
              <div class="text-h6">{{ title }}</div>
            </q-toolbar-title>

            <q-btn v-close-popup flat dense color="white" rounded icon="close"></q-btn>
          </q-toolbar>
        </q-card-section>

        <q-separator></q-separator>

        <q-card-section
          v-if="form?.jam_mulai"
          class="scroll"
          style="height: calc(100vh - 55px - 50px - 50px)"
        >
          <q-banner dense class="bg-red col-12 q-mb-md text-white">
            <template v-slot:avatar>
              <q-icon name="warning" color="white" />
            </template>
            Tidak bisa diubah setelah tersimpan
          </q-banner>

          <div v-if="imageUrl" class="text-center q-mb-md">
            <q-img
              :src="imageUrl"
              spinner-color="white"
              style="height: 300px; width: 300px"
            />
          </div>

          <div class="q-mb-md">
            <q-input readonly label="Nama Kasir" v-model="form.cashier.nama" />
          </div>
          <div class="q-mb-md">
            <q-input
              mask="Rp. ############"
              unmasked-value
              readonly
              label="Modal Awal"
              v-model="form.modal_kas"
            />
          </div>
          <div class="q-mb-md">
            <q-input readonly label="Catatan" v-model="form.catatan_masuk" />
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-6">
              <q-input readonly label="Jam Masuk" v-model="form.jam_mulai" />
            </div>
            <div class="col-6">
              <q-input readonly label="Jam Selesai" v-model="form.jam_selesai" />
            </div>
          </div>
        </q-card-section>

        <q-card-section
          v-if="!form?.jam_mulai"
          class="scroll"
          style="height: calc(100vh - 55px - 50px - 50px)"
        >
          <q-banner dense class="bg-red col-12 q-mb-md text-white">
            <template v-slot:avatar>
              <q-icon name="warning" color="white" />
            </template>
            Tidak bisa diubah setelah tersimpan
          </q-banner>

          <div class="text-center q-mb-md">
            <q-img
              :src="imageUrl ? imageUrl : $defaultImage"
              spinner-color="white"
              style="height: 300px; width: 300px"
            />
          </div>

          <div class="q-mb-md">
            <q-input readonly label="Nama Kasir" v-model="form.cashier.nama" />
          </div>

          <div class="q-mb-md">
            <q-file
              @update:model-value="onUpdateValueFile"
              clearable
              outlined
              accept=".jpg, .pdf, image/*"
              label="Foto"
              hint="Wajib diisi foto"
              :rules="[(val) => !!val || 'Wajib diisi foto']"
              v-model="foto"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>

          <q-banner dense class="bg-blue col-12 q-mb-md text-white">
            <template v-slot:avatar>
              <q-icon name="info" color="white" />
            </template>
            Modal lama akan diganti dengan modal baru
          </q-banner>

          <div class="q-mb-md">
            <q-input
              outlined
              type="number"
              mask="Rp. ##########"
              unmasked-value
              autogrow
              label="Modal Awal"
              :rules="[(val) => !!val || 'Wajib diisi']"
              hint="Wajib diisi"
              v-model="form.modal_awal"
              stack-label
            />
          </div>

          <div class="q-mb-md">
            <q-input
              clearable
              outlined
              type="textarea"
              rows="4"
              autogrow
              label="Catatan Masuk"
              hint="Opsional diisi"
              v-model="form.catatan_masuk"
            />
          </div>

          <div class="">
            <q-input
              type="password"
              maxlength="4"
              clearable
              outlined
              label="PIN Kasir"
              :rules="[(val) => !!val || 'Wajib diisi PIN (4 digits)']"
              hint="Wajib diisi PIN (4 digits)"
              v-model="pin"
            />
          </div>
        </q-card-section>

        <q-separator></q-separator>
        <q-card-actions align="center" class="bg-white text-teal">
          <q-btn
            v-if="!form?.jam_mulai"
            type="submit"
            outline
            label="MASUK KERJA"
            icon="check_circle"
          />
          <q-btn
            v-else
            type="submit"
            color="red"
            outline
            label="PULANG KERJA"
            icon="check_circle"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions, mapWritableState } from "pinia";
import { useAbsensiStore } from "src/stores/absensi-store";
import { usePengaturanStore } from "src/stores/pengaturan-store";

import { date } from "quasar";

const timeStamp = Date.now();
const formattedString = date.formatDate(timeStamp, "YYYY-MM-DD HH:mm:ss");
const tanggalString = date.formatDate(timeStamp, "YYYY-MM-DD");
const waktuString = date.formatDate(timeStamp, "HH:mm:ss");

export default {
  data() {
    return {
      medium: false,

      title: "ABSENSI",

      pin: null,

      foto: null,
      imageUrl: "",

      form: {},
    };
  },
  computed: {
    ...mapWritableState(useAbsensiStore, {
      struk: "struk",
    }),
    ...mapWritableState(usePengaturanStore, {
      balance: "balance",
    }),
  },
  watch: {
    imageUrl(val) {
      // console.log("imageUrl", compressImage(val));
    },
  },
  methods: {
    ...mapActions(useAbsensiStore, {
      addItemToStruk: "addItemToStruk",
    }),
    onOpen(payload, title) {
      this.medium = true;
      // this.text = item;

      let temp = JSON.parse(JSON.stringify(payload));

      this.form = temp?.absensi ? temp?.absensi : temp;

      this.title = title;

      console.log("onOpen", this.form);

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
        console.log("reader.onloadend", temp, baseString);
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
      this.struk = this.form;

      console.log("onSave", this.form);
      if (!this.form?.jam_mulai) {
        if (this.form?.cashier.pin != this.pin) {
          return this.$q.notify({
            message: "Peringatan",
            caption: "PIN tidak cocok",
            icon: "warning",
            color: "negative",
            position: "top",
          });
        }

        this.balance = this.form?.modal_awal;

        this.struk.jam_mulai = waktuString;
      } else {
        this.struk.jam_selesai = waktuString;
      }

      // this.$emit("onBubbleEventOK", this.form);

      this.medium = false;

      // this.struk.bill = this.getTotalStruk;
      // this.struk.qty = this.getTotal?.qty;
      // this.struk.stok_awal = this.getTotal?.stok_awal;
      // this.struk.stok_akhir = this.getTotal?.stok_akhir;

      this.addItemToStruk();

      if (!this.form?.jam_mulai) {
        this.$global.$emit("MainLayout", {
          label: "DialogAbsensi",
          value: this.struk,
          tipe: "ABSENSI DATANG",
        });
      } else {
        this.$global.$emit("MainLayout", {
          label: "DialogAbsensi",
          value: this.struk,
          tipe: "ABSENSI PULANG",
        });
      }

      this.struk = null;
    },
  },
};
</script>
