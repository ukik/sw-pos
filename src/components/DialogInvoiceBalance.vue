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
                <img height="60" :src="$logoBase64" />
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
              <td>Kas Masuk</td>
              <td>Rp. {{ invoice?.total_masuk }}</td>
              <td>Kas Keluar</td>
              <td>Rp. {{ invoice?.total_keluar }}</td>
            </tr>
            <tr>
              <td>Kas Final</td>
              <td>Rp. {{ invoice?.total_saldo }}</td>
              <td>Konfirmasi</td>
              <td>Kasir {{ $getSetuju(invoice?.cashier_confirm) }}</td>
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
            <tr>
              <td colspan="1">Catatan</td>
              <td colspan="3">{{ invoice?.catatan ? invoice?.catatan : "" }}</td>
            </tr>
          </tbody>
        </table>

        <table class="q-mt-md" id="customers">
          <thead>
            <tr>
              <th>No</th>
              <th>Keterangan</th>
              <th>Status</th>
              <th>Nominal</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, i) in invoice?.items">
              <tr class="text-capitalize">
                <td>{{ i + 1 }}</td>
                <td>{{ item?.keterangan }}</td>
                <td>{{ item?.status }}</td>
                <td>Rp. {{ item?.nominal }}</td>
              </tr>
            </template>
            <tr>
              <td colspan="3">TOTAL</td>
              <td>Rp. {{ invoice?.total_masuk }}</td>
            </tr>
          </tbody>
        </table>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapState } from "pinia";
import { useBalanceStore } from "src/stores/balance-store";

export default {
  computed: {
    ...mapState(useBalanceStore, {
      // items: "items",
      // struks: "struks",
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
                                  <title>INVOICE PENJUALAN</title>


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
                                        <td colspan="4">${invoice?.type}</td>
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
                                        <td>Kas Masuk</td>
                                        <td>Rp. ${invoice?.total_masuk}</td>
                                        <td>Kas Keluar</td>
                                        <td>Rp. ${invoice?.total_keluar}</td>
                                      </tr>
                                      <tr>
                                        <td>Kas Final</td>
                                        <td>Rp. ${invoice?.total_saldo}</td>
                                        <td>Konfirmasi</td>
                                        <td>Kasir ${this.$getSetuju(
                                          invoice?.cashier_confirm
                                        )}</td>
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
                                      <tr>
                                        <td colspan="1">Catatan</td>
                                        <td colspan="3">${
                                          invoice?.catatan ? invoice?.catatan : ""
                                        }</td>
                                      </tr>
                                    </tbody>
                                  </table>





                                  <table class="q-mt-md" id="customers" style="margin-top:10px">
                                    <thead>
                                      <tr>
                                        <th>No</th>
                                        <th>Keterangan</th>
                                        <th>Status</th>
                                        <th>Nominal</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                  `;
      this.invoice?.items?.forEach((item, i) => {
        content += `
                                              <tr class="text-capitalize" style="text-transform: capitalize;">
                                                <td>${i + 1}</td>
                                                <td>${item?.keterangan}</td>
                                                <td>${item?.status}</td>
                                                <td>Rp. ${item?.nominal}</td>
                                              </tr>
                                          `;
      });

      content += `
                                      <tr>
                                        <td colspan="3">TOTAL</td>
                                        <td>Rp. ${invoice?.total_masuk}</td>
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
    Html2PDF() {
      cordova.plugins.html2pdf.create(
        this.createContent,
        "~/Documents/test.pdf", // on iOS,
        // "test.pdf", on Android (will be stored in /mnt/sdcard/cordova.plugin.html2pdf/test.pdf)
        function (success) {
          // alert(JSON.stringify(success))
        },
        function (error) {
          // alert(JSON.stringify(error))
        }
      );
    },
    makePDFShare() {
      var opts = {
        documentSize: "A4",
        landscape: "portrait",
        type: "share", //Open a context menu and ask the user what to do next (print, mail, etc..).
        fileName: `INVOICE-PENJUALAN-${this.invoice?.cabang}-${this.invoice?.cashier}-SHIFT ${this.invoice?.shift}-${this.invoice?.created_at}.pdf`, //it will use this filename as a place-holder
      };

      pdf
        .fromData(this.createContent, opts)
        .then((status) => console.log("success->", status))
        .catch((error) => alert(JSON.stringify(error)));

      // End here

      //console.log("Received Event: " + id);
    },
    async onPDF() {
      window.jsPDF = window.jspdf.jsPDF;

      var doc = new jsPDF();

      // Source HTMLElement or a string containing HTML.
      var elementHTML = document.querySelector("#contentToPrint");

      this.isCreateContent = true;

      var createContent = document.querySelector("#createContent");

      console.log(elementHTML);
      // console.log(new DOMParser().parseFromString(this.createContent, "text/html"));

      await doc.html(createContent, {
        callback: function (doc) {
          // Save the PDF
          doc.save("document-html.pdf");
        },
        margin: [10, 10, 10, 10],
        autoPaging: "text",
        x: 0,
        y: 0,
        width: 190, //target width in the PDF document
        windowWidth: 675, //window width in CSS pixels
      });

      this.isCreateContent = false;
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
