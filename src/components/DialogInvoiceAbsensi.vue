<template>
  <q-dialog
    @show="show = true"
    full-width
    full-height
    v-model="fixed"
    transition-show="slide-down"
    transition-hide="slide-up"
  >
    <q-card id="contentToPrint">
      <!-- <q-card-actions class="bg-sw text-white">
        <q-btn v-close-popup class="col-auto" dense flat icon="arrow_back"></q-btn>
        <q-toolbar-title>INVOICE: {{ invoice?.code }}</q-toolbar-title>
        <q-btn label="cetak invoice" outline icon="print" @click="makePDFShare"></q-btn>
      </q-card-actions> -->

      <q-card-actions class="bg-sw text-white q-py-none">
        <q-toolbar-title>
          <q-avatar class="">
            <q-btn v-close-popup dense flat icon="arrow_back"></q-btn>
          </q-avatar>
          INVOICE: {{ invoice?.code }}
        </q-toolbar-title>
        <q-btn label="cetak invoice" outline icon="print" @click="makePDFShare"></q-btn>
      </q-card-actions>

      <q-card-section v-if="show" class="scroll" style="height: calc(100% - 52px)">
        <div v-show="isCreateContent" id="createContent" v-html="createContent"></div>
        <table style="width: 100%; margin-bottom: 10px">
          <tbody>
            <tr>
              <td style="width: 70px">
                <img height="60" src="images/logo.jpg" />
              </td>
              <td style="text-align: left">
                <div style="font-size: 24px"><b>FREEZTO-MART</b></div>
                <div style="font-size: 16px">
                  <b>GROSIR AYAM FRESH</b> - SEGAR SETIAP HARI
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <table id="customers2">
          <tbody>
            <tr>
              <td colspan="4">{{ invoice?.type }}</td>
            </tr>

            <tr>
              <td colspan="4">
                <img
                  :src="invoice?.foto ? invoice?.foto : $defaultImage"
                  spinner-color="white"
                  style="width: 300px"
                  width="300"
                />
              </td>
            </tr>

            <tr>
              <td>ID</td>
              <td>{{ invoice?.id }}</td>
              <td>Code</td>
              <td>{{ invoice?.code }}</td>
            </tr>
            <tr>
              <td>Kasir</td>
              <td>{{ invoice?.cashier?.nama }}</td>
              <td>Cabang</td>
              <td>{{ invoice?.cabang?.nama }}</td>
            </tr>

            <tr>
              <td>Modal Terakhir</td>
              <td>Rp. {{ invoice?.modal_awal }}</td>
              <td>Modal Sekarang</td>
              <td>Rp. {{ invoice?.modal_akhir }}</td>
            </tr>
            <tr>
              <td>Jam Mulai</td>
              <td>{{ invoice?.jam_mulai }}</td>
              <td>Jam Selesai</td>
              <td>{{ invoice?.jam_selesai }}</td>
            </tr>

            <tr>
              <td colspan="1">Catatan Masuk</td>
              <td colspan="3">
                {{ invoice?.catatan_masuk ? invoice?.catatan_masuk : "" }}
              </td>
            </tr>
            <tr>
              <td colspan="1">Catatan Pulang</td>
              <td colspan="3">
                {{ invoice?.catatan_pulang ? invoice?.catatan_pulang : "" }}
              </td>
            </tr>

            <tr>
              <td>Latitude</td>
              <td>{{ invoice?.latitude }}</td>
              <td>Longitude</td>
              <td>{{ invoice?.longitude }}</td>
            </tr>
            <tr>
              <td>Tanggal</td>
              <td>{{ invoice?.tanggal }}</td>
              <td>Waktu</td>
              <td>{{ invoice?.waktu }}</td>
            </tr>
          </tbody>
        </table>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapState } from "pinia";
import { useAbsensiStore } from "src/stores/absensi-store";

