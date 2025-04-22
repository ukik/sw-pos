import { defineStore, acceptHMRUpdate } from 'pinia'

import { date } from "quasar";
import { usePengaturanStore } from './pengaturan-store';

import Swal from 'sweetalert2/dist/sweetalert2';

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

//console.log(uuidv4());

export const usePenjualanStore = defineStore('PenjualanStore', {
  state: () => ({
    items: [
      {
        id: 0,
        produk_id: 0,
        name: "daging",
        stock: 50,
        price: 1400,
        no_order: 1,
      },
      {
        id: 1,
        produk_id: 1,
        name: "paha",
        stock: 50,
        price: 2300,
        no_order: 2,
      },
      {
        id: 2,
        produk_id: 2,
        name: "sayap",
        stock: 50,
        price: 3200,
        no_order: 3,
      },
      {
        id: 3,
        produk_id: 3,
        name: "kepala",
        stock: 50,
        price: 4600,
        no_order: 4,
      },
      {
        id: 4,
        produk_id: 4,
        name: "ceker",
        stock: 50,
        price: 5100,
        no_order: 5,
      },
      {
        id: 5,
        produk_id: 5,
        name: "ati",
        stock: 50,
        price: 6200,
        no_order: 6,
      },
      {
        id: 6,
        produk_id: 6,
        name: "usus",
        stock: 50,
        price: 7800,
        no_order: 7,
      },
      {
        id: 7,
        produk_id: 7,
        name: "kulit",
        stock: 50,
        price: 8300,
        no_order: 9,
      },
      {
        id: 8,
        produk_id: 8,
        name: "telur",
        stock: 50,
        price: 9900,
        no_order: 7,
      },
    ],
    struk: {},
    struks: [],
    invoice: null,
  }),

  getters: {
    //doubleCount: (state) => state.counter * 2
    getItems: (state) => state.items,
    getStruk: (state) => state.struk,
    getStruks: (state) => state.struks,
    getStruksLength: (state) => state.struks.length,
    getStrukItemID: ({ struk }) => {
      if (struk?.items) {
        return struk?.items?.length + 1
      }
      return 1
    },

    getTotal: ({ struk }) => {
      let sum = {
        stock: 0,
        price: 0,
        qty: 0,
        subtotal: 0,
        stok_awal: 0,
        stok_akhir: 0,
      };
      console.log('penjualan-store', struk, struk?.items)
      struk?.items?.forEach((element) => {
        sum.price += element?.price;
        sum.stock += element?.stock;
        sum.qty += element?.qty;
        sum.subtotal += element?.subtotal
        sum.stok_awal += element?.stok_awal;
        sum.stok_akhir += element?.stok_akhir;
      });

      //console.log(sum);

      return sum;
    },
    getTotalStruk() {
      return this.getTotal?.subtotal
      return Math.round(Number(this.getTotal?.qty) * Number(this.getTotal?.price));
    },
  },

  actions: {
    onEditProduct(payload) {
      let temp = JSON.parse(JSON.stringify(this.items))
      temp.forEach(element => {
        if(element?.id == payload.id) {
          element.price = payload.price
          element.no_order = payload.no_order
        }
      });

      temp.sort(function (a, b) {
        var keyA = a?.no_order, //new Date(a.updated_at),
          keyB = b?.no_order; //new Date(b.updated_at);
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });

      this.items = temp

      Swal.fire({
        // position: "top-end",
        icon: "success",
        title: `Produk ${payload?.name}`,
        text: `Berhasil di sunting`,
        showConfirmButton: false,
        // confirmButtonText: `Invoice ${item.code}`,
        timer: 2500,
      })
    },
    onBayar() {
      this.items.forEach((el1, index1) => {
        this.struk?.items.forEach((el2, index2) => {
          if (el2?.produk_id == el1?.produk_id) {
            // console.log(el, item);
            el1.stock = Number(el1?.stock) - Number(el2?.qty);
          }
        });
      });
    },
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

      // this.updateLocalStorageItems()

      // this.updateLocalStorageInvoice()
    },
    addNewStruk() {

      const { balance, position, cabang, cashier, shift } = usePengaturanStore()

      if (!this.struk?.id) {
        this.struk = {
          id: this.getStruksLength + 1,
          code: "#" + uuidv4(),
          cabang: cabang?.nama,
          type: "PENJUALAN",
          cashier: cashier?.nama,
          shift: shift?.nama,
          status: "",
          balance: 0,
          bill: 0,
          bill_pembulatan: 0,
          bayar: 0,
          change: 0,
          change_pembulatan: 0,
          change_aktual: 0,
          stok_akhir: 0,
          stok_awal: 0,
          qty: 0,
          items: [],
          catatan: null,
          tanggal: tanggalString,
          waktu: waktuString,
          created_at: formattedString,
          latitude: position?.coords?.latitude, // Latitude will be stored here
          longitude: position?.coords?.longitude, // Longitude will be stored here
        }
        console.log('addNewStruk', position)
      }
    },
    onSyncPenjualanPengirimanItems(payload) {
      this.items.forEach((el1, index1) => {
        payload?.items.forEach((el2, index2) => {
          if (el2.produk_id == el1.produk_id) {
            el1.stock += Number(el2.qty)
          }
        });
      })

      localStorage.setItem("PENJUALAN-ITEMS", JSON.stringify(this.items));
    },
    onSyncPenjualanMutasiItems(payload) {
      this.items.forEach((el1, index1) => {
        payload?.items.forEach((el2, index2) => {
          if (el2.produk_id == el1.produk_id) {
            el1.stock -= Number(el2.qty)
          }
        });
      })

      localStorage.setItem("PENJUALAN-ITEMS", JSON.stringify(this.items));
    },
    onSyncPenjualanRotasiItems(payload) {
      this.items.forEach((el1, index1) => {
        payload?.items.forEach((el2, index2) => {
          if (el2.produk_id == el1.produk_id) {
            el1.stock -= Number(el2.qty)
          }
        });
      })

      localStorage.setItem("PENJUALAN-ITEMS", JSON.stringify(this.items));
    },
    onSyncPenjualanCheckInItems(payload) {
      this.items.forEach((el1, index1) => {
        payload?.items.forEach((el2, index2) => {
          if (el2.produk_id == el1.produk_id) {
            el1.stock -= Number(el2.qty)
          }
        });
      })

      localStorage.setItem("PENJUALAN-ITEMS", JSON.stringify(this.items));
    },
    onSyncPenjualanCheckOutItems(payload) {
      this.items.forEach((el1, index1) => {
        payload?.items.forEach((el2, index2) => {
          if (el2.produk_id == el1.produk_id) {
            el1.stock -= Number(el2.qty)
          }
        });
      })

      localStorage.setItem("PENJUALAN-ITEMS", JSON.stringify(this.items));
    },

    updateLocalStorage() {
      const storage_name = 'PENJUALAN-STRUKS-' + date.formatDate(timeStamp, "YYYY-MM-DD")

      let model = []

      if (localStorage.getItem(storage_name)) model = JSON.parse(localStorage.getItem(storage_name));

      let addModel = [
        ...model,
        this.struk,
      ]

      localStorage.setItem(storage_name, JSON.stringify(addModel))

      this.struks = addModel

      this.invoice = this.struk
    },
    initLocalStorage() {
      if (localStorage.getItem('PENJUALAN-ITEMS')) {
        this.items = JSON.parse(localStorage.getItem('PENJUALAN-ITEMS'));
      }
      if (localStorage.getItem('PENJUALAN-STRUK')) {
        this.struk = JSON.parse(localStorage.getItem('PENJUALAN-STRUK'));
      }
      if (localStorage.getItem('PENJUALAN-INVOICE')) {
        this.invoice = JSON.parse(localStorage.getItem('PENJUALAN-INVOICE'));
      }
    },
    // updateLocalStorageItems() {
    //   // localStorage.setItem('PENJUALAN-ITEMS', JSON.stringify(this.items))
    // },
    // updateLocalStorageInvoice() {
    //   // this.invoice = this.struk
    //   // localStorage.setItem('PENJUALAN-INVOICE', JSON.stringify(this.struk))
    // },

    loadLocalStorageStruks(set_date) {
      const storage_name = 'PENJUALAN-STRUKS-' + set_date

      console.log('loadLocalStorageStruks PENJUALAN', storage_name)
      if (localStorage.getItem(storage_name)) {
        this.struks = JSON.parse(localStorage.getItem(storage_name));
      } else {
        this.struks = []
      }

    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePenjualanStore, import.meta.hot))
}
