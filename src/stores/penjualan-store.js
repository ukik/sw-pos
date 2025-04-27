import { defineStore, acceptHMRUpdate } from 'pinia'

import { date } from "quasar";
import { usePengaturanStore } from './pengaturan-store';

import Swal from 'sweetalert2/dist/sweetalert2';

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

//console.log(uuidv4());

export const usePenjualanStore = defineStore('PenjualanStore', {
  state: () => ({
    items: [
      {
        id: 0,
        produk_id: 0,
        name: "daging",
        stock: 0,
        price: 0,
        no_order: 1,
      },
      {
        id: 1,
        produk_id: 1,
        name: "ayam karkas",
        stock: 0,
        price: 0,
        no_order: 2,
      },
      {
        id: 2,
        produk_id: 2,
        name: "ayam utuh tanpa jeroan",
        stock: 10,
        price: 0,
        no_order: 3,
      },
      {
        id: 3,
        produk_id: 3,
        name: "ayam utuh pakai jeroan",
        stock: 0,
        price: 0,
        no_order: 4,
      },
      {
        id: 4,
        produk_id: 4,
        name: "paha pentung",
        stock: 0,
        price: 0,
        no_order: 5,
      },
      {
        id: 5,
        produk_id: 5,
        name: "sayap",
        stock: 0,
        price: 0,
        no_order: 6,
      },
      {
        id: 6,
        produk_id: 6,
        name: "kulit",
        stock: 0,
        price: 0,
        no_order: 6,
      },
      {
        id: 7,
        produk_id: 7,
        name: "ati ampela",
        stock: 0,
        price: 0,
        no_order: 7,
      },
      {
        id: 8,
        produk_id: 8,
        name: "usus bersih",
        stock: 0,
        price: 0,
        no_order: 8,
      },
      {
        id: 9,
        produk_id: 9,
        name: "gajih / brutu",
        stock: 0,
        price: 0,
        no_order: 9,
      },

      {
        id: 10,
        produk_id: 10,
        name: "kepala",
        stock: 0,
        price: 0,
        no_order: 10,
      },
      {
        id: 11,
        produk_id: 11,
        name: "ceker",
        stock: 0,
        price: 0,
        no_order: 11,
      },
      {
        id: 12,
        produk_id: 12,
        name: "balungan leher",
        stock: 0,
        price: 0,
        no_order: 12,
      },
      {
        id: 13,
        produk_id: 13,
        name: "balungan karkas",
        stock: 0,
        price: 0,
        no_order: 13,
      },

      {
        id: 14,
        produk_id: 14,
        name: "balungan premium",
        stock: 0,
        price: 0,
        no_order: 14,
      },

    ],
    struk: {},
    struks: [],
    invoice: null,
    mode:0, //0 = all, 1 = stok tersedia, 2 = stok habis
  }),

  getters: {
    //doubleCount: (state) => state.counter * 2
    getItemsByStok: ({items, mode}) => {
      let temp = []
      items.forEach(element => {
        switch (mode) {
          case 0:
            temp.push(element)
            break;
          case 1:
            if(element?.stock > 0) {
              temp.push(element)
            }
            break;
          case 2:
            if(element?.stock <= 0) {
              temp.push(element)
            }
            break;
        }
      });
      return temp
    },
    getItems: (state) => state.items,
    getTotalStokItems: ({items}) => {
      let temp = 0
      items.forEach(element => {
        temp += Number(element?.stock)
      });
      return temp
    },
    getStruk: (state) => state.struk,
    getStruks: (state) => state.struks,
    getStruksLength: (state) => state.struks.length,
    getStrukItemID: ({ struk }) => {
      if (struk?.items) {
        return Number(struk?.items?.length) + 1
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
      // return Math.round(Number(this.getTotal?.qty) * Number(this.getTotal?.price));
    },


    getTotalSaldo: ({struk}) => {
      const { balance } = usePengaturanStore()
      return Number(balance) - Number(struk?.bill_pembulatan)
    },

    // getPembulatanReceh() {
    //   return pembulatanReceh(this.getTotalStruk);
    // },
    // getChangePembulatan:({struk, getPembulatanReceh}) => {
    //   return Number(struk?.bayar) - Number(getPembulatanReceh);
    // },
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
        waktu: date.formatDate(Date.now(), "HH:mm:ss"),
        created_at: date.formatDate(Date.now(), "YYYY-MM-DD HH:mm:ss"),
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
          cabang: {
            ...cabang
          },
          type: "PENJUALAN",
          cashier: {
            ...cashier
          },
          // status: "",
          balance: 0,
          balance_akhir: 0,
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
          waktu: date.formatDate(Date.now(), "HH:mm:ss"),
          created_at: date.formatDate(Date.now(), "YYYY-MM-DD HH:mm:ss"),
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
      const storage_name = 'PENJUALAN-STRUKS-' + date.formatDate(Date.now(), "YYYY-MM-DD")

      let model = []

      if (localStorage.getItem(storage_name)) model = JSON.parse(localStorage.getItem(storage_name));

      let addModel = [
        ...model,
        this.struk,
      ]

      localStorage.setItem(storage_name, JSON.stringify(addModel))

      this.struks = addModel

      const { balance, onBalanceSync } = usePengaturanStore()
      console.log(balance, this.struk?.balance_akhir, this.struk)
      onBalanceSync(this.struk?.balance_akhir)

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