export default {
  computed: {
    ...mapState(useAbsensiStore, {
      invoice: "invoice",
    }),
    getTotal() {
      this.invoice?.items?.forEach((element) => {});
    },
    createContent() {
      let invoice = this.invoice;
      let content = `
                          <!DOCTYPE html>
                          <html lang="en">
                              <head>
                                  <meta charset="utf-8">
                                  <title>INVOICE CEK BUKA</title>


                                  <style>
                                  #customers2 {
                                    font-family: Arial, Helvetica, sans-serif;
                                    border-collapse: collapse;
                                    width: 100%;
                                  }

                                  #customers2 td,
                                  #customers2 th {
                                    border: 1px solid #ddd;
                                    padding: 8px;
                                  }

                                  #customers2 th {
                                    padding-top: 12px;
                                    padding-bottom: 12px;
                                    text-align: left;
                                    background-color: #04aa6d;
                                    color: white;
                                  }

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

                              </head>
                              <body>
                                  <table style="width: 100%; margin-bottom: 10px">
                                    <tbody>
                                      <tr>
                                        <td style="width: 70px">
                                          <img height="60" src="${this.$logoBase64}" />
                                        </td>
                                        <td style="text-align: left">
                                          <div style="font-size: 24px"><b>FREEZTO-MART</b> GROSIR AYAM FRESH</div>
                                          <div style="font-size: 16px">SEGAR SETIAP HARI</div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>

                                  <table id="customers2">
                                      <tbody>
                                        <tr>
                                          <td colspan="4">${invoice?.type} </td>
                                        </tr>

                                        <tr>
                                          <td colspan="4">
                                            <img src="${
                                              invoice?.foto
                                                ? invoice?.foto
                                                : $defaultImage
                                            }" spinner-color="white"
                                            style="width: 300px" width="300" />
                                          </td>
                                        </tr>

                                        <tr>
                                          <td>ID</td>
                                          <td>${invoice?.id}</td>
                                          <td>Code</td>
                                          <td>${invoice?.code}</td>
                                        </tr>
                                        <tr>
                                          <td>Kasir</td>
                                          <td>${invoice?.cashier?.nama}</td>
                                          <td>Cabang</td>
                                          <td>${invoice?.cabang?.nama}</td>
                                        </tr>


                                        <tr>
                                          <td>Modal Terakhir</td>
                                          <td>Rp. ${invoice?.modal_awal}</td>
                                          <td>Modal Sekarang</td>
                                          <td>Rp. ${invoice?.modal_akhir}</td>
                                        </tr>
                                        <tr>
                                          <td>Jam Mulai</td>
                                          <td>${invoice?.jam_mulai}</td>
                                          <td>Jam Selesai</td>
                                          <td>${invoice?.jam_selesai}</td>
                                        </tr>

                                        <tr>
                                          <td colspan="1">Catatan Masuk</td>
                                          <td colspan="3">${
                                            invoice?.catatan_masuk
                                              ? invoice?.catatan_masuk
                                              : ""
                                          }</td>
                                        </tr>
                                        <tr>
                                          <td colspan="1">Catatan Pulang</td>
                                          <td colspan="3">${
                                            invoice?.catatan_pulang
                                              ? invoice?.catatan_pulang
                                              : ""
                                          }</td>
                                        </tr>

                                        <tr>
                                          <td>Latitude</td>
                                          <td>${invoice?.latitude}</td>
                                          <td>Longitude</td>
                                          <td>${invoice?.longitude}</td>
                                        </tr>
                                        <tr>
                                          <td>Tanggal</td>
                                          <td>${invoice?.tanggal}</td>
                                          <td>Waktu</td>
                                          <td>${invoice?.waktu}</td>
                                        </tr>

                                      </tbody>
                                    </table>

                              </body>
                            </html>
          `;

      return content;
    },
  },
  data() {
    return {
      show: false,
      fixed: false,
      isCreateContent: false,
    };
  },
  methods: {
    onOpen(row = null, index = null) {
      this.fixed = true;
    },
    makePDFShare() {
      var opts = {
        documentSize: "A4",
        landscape: "portrait",
        type: "share", //Open a context menu and ask the user what to do next (print, mail, etc..).
        fileName: `INVOICE-CEK BUKA-${this.invoice?.cabang}-${this.invoice?.cashier}-SHIFT ${this.invoice?.shift}-${this.invoice?.created_at}.pdf`, //it will use this filename as a place-holder
      };

      pdf
        .fromData(this.createContent, opts)
        .then((status) => console.log("success->", status))
        .catch((error) => alert(JSON.stringify(error)));
    },
  },
};
</script>

<style>
#customers2 {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers2 td,
#customers2 th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers2 th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
}

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
