<template>
  <q-dialog persistent full-width full-height v-model="medium">
    <q-card>
      <MoneyCalculator
        @onBubbleEventOK="onBubbleEventOK"
        ref="money_money"
      ></MoneyCalculator>
      <q-form>
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
          :style="
            !form?.jam_selesai
              ? `height: calc(100vh - 55px - 50px - 50px)`
              : `height: calc(100vh - 55px - 50px - 0px)`
          "
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
              label="Kas Modal"
              v-model="form.modal_awal"
            />
          </div>
          <div class="q-mb-md">
            <q-input readonly label="Catatan Masuk" v-model="form.catatan_masuk" />
          </div>

          <div class="q-mb-md">
            <q-input readonly label="Catatan Pulang" v-model="form.catatan_pulang" />
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-6">
              <q-input readonly label="Jam Masuk" v-model="form.jam_mulai" />
            </div>
            <div class="col-6">
              <q-input readonly label="Jam Selesai" v-model="form.jam_selesai" />
            </div>
          </div>

          <div v-if="!form?.jam_selesai" class="q-my-md">
            <q-input
              clearable
              outlined
              type="textarea"
              rows="4"
              autogrow
              label="Catatan Pulang"
              hint="Opsional diisi"
              v-model="form.catatan_pulang"
            />
          </div>

          <div v-if="!form?.jam_selesai" class="">
            <q-input
              type="password"
              mask="####"
              unmasked-value
              maxlength="4"
              clearable
              outlined
              label="PIN Kasir"
              :rules="[(val) => !!val || 'Wajib diisi PIN Kasir (4 digits)']"
              hint="Wajib diisi PIN Kasir (4 digits)"
              v-model="pin"
            />
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
            <q-field
              v-if="isCordova"
              ref="fieldRef"
              outlined
              v-model="imageUrl"
              hint="Wajib diisi foto"
              :error="imageUrl ? false : true"
              error-message="Wajib diisi foto"
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
              hint="Wajib diisi foto"
              :error="imageUrl ? false : true"
              error-message="Wajib diisi foto"
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
            Kas lama akan diganti dengan kas baru
          </q-banner>

          <div class="q-mb-md">
            <q-input
              readonly
              clearable
              outlined
              mask="Rp. ##########"
              unmasked-value
              autogrow
              label="Kas Modal"
              :rules="[(val) => !!val || 'Wajib diisi']"
              hint="Wajib diisi"
              v-model="form.modal_awal"
              stack-label
            >
              <template v-slot:after>
                <q-btn
                  @click="onOpenMoneyCalculator"
                  color="primary"
                  unelevated
                  class="full-height"
                  icon="calculate"
                  label="Nominal"
                ></q-btn>
              </template>
            </q-input>
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
              mask="####"
              unmasked-value
              maxlength="4"
              clearable
              outlined
              label="PIN Kasir"
              :rules="[(val) => !!val || 'Wajib diisi PIN Kasir (4 digits)']"
              hint="Wajib diisi PIN Kasir (4 digits)"
              v-model="pin"
            />
          </div>
        </q-card-section>

        <q-separator v-if="!form?.jam_selesai"></q-separator>
        <q-card-actions
          v-if="!form?.jam_selesai"
          align="center"
          class="bg-white text-teal"
        >
          <q-btn
            @click="
              mode = 'ABSENSI MASUK';
              onSave();
            "
            v-if="!form?.jam_mulai"
            outline
            label="MASUK KERJA"
            icon="check_circle"
          />
          <q-btn
            @click="
              mode = 'ABSENSI PULANG';
              onSave();
            "
            v-else
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

import MoneyCalculator from "./commons/MoneyCalculator.vue";

import { date } from "quasar";

// const timeStamp = Date.now();
// const formattedString = date.formatDate(Date.now(), "YYYY-MM-DD HH:mm:ss");
// const tanggalString = date.formatDate(Date.now(), "YYYY-MM-DD");
// const waktuString = date.formatDate(Date.now(), "HH:mm:ss");

