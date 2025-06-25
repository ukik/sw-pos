<template>
  <!-- <q-card-actions class="bg-sw text-white">
        <q-btn v-close-popup class="col-auto" dense flat icon="arrow_back"></q-btn>
        <q-toolbar-title>INVOICE: {{ invoice?.code }}</q-toolbar-title>
        <q-btn label="PDF" @click="onPDF"></q-btn>
        <q-btn label="cetak invoice" outline icon="print" @click="makePDFShare"></q-btn>
        <q-btn label="Html2PDF" @click="Html2PDF"></q-btn>
      </q-card-actions> -->

  <div v-if="false" id="LAPORAN">
    <table style="width: 1000px; margin-bottom: 10px">
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

    <table style="width: 750px; margin-bottom: 10px" id="customers2">
      <tbody>
        <tr>
          <td style="text-align: left; width: 500px">
            <b>TANGGAL</b>
          </td>
          <td style="text-align: left; width: 350px">
            <b>{{ date }}</b>
          </td>
        </tr>
        <tr>
          <td style="text-align: left; width: 500px">
            <b>TOTAL MINUS PEMBULATAN</b>
          </td>
          <td style="text-align: left; width: 350px">
            <b>Rp. {{ getTotalKembalianPembulatan }}</b>
          </td>
        </tr>
        <tr>
          <td style="text-align: left; width: 500px">
            <b>TOTAL KAS</b>
          </td>
          <td style="text-align: left; width: 350px">
            <b>Rp. {{ balance }}</b>
          </td>
        </tr>
        <tr>
          <td style="text-align: left; width: 500px">
            <b>TOTAL STOK</b>
          </td>
          <td style="text-align: left; width: 350px">
            <b>{{ getTotalStokItems }} Kg</b>
          </td>
        </tr>
      </tbody>
    </table>

    <table style="width: 100%; margin-bottom: 10px" id="customers">
      <thead>
        <tr style="text-transform: capitalize">
          <template v-for="(item, index) in columns">
            <th>{{ item?.label }}</th>
          </template>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, i) in rows">
          <tr class="text-capitalize">
            <template v-for="(col, index) in columns">
              <td v-if="col?.field == 'cashier'">{{ item[col?.field]?.nama }}</td>
              <td v-else-if="col?.field == 'cashier_confirm'">
                {{ $getSetuju(item[col?.field]) }}
              </td>
              <td v-else-if="col?.field == 'courir'">{{ item[col?.field]?.nama }}</td>
              <td v-else-if="col?.field == 'cabang'">{{ item[col?.field]?.nama }}</td>
              <td v-else-if="col?.field == 'items'">{{ item[col?.field]?.length }}</td>
              <td v-else>{{ item[col?.field] }}</td>
            </template>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { usePengaturanStore } from "src/stores/pengaturan-store";

export default {
  props: ["columns", "rows", "date", "getTotalStokItems"],
  computed: {
    ...mapState(usePengaturanStore, {
      balance: "balance",
    }),
    getTotalKembalianPembulatan() {
      let temp = 0;

      this.rows?.forEach((row, i) => {
        temp += Number(row?.change_pembulatan);
        console.log("getTotalKembalianPembulatan", row);
      });

      return temp;
    },
    createContent() {
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
                                  <div v-if="false" id="LAPORAN">
                                    <table style="width: 1000px; margin-bottom: 10px">
                                      <tbody>
                                        <tr>
                                          <td style="width: 70px">
                                            <img height="60" src="${this.$logoBase64}" />
                                          </td>
                                          <td style="text-align: left;">
                                            <div style="font-size: 24px"><b>FREEZTO-MART</b></div>
                                            <div style="font-size: 16px">
                                              <b>GROSIR AYAM FRESH</b> - SEGAR SETIAP HARI
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>

                                    <table style="width:750px; margin-bottom: 10px" id="customers2">
                                      <tbody>
                                        <tr>
                                          <td style="text-align: left; width: 500px; ">
                                            <b >TANGGAL</b>
                                          </td>
                                          <td style="text-align: left; width: 350px; ">
                                            <b>${this.date}</b>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td style="text-align: left; width: 500px; ">
                                            <b >TOTAL MINUS PEMBULATAN</b>
                                          </td>
                                          <td style="text-align: left; width: 350px; ">
                                            <b>Rp. ${this.getTotalKembalianPembulatan}</b>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td style="text-align: left; width: 500px; ">
                                            <b>TOTAL KAS</b>
                                          </td>
                                          <td style="text-align: left; width: 350px; ">
                                            <b>Rp. ${this.balance}</b>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td style="text-align: left; width: 500px; ">
                                            <b >TOTAL STOK</b>
                                          </td>
                                          <td style="text-align: left; width: 350px; ">
                                            <b>${this.getTotalStokItems} Kg</b>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>


                                    <table style="width: 100%; margin-bottom: 10px"  id="customers">
                                      <thead>
                                        <tr style="text-transform: capitalize">`;

      this.columns?.forEach((item, i) => {
        content += `
                                                <th>${item?.label}</th>
                                            `;
      });

      `</tr>
                                      </thead>
                                      <tbody>
                                        `;

      this.rows?.forEach((item, i) => {
        content += `<tr class="text-capitalize" style="text-transform: capitalize">`;

        this.columns?.forEach((col, i) => {
          if (col?.field == "cashier") {
            content += `<td>${item[col?.field]?.nama}</td>`;
          } else if (col?.field == "cashier_confirm") {
            content += `<td>${getSetuju(item[col?.field])}</td>`;
          } else if (col?.field == "courir") {
            content += `<td>${item[col?.field]?.nama}</td>`;
          } else if (col?.field == "cabang") {
            content += `<td>${item[col?.field]?.nama}</td>`;
          } else if (col?.field == "items") {
            content += `<td>${item[col?.field]?.length}</td>`;
          } else {
            content += `<td>${item[col?.field]}</td>`;
          }
        });

        content += `</tr>`;
      });

      `
                                      </tbody>
                                    </table>


                                  </div>
                              </body>
                          </html>
          `;

      return content;
    },
  },
  data() {
    return {};
  },
  methods: {
    makePDFShare() {
      if (!this.isCordova) return this.onPDF();

      var opts = {
        documentSize: "A4",
        landscape: "landscape",
        type: "share", //Open a context menu and ask the user what to do next (print, mail, etc..).
        fileName: `LAPORAN-PENJUALAN-${this.invoice?.cabang}-${this.invoice?.cashier}-SHIFT ${this.invoice?.shift}-${this.invoice?.created_at}.pdf`, //it will use this filename as a place-holder
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

      var doc = new jsPDF("l", "pt", "a4");

      // Source HTMLElement or a string containing HTML.
      // var elementHTML = document.querySelector("#contentToPrint");

      // this.isCreateContent = true;

      var createContent = document.querySelector("#LAPORAN");

      // console.log(elementHTML);
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
        windowWidth: 347, //window width in CSS pixels
      });

      // this.isCreateContent = false;
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
