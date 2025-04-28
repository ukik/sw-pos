<template>
  <!-- <div> -->

  <q-btn
    @click="takePhoto2"
    color="orange"
    label="ambil foto"
    icon="camera"
    class="full-width"
  ></q-btn>
  <!-- <button @click="takePhoto">Ambil Foto</button>
    <br><br>
    <img :src="imageData" v-if="imageData" style="width: 300px; height: auto;" />
    <br><br>
    <div>
      {{ imageData }}
    </div>
    <button @click="takePhoto2">Ambil Foto</button>
    <br><br>
    <img :src="imageData2" v-if="imageData2" style="width: 300px; height: auto;" />
    <br><br>
    <div>
      {{ imageData2 }}
    </div> -->
  <!-- </div> -->
</template>

<script>
export default {
  data() {
    return {
      imageData: null,
      imageData2: null,
    };
  },
  watch: {
    imageData(val) {
      // if (!val) {
      //   this.$emit("onBubbleEvent", null);
      //   return this.$q.notify({
      //     message: "Peringatan",
      //     caption: "Foto gagal diambil",
      //     icon: "warning",
      //     color: "negative",
      //     position: "top",
      //   });
      // }
      // if (val) this.$emit("onBubbleEvent", val);
    },
  },
  mounted() {
    document.addEventListener("deviceready", this.onDeviceReady, false);
    this.imageData = null;
    this.imageData2 = null;
  },
  methods: {
    onDeviceReady() {
      console.log("Cordova siap!");
    },
    takePhoto() {
      navigator?.camera?.getPicture(this.onSuccess, this.onFail, {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        // targetWidth: 800,
        // targetHeight: 600,
        correctOrientation: true,
      });
    },
    onSuccess(imageData) {
      this.imageData = imageData; // "data:image/jpeg;base64," + imageData;
      // alert(this.imageData);
      this.$emit("onBubbleEvent", imageData);
    },
    onFail(message) {
      this.imageData = null; // "data:image/jpeg;base64," + imageData;
      // alert("Gagal ambil foto: " + message);
      this.$emit("onBubbleEvent", null);
    },

    takePhoto2() {
      if (!navigator.camera) {
        alert("Camera belum ready!");
        return;
      }
      navigator?.camera?.getPicture(
        (imageData2) => {
          this.imageData2 = imageData2; // "data:image/jpeg;base64," + imageData2;
          this.$emit("onBubbleEvent", imageData2);
        },
        (message) => {
          alert("Gagal ambil foto: " + message);
        },
        {
          quality: 80,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          encodingType: Camera.EncodingType.JPEG,
          correctOrientation: true,
        }
      );
    },
  },
};
</script>

<style scoped>
button {
  padding: 10px 20px;
  font-size: 16px;
}
</style>