export default {
  components: {
    MoneyCalculator,
  },
  props: ["dialog"],
  data() {
    return {
      show: false,
      medium: false,

      title: "ABSENSI",

      pin: null,

      foto: null,
      imageUrl: "",

      form: {
        cashier: {}, // wajib untuk v-model
      },
    };
  },
  emits: ["onBubbleEventOK"],
  computed: {
    ...mapWritableState(useAbsensiStore, {
      struk: "struk",
      mode: "mode",
    }),
    ...mapWritableState(usePengaturanStore, {
      balance: "balance",
      cashier: "cashier",
    }),
  },
  watch: {
    imageUrl(val) {
      // console.log("imageUrl", compressImage(val));
    },
    dialog(val) {
      // this.medium = val;
    },
  },
  methods: {
    ...mapActions(useAbsensiStore, {
      addItemToStruk: "addItemToStruk",
      updateLocalStorage: "updateLocalStorage",
    }),
    onBubbleEventFoto(payload) {
      this.imageUrl = payload;
      this.form.foto = payload;

      if (payload) {
        return this.$q.notify({
          message: "Sukses",
          caption: "Foto berhasil diambil",
          icon: "check",
          color: "positive",
          position: "top",
        });
      }

      alert(payload);

      return this.$q.notify({
        message: "Perhatian",
        caption: "Foto gagal diambil",
        icon: "close",
        color: "negative",
        position: "top",
      });
    },
    onOpenMoneyCalculator() {
      this.$refs.money_money.onOpen();
    },
    onBubbleEventOK(payload) {
      this.form.modal_awal = payload?.price;
    },
    onOpen(payload, title) {
      this.medium = true;

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
    async onSave() {
      this.struk = this.form;

      console.log("onSave 1", this.form, this.cashier);

      if (this.form?.cashier_id != this.cashier?.id) {
        return this.$q.notify({
          message: "Peringatan",
          caption: "Salah profile kasir",
          icon: "warning",
          color: "negative",
          position: "top",
        });
      }

      if (!this.imageUrl) {
        // alert(`!this.imageUrl ${!this.imageUrl}`);
        return this.$q.notify({
          message: "Peringatan",
          caption: "Foto jangan kosong",
          icon: "warning",
          color: "negative",
          position: "top",
        });
      }

      if (this.form?.cashier.pin != this.pin) {
        // alert(`this.form?.cashier.pin != this.pin ${this.form?.cashier.pin != this.pin}`);
        return this.$q.notify({
          message: "Peringatan",
          caption: "PIN tidak cocok",
          icon: "warning",
          color: "negative",
          position: "top",
        });
      }

      this.form.modal_akhir = this.balance;

      if (!this.form?.jam_mulai) {
        // JAM DATANG
        this.balance = this.form?.modal_awal;

        this.struk.jam_mulai = date.formatDate(Date.now(), "HH:mm:ss");
      } else {
        // JAM PULANG
        this.struk.jam_selesai = date.formatDate(Date.now(), "HH:mm:ss");
      }

      console.log("onSave 2", this.form);

      // alert(`"onSave 2", ${JSON.stringify(this.form)}`);

      // this.$emit("onBubbleEventOK", this.form);

      this.medium = false;

      this.addItemToStruk();

      // this.updateLocalStorage();

      // this.$nextTick(() => {
      await this.$nextTick();
      if (this.mode == "ABSENSI MASUK") {
        this.$global.$emit("MainLayout", {
          label: "DialogAbsensi",
          value: this.struk,
          tipe: "ABSENSI DATANG",
        });
      } else if (this.mode == "ABSENSI PULANG") {
        this.$global.$emit("MainLayout", {
          label: "DialogAbsensi",
          value: this.struk,
          tipe: "ABSENSI PULANG",
        });
      }

      // if (!this.form?.jam_mulai) {
      //   this.$global.$emit("MainLayout", {
      //     label: "DialogAbsensi",
      //     value: this.struk,
      //     tipe: "ABSENSI DATANG",
      //   });
      // } else {
      //   this.$global.$emit("MainLayout", {
      //     label: "DialogAbsensi",
      //     value: this.struk,
      //     tipe: "ABSENSI PULANG",
      //   });
      // }
      // });

      await this.$nextTick();
      // this.struk = null;
      this.pin = null;
      this.foto = null;
      this.imageUrl = "";
      this.form = {};

      // this.$swal({
      //   // position: "top-end",
      //   icon: "success",
      //   title: "KASIR PIKET",
      //   text: `Sekarang ${this.struk?.nama}`,
      //   showConfirmButton: false,
      //   // confirmButtonText: `Invoice ${item.code}`,
      //   timer: 2000,
      // }).then((result) => {
      //   this.struk = null;
      //   this.pin = null;
      //   this.foto = null;
      //   this.imageUrl = "";
      //   this.form = {};
      // });
    },
  },
};
</script>
