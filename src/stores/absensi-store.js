import { defineStore, acceptHMRUpdate } from 'pinia'

import { date } from "quasar";
import { usePengaturanStore } from './pengaturan-store';

const timeStamp = Date.now();
const formattedString = date.formatDate(Date.now(), "YYYY-MM-DD HH:mm:ss");
const tanggalString = date.formatDate(Date.now(), "YYYY-MM-DD");
const waktuString = date.formatDate(Date.now(), "HH:mm:ss");

function uuidv4() {
  return "10000000".replace(/[018]/g, c =>
    // return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}


export const useAbsensiStore = defineStore('AbsensiStore', {
  state: () => ({
    struk: {
    },
    struks: [],
    invoice: null,
  }),

  getters: {
    getInvoiceSelected: ({ struks }) => {
      return function (date) {
        let temp = null
        struks.forEach(element => {
          if (element.tanggal == date) temp = element
        });
        return temp
      }
    },
    isCheckDone: ({ struks }) => { // jadi harus di check apa kasir sudah check stok, sehari 1 kali saja
      let temp = false
      struks.forEach(el => {
        if (el.tanggal == tanggalString) {
          temp = true
        }
      });
      return temp
    },
    getCheckDone: ({ struks }) => { // jadi harus di check apa kasir sudah check stok, sehari 1 kali saja
      let temp = false
      struks.forEach(el => {
        if (el.tanggal == tanggalString) {
          temp = el
        }
      });
      return temp
    },
    getPiketSudahAbsensi: ({ struks }) => {
      const { cashier } = usePengaturanStore()

      let temp = {}

      struks.forEach(element => {
        if (cashier?.id == element?.cashier_id) temp = cashier
      });

      return temp
    },
    getStruk: (state) => state.struk,
    getStruks: (state) => state.struks,
    getStruksLength: (state) => state.struks.length,
    getStrukItemID: ({ struk }) => {
      if (struk?.items?.length) {
        return Number(struk?.items?.length) + 1
      }
      return 1
    },
  },

  actions: {
    addItemToStruk() {

      const { balance, position } = usePengaturanStore()

      // let _struk = {
      //   ...this.struk,

      //   tanggal: tanggalString,
      //   waktu: waktuString,
      //   created_at: formattedString,
      //   latitude: position?.coords?.latitude, // Latitude will be stored here
      //   longitude: position?.coords?.longitude, // Longitude will be stored here
      // }

      // this.struk = _struk

      console.log('addItemToStruk', this.struk)
    },
    addNewStruk() {

      const { balance, position, cabang, cashier, shift } = usePengaturanStore()

      console.log(!this.struk?.id)
      if (!this.struk?.id) {
        this.struk = {
          id: this.getStruksLength + 1,
          code: "#" + uuidv4(),
          cabang: {
            ...cabang,
          },
          type: "ABSENSI",
          nama: '',
          cashier_id: null,
          cashier: {
            ...cashier
          },
          modal_awal: 0,
          modal_akhir: 0,
          jam_mulai: '',
          jam_selesai: '',
          foto: '',
          catatan_masuk: null,
          catatan_pulang: null,
          tanggal: tanggalString,
          waktu: date.formatDate(Date.now(), "HH:mm:ss"),
          created_at: date.formatDate(Date.now(), "YYYY-MM-DD HH:mm:ss"),
          latitude: position?.coords?.latitude, // Latitude will be stored here
          longitude: position?.coords?.longitude, // Longitude will be stored here
        }

      }
    },
    updateLocalStorage() {

      const { balance, position, cabang, cashier, shift } = usePengaturanStore()

      console.log('updateLocalStorage', this.struk)

      const storage_name = 'ABSENSI-STRUKS-' + date.formatDate(Date.now(), "YYYY-MM-DD")

      // let model = JSON.parse(JSON.stringify(localStorage.getItem(storage_name)));
      let model = []

      if (localStorage.getItem(storage_name)) model = JSON.parse(localStorage.getItem(storage_name));

      if (this.struk?.jam_mulai && this.struk?.jam_selesai == '') {

        let addModelDatang = [
          ...model,
          this.struk,
        ]

        localStorage.setItem(storage_name, JSON.stringify(addModelDatang))

        this.struks = addModelDatang

        console.log('absensi-store addModelDatang', addModelDatang)

      } else if (this.struk?.jam_mulai && this.struk?.jam_selesai) {
        for (let i = 0; i < model.length; i++) {
          const element = model[i];
          if (element?.cashier_id == this.struk?.cashier_id) {

            model[i].jam_selesai = date.formatDate(Date.now(), "HH:mm:ss")
            model[i].catatan_pulang = this.struk?.catatan_pulang
            model[i].modal_akhir = balance

            console.log('absensi-store addModelPulang MODEL', model[i])
            console.log('absensi-store addModelPulang STRUK', this.struk)
          }
        }

        let addModelPulang = [
          ...model
        ]

        localStorage.setItem(storage_name, JSON.stringify(addModelPulang))

        this.struks = addModelPulang

        console.log('absensi-store addModelPulang', addModelPulang)
      }



      this.invoice = this.struk
    },
    initLocalStorage() {
      if (localStorage.getItem('ABSENSI-STRUK')) {
        this.struk = JSON.parse(localStorage.getItem('ABSENSI-STRUK'));
      }
    },
    loadLocalStorageStruks(set_date) {
      const storage_name = 'ABSENSI-STRUKS-' + set_date

      console.log('loadLocalStorageStruks ABSENSI', storage_name)
      if (localStorage.getItem(storage_name)) {
        this.struks = JSON.parse(localStorage.getItem(storage_name));
      } else {
        this.struks = []
      }

    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAbsensiStore, import.meta.hot))
}
