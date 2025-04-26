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

export const usePengirimanStore = defineStore('PengirimanStore', {
  state: () => ({
    struk: {},
    struks: [],
    invoice: null,
  }),

  getters: {
    //doubleCount: (state) => state.counter * 2
    // getItems: (state) => state.items,
    getStruk: (state) => state.struk,
    getStruks: (state) => state.struks,
    getStruksModify: ({ struks }) => {
      let _temp = JSON.parse(JSON.stringify(struks))

      _temp.forEach(el => {
        el.courir_confirm = el.courir_confirm ? 'Setuju' : 'Tidak Setuju'
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
        sum.stock += element?.stock;
        sum.qty += element?.qty;
        sum.stok_awal += element?.stok_awal;
        sum.stok_akhir += element?.stok_akhir;
      });

      return sum;
    },
  },

  actions: {
    setCourir(val) {
      // if(!this.struk?.courir ) return
      let _model = JSON.parse(JSON.stringify(this.struk));
      _model.courir = val
      this.struk = _model
      console.log('this.struk.courir',  this.struk, _model)
    },
    addItemToStruk() {

      const { balance, position } = usePengaturanStore()

      let _struk = {
        ...this.struk,
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
          type: "PENGIRIMAN",
          cashier: {
            ...cashier
          },
          courir: {},
          status: "",
          stok_akhir: 0,
          stok_awal: 0,
          qty: this.getTotal?.qty,
          courir_confirm: false,
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
    updateLocalStorage() {
      const storage_name = 'PENGIRIMAN-STRUKS-'+date.formatDate(Date.now(), "YYYY-MM-DD")

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
      if(localStorage.getItem('PENGIRIMAN-STRUK')) {
        this.struk = JSON.parse(localStorage.getItem('PENGIRIMAN-STRUK'));
      }
    },
    loadLocalStorageStruks(set_date) {
      const storage_name = 'PENGIRIMAN-STRUKS-'+set_date

      console.log('loadLocalStorageStruks PENGIRIMAN', storage_name)
      if(localStorage.getItem(storage_name)) {
        this.struks = JSON.parse(localStorage.getItem(storage_name));
      } else {
        this.struks = []
      }

    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePengirimanStore, import.meta.hot))
}
