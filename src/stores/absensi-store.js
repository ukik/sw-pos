import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, nextTick } from 'vue';
import { date } from "quasar";
import { usePengaturanStore } from './pengaturan-store';

import decimal from 'src/helpers/decimal';

import localforage from "localforage";

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
    mode: '', // ABSENSI MASUK / ABSENSI PULANG
  }),

  getters: {
    isAbsensi: ({ struks }) => {
      const { cashier } = usePengaturanStore()

      let isAbsensi = false
      struks.forEach(element => {
        console.log('router.js', element?.cashier_id, cashier?.id)
        if (element?.cashier_id == cashier?.id) {
          isAbsensi = true
        }
      });
      return isAbsensi
    },
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
    getLocalStorageStruks() {
      const storage_name = 'ABSENSI-STRUKS-' + date.formatDate(Date.now(), "YYYY-MM-DD")

      // console.log('loadLocalStorageStruks ABSENSI', storage_name)
      if (localStorage.getItem(storage_name)) {
        // alert(`'getLocalStorageStruks' ${storage_name}`)
        // return 111111
        return JSON.parse(localStorage.getItem(storage_name));
      }
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
          shift: '',
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
    deleteLocalStorage() {
      const storage_name = 'ABSENSI-STRUKS-' + date.formatDate(Date.now(), "YYYY-MM-DD")

      if (localStorage.getItem(storage_name)) localStorage.removeItem(storage_name)
      if (localStorage.getItem('ABSENSI-STRUK')) localStorage.removeItem('ABSENSI-STRUK')

      this.struks = []
      this.struk = {}
      // alert('deleteLocalStorage')
    },
    async updateLocalStorage() {

      const { balance, position, cabang, cashier, shift } = usePengaturanStore()

      console.log('absensi-store updateLocalStorage', this.struk)

      const storage_name = 'ABSENSI-STRUKS-' + date.formatDate(Date.now(), "YYYY-MM-DD")


      // Konfigurasi database localForage
      const db = localforage.createInstance({
        name: "FreeztoMartDB",
        storeName: storage_name
      });

      let notesArr = []
      if (this.mode == 'ABSENSI MASUK') {
        // await nextTick();
        const id = Date.now().toString()
        this.struk = {
          ...this.struk, id
        }
        await db.setItem(id, { text: JSON.stringify(this.struk) })

        await nextTick();
        await db.iterate((value, key) => {
          const n = { ...value, id: key }
          notesArr.push(JSON.parse(n?.text))
        })
        this.struks = notesArr
        console.log('ABSENSI MASUK', notesArr)
      } else if (this.mode == 'ABSENSI PULANG') {
        await db.setItem(this.struk?.id, {
          text: JSON.stringify({
            ...this.struk,
            jam_selesai: date.formatDate(Date.now(), "HH:mm:ss"),
            catatan_pulang: this.struk?.catatan_pulang,
            modal_akhir: balance
          })
        })

        await nextTick();
        await db.iterate((value, key) => {
          const n = { ...value, id: key }
          notesArr.push(JSON.parse(n?.text))
        })
        this.struks = notesArr
        console.log('ABSENSI PULANG', notesArr)
      }

      this.invoice = this.struk

      this.struk = null
      return
      let model = []

      if (localStorage.getItem(storage_name)) model = JSON.parse(localStorage.getItem(storage_name));

      this.invoice = this.struk

      if (this.mode == 'ABSENSI MASUK') {

        let addModelDatang = [
          ...model,
          this.struk,
        ]

        await nextTick();
        localStorage.setItem(storage_name, JSON.stringify(addModelDatang))

        await nextTick();
        this.struks = addModelDatang

        console.log('absensi-store addModelDatang', addModelDatang)
        // alert(`'absensi-store addModelDatang', ${JSON.stringify(addModelDatang)}`)
      }

      if (this.mode == 'ABSENSI PULANG') {
        // } else if (this.struk?.jam_mulai && this.struk?.jam_selesai) {
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

        await nextTick();
        localStorage.setItem(storage_name, JSON.stringify(addModelPulang))

        await nextTick();
        this.struks = addModelPulang

        console.log('absensi-store addModelPulang', addModelPulang)
        // alert(`'absensi-store addModelPulang', ${addModelPulang}`)
      }

    },
    async initLocalStorage() {
      // yang seperti ini gak usah pake indexedDB
      if (localStorage.getItem('ABSENSI-STRUK')) {
        this.struk = JSON.parse(localStorage.getItem('ABSENSI-STRUK'));
      }
    },
    async loadLocalStorageStruks(set_date) {
      const storage_name = 'ABSENSI-STRUKS-' + set_date

      // Konfigurasi database localForage
      const db = localforage.createInstance({
        name: "FreeztoMartDB",
        storeName: storage_name
      });

      await nextTick();
      let notesArr = []
      await db.iterate((value, key) => {
        const n = { ...value, id: key }
        notesArr.push(JSON.parse(n?.text))
      })
      this.struks = notesArr
      console.log('loadLocalStorageStruks X', notesArr)


      return
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
