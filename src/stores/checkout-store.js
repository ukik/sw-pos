import { defineStore, acceptHMRUpdate } from 'pinia'

import { date } from "quasar";
import { usePengaturanStore } from './pengaturan-store';
import decimal from 'src/helpers/decimal';

import { ref, nextTick } from 'vue';
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

export const useCheckOutStore = defineStore('CheckOutStore', {
  state: () => ({
    struk: {
    },
    struks: [],
    invoice: null,
  }),

  getters: {
    getInvoiceSelected: ({struks}) => {
      return function (date) {
        let temp = null
        struks.forEach(element => {
          if(element.tanggal == date) temp = element
        });
        return temp
      }
    },
    isCheckDone: ({ struks }) => { // jadi harus di check apa kasir sudah check stok, sehari 1 kali saja
      let temp = false
      struks.forEach(el => {
        if(el.tanggal == tanggalString) {
          temp = true
        }
      });
      return temp
    },
    getCheckDone: ({ struks }) => { // jadi harus di check apa kasir sudah check stok, sehari 1 kali saja
      let temp = false
      struks.forEach(el => {
        if(el.tanggal == tanggalString) {
          temp = el
        }
      });
      return temp
    },
    getStruk: (state) => state.struk,
    getStruks: (state) => state.struks,
    getStruksModify: ({ struks }) => {
      let _temp = JSON.parse(JSON.stringify(struks))

      _temp.forEach(el => {
        el.cashier_confirm = el.cashier_confirm ? 'Setuju' : 'Tidak Setuju'
      });

      return _temp

    },
    getStruksLength: (state) => state.struks.length,
    getStrukItemID: ({ struk }) => {
      if(struk?.items?.length) {
        return Number(struk?.items?.length) + 1
      }
      return 1
    },
    getTotal: ({ struk }) => {
      let sum = {
        stock: 0,
        qty: 0,
        stok_awal: 0,
        stok_akhir: 0,
      };
      struk?.items?.forEach((element) => {
        sum.stock += decimal(element?.stock);
        sum.qty += decimal(element?.qty);
        sum.stok_awal += decimal(element?.stok_awal);
        sum.stok_akhir += decimal(element?.stok_akhir);
      });

      return sum;
    },
  },

  actions: {
    addItemToStruk() {

      const { balance, position } = usePengaturanStore()

      let _struk = {
        ...this.struk,
        // qty:
        // stok_awal:
        // stok_akhir:
        tanggal: tanggalString,
        waktu: date.formatDate(Date.now(), "HH:mm:ss"),
        created_at: date.formatDate(Date.now(), "YYYY-MM-DD HH:mm:ss"),
        latitude: position?.coords?.latitude, // Latitude will be stored here
        longitude: position?.coords?.longitude, // Longitude will be stored here
      }

      this.struk = _struk

      // this.updateLocalStorage()
    },
    addNewStruk() {

      const { balance, position, cabang, cashier, shift } = usePengaturanStore()

      console.log(!this.struk?.id)
      if(!this.struk?.id) {
        this.struk = {
          id: this.getStruksLength + 1,
          code: "#" + uuidv4(),
          cabang: {
            ...cabang
          },
          type: "CEK TUTUP",
          cashier: {
            ...cashier
          },
          status: "",
          stok_akhir: 0,
          stok_awal: 0,
          qty: this.getTotal?.qty,
          cashier_confirm: false,
          items: [],
          catatan: null,
          tanggal: tanggalString,
          waktu: date.formatDate(Date.now(), "HH:mm:ss"),
          created_at: date.formatDate(Date.now(), "YYYY-MM-DD HH:mm:ss"),
          latitude: position?.coords?.latitude, // Latitude will be stored here
          longitude: position?.coords?.longitude, // Longitude will be stored here
        }

      }
    },
    async updateLocalStorage() {
      const storage_name = 'CHECK-TUTUP-STRUKS-'+date.formatDate(Date.now(), "YYYY-MM-DD")

      // Konfigurasi database localForage
      const db = localforage.createInstance({
        name: "FreeztoMartDB",
        storeName: storage_name
      });

      let notesArr = []

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

      this.invoice = this.struk

      this.struk = null
      return

      // let model = JSON.parse(JSON.stringify(localStorage.getItem(storage_name)));
      let model = []

      if(localStorage.getItem(storage_name)) model = JSON.parse(localStorage.getItem(storage_name));

      this.invoice = this.struk

      let addModel = [
        ...model,
        this.struk,
      ]

      localStorage.setItem(storage_name, JSON.stringify(addModel))

      this.struks = addModel

      // this.invoice = this.struk
    },
    initLocalStorage() {
      if(localStorage.getItem('CHECK-TUTUP-STRUK')) {
        this.struk = JSON.parse(localStorage.getItem('CHECK-TUTUP-STRUK'));
      }
    },
    async loadLocalStorageStruks(set_date) {
      const storage_name = 'CHECK-TUTUP-STRUKS-'+set_date

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

      return

      console.log('loadLocalStorageStruks CHECK-TUTUP', storage_name)
      if(localStorage.getItem(storage_name)) {
        this.struks = JSON.parse(localStorage.getItem(storage_name));
      } else {
        this.struks = []
      }

    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCheckOutStore, import.meta.hot))
}
