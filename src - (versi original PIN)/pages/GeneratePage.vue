<template>
  <q-page class="flex flex-center">
    <q-btn
      @click="makePDFShare"
      color="cyan"
      icon="description"
      label="PDF Share"
    ></q-btn>

    <q-btn
      @click="makePDFBase64"
      color="positive"
      icon="description"
      label="PDF Base64"
    ></q-btn>

    <q-btn @click="Html2PDF" color="pink" icon="description" label="Html2PDF"></q-btn>
  </q-page>
</template>

<script>
export default {
  methods: {
    makePDFShare() {
      // var parentElement = document.getElementById(id);
      //   var listeningElement = parentElement.querySelector('.listening');
      //   var receivedElement = parentElement.querySelector('.received');

      //   listeningElement.setAttribute('style', 'display:none;');
      //   receivedElement.setAttribute('style', 'display:block;');

      // Our code start here
      var opts = {
        documentSize: "A4",
        landscape: "portrait",
        type: "share", //Open a context menu and ask the user what to do next (print, mail, etc..).
        fileName: "pdf-share-demo.pdf", //it will use this filename as a place-holder

        // margin: [0, 0, 0, 0],
        // image: { type: "jpeg", quality: 1 },
        // // Added after option to add spacing after page break
        // pagebreak: { avoid: "tr", mode: "css", before: "#nextpage1", after: "1cm" },
        // html2canvas: { scale: 4, useCORS: true, dpi: 192, letterRendering: true },
        // // Added putTotalPages option to add page number
        // jsPDF: { unit: "in", format: "a4", orientation: "portrait", putTotalPages: true },
      };

      pdf
        .fromURL("https://demos.camionthemes.com/flbi/project-details.html", opts)
        .then((status) => console.log("success->", status))
        .catch((error) => console.log(error));

      // End here

      //console.log("Received Event: " + id);
    },
    makePDFBase64() {
      // Our code start here
      var opts = {
        documentSize: "A4",
        landscape: "portrait",
        type: "base64", //Open a context menu and ask the user what to do next (print, mail, etc..).
        fileName: "pdf-base-demo.pdf", //it will use this filename as a place-holder

        // margin: [0, 0, 0, 0],
        // image: { type: "jpeg", quality: 1 },
        // // Added after option to add spacing after page break
        // pagebreak: { avoid: "tr", mode: "css", before: "#nextpage1", after: "1cm" },
        // html2canvas: { scale: 4, useCORS: true, dpi: 192, letterRendering: true },
        // // Added putTotalPages option to add page number
        // jsPDF: { unit: "in", format: "a4", orientation: "portrait", putTotalPages: true },
      };

      pdf
        .fromURL("https://demos.camionthemes.com/flbi/project-details.html", opts)
        .then((status) => console.log("success->", status))
        .catch((error) => console.log(error));

      // End here

      //console.log("Received Event: " + id);
    },
    Html2PDF() {
      cordova.plugins.html2pdf.create(
        "https://demos.camionthemes.com/flbi/project-details.html",
        "test.pdf", // on iOS,
        // "test.pdf", on Android (will be stored in /mnt/sdcard/cordova.plugin.html2pdf/test.pdf)
        function (success) {
          // alert(JSON.stringify(success))
        },
        function (error) {
          // alert(JSON.stringify(error))
        }
      );
    },
  },
};
</script>
