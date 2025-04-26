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

export const useBalanceStore = defineStore('BalanceStore', {
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
        // total_saldo: 0,
        total_masuk: 0,
        total_keluar: 0,
      };
      struk?.items?.forEach((element) => {
        if(element?.status == 'SALDO MASUK') {
          sum.total_masuk += element?.nominal;
          // sum.total -= element?.nominal;
        } else {
          sum.total_keluar += element?.nominal;
          // sum.total += element?.nominal;
        }
      });

      return sum;
    },
    getTotalSaldo: ({getTotal}) => {
      const { balance } = usePengaturanStore()
      return Number(balance) - Number(getTotal?.total_keluar) + Number(getTotal?.total_masuk)
    },
  },

  actions: {
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
          type: "BALANCE",
          cashier: {
            ...cashier
          },
          items: [],
          total_saldo: 0,
          total_keluar: 0,
          total_masuk: 0,
          catatan: null,
          cashier_confirm: false,

          tanggal: tanggalString,
          waktu: date.formatDate(Date.now(), "HH:mm:ss"),
          created_at: date.formatDate(Date.now(), "YYYY-MM-DD HH:mm:ss"),
          latitude: position?.coords?.latitude, // Latitude will be stored here
          longitude: position?.coords?.longitude, // Longitude will be stored here
        }

      }
    },
    updateLocalStorage() {
      const storage_name = 'BALANCE-STRUKS-'+date.formatDate(Date.now(), "YYYY-MM-DD")

      // let model = JSON.parse(JSON.stringify(localStorage.getItem(storage_name)));
      let model = []

      if(localStorage.getItem(storage_name)) model = JSON.parse(localStorage.getItem(storage_name));

      let addModel = [
        ...model,
        this.struk,
      ]

      localStorage.setItem(storage_name, JSON.stringify(addModel))

      this.struks = addModel

      const { balance, onBalanceSync } = usePengaturanStore()
      console.log(balance, this.struk?.total_keluar, this.struk?.total_masuk, this.getTotalSaldo)
      onBalanceSync(this.getTotalSaldo)

      this.invoice = this.struk
    },
    initLocalStorage() {
      if(localStorage.getItem('BALANCE-STRUK')) {
        this.struk = JSON.parse(localStorage.getItem('BALANCE-STRUK'));
      }
    },
    loadLocalStorageStruks(set_date) {
      const storage_name = 'BALANCE-STRUKS-'+set_date

      console.log('loadLocalStorageStruks BALANCE', storage_name)
      if(localStorage.getItem(storage_name)) {
        this.struks = JSON.parse(localStorage.getItem(storage_name));
      } else {
        this.struks = []
      }

    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBalanceStore, import.meta.hot))
}
