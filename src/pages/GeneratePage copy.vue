<template>
  <q-page class="flex flex-center">
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand" href="#"> Cordova PDF Generator plugin </a>
        </div>
        <div id="navbar" class="collapse navbar-collapse"></div>
        <!--/.nav-collapse -->
      </div>
    </nav>

    <div class="container" style="margin-top: 51px">
      <div class="starter-template">
        <h1>PDF Generator Cordova Plugin</h1>
        <p class="lead"></p>
        <q-btn label="onGeneratePDF" @click="onGeneratePDF"></q-btn>
        <form class="form-horizontal">
          <fieldset>
            <!-- Form Name -->
            <legend>Choose</legend>

            <!-- Text input-->
            <div class="form-group">
              <label class="col-md-4 control-label" for="url">URL to PDF (base64)</label>
              <div class="col-md-4">
                <input
                  id="url"
                  name="url"
                  type="text"
                  placeholder="URL to transform to PDF"
                  class="form-control input-md"
                  value="https://www.google.es"
                />
                <span class="help-block wrap_base64" id="baseH"></span>
              </div>
            </div>
            <!-- Button -->
            <div class="form-group">
              <label class="col-md-4 control-label" for="generate">Generate</label>
              <div class="col-md-4">
                <q-btn @click="makePDFBase64" label="Base64"></q-btn>
                <!-- <button id="generate" name="generate" class="btn btn-primary">
                  Base64
                </button> -->
              </div>
            </div>

            <div class="form-group">
              <label class="col-md-4 control-label" for="url">URL to PDF (share)</label>
              <div class="col-md-4">
                <input
                  id="url-share"
                  name="url-share"
                  type="text"
                  placeholder="URL to transform to PDF"
                  class="form-control input-md"
                  value="https://www.google.es"
                />
                <span class="help-block" id="baseH"></span>
              </div>
            </div>

            <div class="form-group">
              <div class="col-md-4">
                <label class="control-label" for="generate">Filename</label>
                <input
                  id="filename"
                  class="col-md-4 form-control input-md"
                  name="filename"
                  type="text"
                  placeholder="my-pdf.pdf"
                />
                <span class="help-block" id="baseH"></span>
                <q-btn @click="makePDFAndShare" label="Generate &amp; Share"></q-btn>
                <!--
                <button id="share" name="share" class="btn btn-primary">
                  Generate &amp; Share
                </button> -->
              </div>
            </div>

            <br />

            <!-- Text input-->
            <div class="form-group">
              <label class="col-md-4 control-label" for="url">Internal URL</label>
              <div class="col-md-4">
                <input
                  id="internal-url-share"
                  name="url-share"
                  type="text"
                  placeholder="URL to transform to PDF"
                  class="form-control input-md"
                  value="file:///android_asset/www/full.html"
                />
                <span class="help-block" id="baseH"></span>
              </div>
            </div>
            <!-- Button -->
            <div class="form-group">
              <label class="col-md-4 control-label" for="generate">Generate PDF</label>
              <div class="col-md-4">
                <q-btn @click="internalPDFAndShare" label="Generate & Share"></q-btn>
                <!-- <button id="internal-share" name="share" class="btn btn-primary">
                  Generate & Share
                </button> -->
              </div>
            </div>

            <br />

            <div class="form-group">
              <label class="col-md-4 control-label" for="html">RAW HTML</label>
              <div class="col-md-4">
                <textarea class="form-control" id="rawhtml" name="html">
                          <!DOCTYPE html>
                          <html lang="en">
                              <head>
                                  <meta charset="utf-8">
                                  <title>Hello World</title>
                              </head>
                              <body>
                                  <h1>Hello World</h1>
                                  <p>
                                      <h1>Hello.....</h1>
                                      <p>Testing UTF-8: </p> <p> 測試- تجريب - δοκιμή </p>

                                  </p>

                                  <br>
                                  <h2> Testing Image Drawing </h2>
                                  <br>
                                  <img src="http://media-cache-ak0.pinimg.com/736x/82/ce/11/82ce113c9d64ae9ebbad36103841480f.jpg">

                                  <br>

                                  <h2> Testing Image Drawing using SSL </h2>
                                  <br>
                                  <img src="https://cdn.dribbble.com/users/61571/screenshots/301560/photo-camera-minimal-icon.jpg">


                                  <h2> Testing 4k </h2>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <h2> Testing Memory Stability </h2>
                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">


                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">


                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">


                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">


                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">





                                 <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">


                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">


                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">



                                 <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">


                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">


                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">



                                 <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">


                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">


                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                              </body>
                          </html>

                          </textarea
                >
                <span class="help-block" id="rawH"></span>
              </div>
            </div>

            <!-- Button -->
            <div class="form-group">
              <label class="col-md-4 control-label" for="generate">Generate PDF</label>
              <div class="col-md-4">
                <q-btn @click="makeRawPDFandShare" label="Share"></q-btn>

                <!-- <button id="share-raw" name="share-raw" class="btn btn-primary">
                  Share
                </button> -->
              </div>
            </div>

            <!-- Textarea
                    <div class="form-group">
                        <label class="col-md-4 control-label" for="html">RAW HTML</label>
                        <div class="col-md-4">
                            <textarea class="form-control" id="html" name="html"></textarea>
                        </div>
                    </div>-->
          </fieldset>
        </form>
      </div>
    </div>
  </q-page>
