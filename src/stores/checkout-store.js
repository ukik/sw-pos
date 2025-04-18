import { defineStore, acceptHMRUpdate } from 'pinia'

import { date } from "quasar";
import { usePengaturanStore } from './pengaturan-store';

const timeStamp = Date.now();
const formattedString = date.formatDate(timeStamp, "YYYY-MM-DD HH:mm:ss");
const tanggalString = date.formatDate(timeStamp, "YYYY-MM-DD");
const waktuString = date.formatDate(timeStamp, "HH:mm:ss");

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
      if(struk?.items) {
        return struk?.items?.length + 1
      }
      return 1
    },
    getTotal: ({ struk }) => {
      let sum = {
        stock: 0,
        qty: 0,
      };
      struk?.items?.forEach((element) => {
        sum.stock += element?.stock;
        sum.qty += element?.qty;
      });

      return sum;
    },
  },

  actions: {
    addItemToStruk() {

      const { balance, position } = usePengaturanStore()

      let _struk = {
        ...this.struk,
        tanggal: tanggalString,
        waktu: waktuString,
        created_at: formattedString,
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
          cabang: cabang?.nama,
          type: "CHECK-TUTUP",
          cashier: cashier?.nama,
          shift: shift?.nama,
          status: "",
          stok_akhir: 0,
          stok_awal: 0,
          qty: this.getTotal?.qty,
          cashier_confirm: false,
          items: [],
          catatan: null,
          tanggal: tanggalString,
          waktu: waktuString,
          created_at: formattedString,
          latitude: position?.coords?.latitude, // Latitude will be stored here
          longitude: position?.coords?.longitude, // Longitude will be stored here
        }

      }
    },
    updateLocalStorage() {
      const storage_name = 'CHECK-TUTUP-STRUKS-'+date.formatDate(timeStamp, "YYYY-MM-DD")

      // let model = JSON.parse(JSON.stringify(localStorage.getItem(storage_name)));
      let model = []

      if(localStorage.getItem(storage_name)) model = JSON.parse(localStorage.getItem(storage_name));

      let addModel = [
        ...model,
        this.struk,
      ]

      localStorage.setItem(storage_name, JSON.stringify(addModel))

      this.struks = addModel

      this.invoice = this.struk
    },
    initLocalStorage() {
      if(localStorage.getItem('CHECK-TUTUP-STRUK')) {
        this.struk = JSON.parse(localStorage.getItem('CHECK-TUTUP-STRUK'));
      }
    },
    loadLocalStorageStruks(set_date) {
      const storage_name = 'CHECK-TUTUP-STRUKS-'+set_date

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