</template>

<script>
function progressShow() {
  if (window.cordova) {
    // SpinnerPlugin.activityStart("Generating PDF...", {
    //   dimBackground: true,
    // });
  }
}

function progressHide() {
  if (window.cordova) {
    SpinnerPlugin.activityStop();
  }
}

function success(msg) {
  if (msg) this.baseH.html("base64:" + msg.replace("\n", ""));

  progressHide();
}

function failure(err) {
  console.error("->", err);
  console.alert("An error has ocurred: ", err);

  progressHide();
}

export default {
  data() {
    return {
      button: null,
      url: null,
      urlShare: null,
      internalUrlShare: null,

      raw: null,
      html: null,
      display: null,
    };
  },
  mounted() {
    this.button = document.querySelector("#generate");
    this.url = document.querySelector("#url");
    this.urlShare = document.querySelector("#url-share");
    this.internalUrlShare = document.querySelector("#internal-url-share");

    this.raw = document.querySelector("#rawhtml");
    this.html = document.querySelector("#html");
    this.display = document.querySelector("#display");

    // events: {
    //     'click #generate': 'makePDFBase64',
    //     'click #share': 'makePDFAndShare',
    //     'click #internal-share': 'internalPDFAndShare',
    //     'click #share-raw': 'makeRawPDFandShare',
    // },

    //this.success = success.bind(this);
    //this.failure = failure.bind(this);
  },
  methods: {
    onGeneratePDF() {
      cordova.plugins.html2pdf.create(
        `<!DOCTYPE html>
                          <html lang="en">
                              <head>
                                  <meta charset="utf-8">
                                  <title>Hello World</title>
                              </head>
                              <body>
                                  <h1>Hello World</h1>
                                  <p>
                                      <h1>Hello.....</h1>
                                      <p>Testing UTF-8: </p> <p> 測試- تجريب - δοκιμή </p>

                                  </p>

                                  <br>
                                  <h2> Testing Image Drawing </h2>
                                  <br>
                                  <img src="http://media-cache-ak0.pinimg.com/736x/82/ce/11/82ce113c9d64ae9ebbad36103841480f.jpg">

                                  <br>

                                  <h2> Testing Image Drawing using SSL </h2>
                                  <br>
                                  <img src="https://cdn.dribbble.com/users/61571/screenshots/301560/photo-camera-minimal-icon.jpg">


                                  <h2> Testing 4k </h2>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <h2> Testing Memory Stability </h2>
                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">


                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">


                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">


                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">


                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">





                                 <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">


                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">


                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">



                                 <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">


                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">


                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">



                                 <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">


                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">


                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                                  <br>
                                  <br>
                                  <img src="https://i.ytimg.com/vi/xcJtL7QggTI/maxresdefault.jpg">

                              </body>
                          </html>`,
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

    makePDFBase64() {
      // var parentElement = document.getElementById(id);
      //   var listeningElement = parentElement.querySelector('.listening');
      //   var receivedElement = parentElement.querySelector('.received');

      //   listeningElement.setAttribute('style', 'display:none;');
      //   receivedElement.setAttribute('style', 'display:block;');

      // Our code start here
      var opts = {
        type: "share", //Open a context menu and ask the user what to do next (print, mail, etc..).
        fileName: "v8-tutorial.pdf", //it will use this filename as a place-holder

        margin: [0, -0.1, 0, 0],
        image: { type: "jpeg", quality: 1 },
        // Added after option to add spacing after page break
        pagebreak: { avoid: "tr", mode: "css", before: "#nextpage1", after: "1cm" },
        html2canvas: { scale: 4, useCORS: true, dpi: 192, letterRendering: true },
        // Added putTotalPages option to add page number
        jsPDF: { unit: "in", format: "a4", orientation: "portrait", putTotalPages: true },
      };

      pdf
        .fromURL("https://demos.camionthemes.com/flbi/project-details.html", opts)
        .then((status) => console.log("success->", status))
        .catch((error) => console.log(error));

      // End here

      console.log("Received Event: " + id);
    },
    makePDFBase64X(e) {
      //e.preventDefault();

      if (!this.$q.platform.is.cordova) return alert("Cordova");

      progressShow();

      var opts = {
        documentSize: "A4",
        landscape: "portrait",
        type: "base64",
      };

      function success(msg) {
        if (msg) this.baseH.html("base64:" + msg.replace("\n", ""));
      }

      function failure(err) {
        console.error("->", err);
        alert("makePDFBase64 An error has ocurred: ", err);
      }

      alert(this.url.val());

      /* generate pdf using url. */
      pdf.fromURL(this.url.val(), opts).then(success).catch(failure);
    },

    internalPDFAndShare(e) {
      //e.preventDefault();
      if (!this.$q.platform.is.cordova) return alert("Cordova");

      progressShow();
      /* generate pdf using url. */

      function success(msg) {
        if (msg) this.baseH.html("base64:" + msg.replace("\n", ""));
      }

      function failure(err) {
        console.error("->", err);
        alert("internalPDFAndShare An error has ocurred: ", err);
      }

      const vm = this;

      alert(this.internalUrlShare.val());

      if (cordova.platformId === "ios") {
        console.log("Testing URL->", url);
        window.resolveLocalFileSystemURL(
          cordova.file.applicationDirectory,
          (url) => {
            var file = vm.internalUrlShare
              .val()
              .replace("file:///android_asset/", url.nativeURL);

            pdf.htmlToPDF(
              {
                url: file,
                documentSize: "A4",
                landscape: "portrait",
                type: "share",
              },
              success,
              failure
            );
          },
          (err) => console.log("error", err, "  args ->", arguments)
        );
      } else {
        pdf.htmlToPDF(
          {
            url: vm.internalUrlShare.val(),
            documentSize: "A4",
            landscape: "portrait",
            type: "share",
          },
          success,
          failure
        );
      }
    },

    makePDFAndShare(e) {
      //e.preventDefault();
      if (!this.$q.platform.is.cordova) return alert("Cordova");

      progressShow();
      /* generate pdf using url. */

      // debugger

      function success(msg) {
        if (msg) this.baseH.html("base64:" + msg.replace("\n", ""));
      }

      function failure(err) {
        console.error("->", err);
        alert("makePDFAndShare An error has ocurred: ", err);
      }

      var opts = {
        documentSize: "A4",
        landscape: "portrait",
        type: "share",
        fileName: this.filename.val() || "my-pdf.pdf",
      };

      alert(this.urlShare.val());

      pdf.fromURL(this.urlShare.val(), opts).then(success).catch(failure);
    },

    makeRawPDFandShare(e) {
      //e.preventDefault();
      if (!this.$q.platform.is.cordova) return alert("Cordova");

      progressShow();
      /* generate pdf using url. */
      var opts = {
        documentSize: "A4",
        landscape: "portrait",
        type: "share",
      };

      function success(msg) {
        if (msg) this.baseH.html("base64:" + msg.replace("\n", ""));
      }

      function failure(err) {
        console.error("->", err);
        alert("makeRawPDFandShare An error has ocurred: ", err);
      }

      const vm = this;

      alert(this.raw.val());

      pdf
        .fromData(this.raw.val(), opts)
        .then((pdf) => {
          vm.rawH.html(pdf);
          progressHide();
        })
        .catch(failure);
    },
  },
};
</script>

<style>
img {
  max-width: 100%;
}

.full {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  overflow-y: scroll;
  overflow-x: scroll;
  background-color: white;
}

.show {
  opacity: 1;
}

.hide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;

  -webkit-transition: opacity 2s;
  /* Safari */
  transition: opacity 2s;
}

.wrap_base64 {
  height: 20px;
  overflow-y: auto;
}
</style>
