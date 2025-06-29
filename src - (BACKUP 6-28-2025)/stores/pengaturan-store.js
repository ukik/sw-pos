import { defineStore, acceptHMRUpdate } from 'pinia'

import Swal from 'sweetalert2/dist/sweetalert2';
import decimal from 'src/helpers/decimal';

import { ref, nextTick } from 'vue';
import localforage from "localforage";


import { date } from "quasar";

const timeStamp = Date.now();
const formattedString = date.formatDate(Date.now(), "YYYY-MM-DD HH:mm:ss");
const tanggalString = date.formatDate(Date.now(), "YYYY-MM-DD");
const waktuString = date.formatDate(Date.now(), "HH:mm:ss");


export const usePengaturanStore = defineStore('PengaturanStore', {
  state: () => ({
    pin_master: 2233,
    balance: 0,
    cabang: {
      id: 1,
      nama: "JAKARTA",
      alamat: "nama cabang",
    }, // active cabang
    // cashier: {
    //   id: 1,
    //   nama: "Admin",
    //   alamat: 'Jl. ini itu',
    //   pin: 1234,
    //   foto: '',
    // }, // active cashier
    cashier: null,
    shift: {
      // id: 1,
      // nama: 'A',
      // description: "Shift A",
      // jam_mulai: '08:30',
      // jam_selesai: '12:30',
      // status: 'on time'
    }, // active shift
    position: {
      //   "Latitude: " +
      //     position.coords.latitude +
      //     "\n" +
      //     "Longitude: " +
      //     position.coords.longitude +
      //     "\n" +
      //     "Altitude: " +
      //     position.coords.altitude +
      //     "\n" +
      //     "Accuracy: " +
      //     position.coords.accuracy +
      //     "\n" +
      //     "Altitude Accuracy: " +
      //     position.coords.altitudeAccuracy +
      //     "\n" +
      //     "Heading: " +
      //     position.coords.heading +
      //     "\n" +
      //     "Speed: " +
      //     position.coords.speed +
      //     "\n" +
      //     "Timestamp: " +
      //     position.timestamp +
      //     "\n"
    },

    shift_login: '',

    //pengiriman_cashier: null,
    pengiriman_courir: null,
    mutasi_courir: null,

    rotasi_cashier_pemberi: null,
    rotasi_cashier_penerima: null,
    // rotasi_shift_pemberi: null,
    // rotasi_shift_penerima: null,

    // list_shifts: [ // tidak diperlukan
    //   {
    //     id: 1,
    //     nama: 'Shift A',
    //     value:'A',
    //     description: "Shift A",
    //     jam_mulai: '08:30',
    //     jam_selesai: '12:30',
    //   },
    //   {
    //     id: 2,
    //     nama: 'Shift B',
    //     value:'B',
    //     description: "Shift A",
    //     jam_mulai: '08:30',
    //     jam_selesai: '12:30',
    //   },
    // ],

    list_cashiers: [
      {
        id: 1,
        nama: 'Kasir 1',
        alamat: 'Jl. ini itu',
        pin: 1234,
        foto: 'images/user-1.png',

      },
      {
        id: 2,
        nama: 'Kasir 2',
        alamat: 'Jl. macan',
        pin: 1234,
        foto: 'images/user-1.png',

      },
    ],
    list_courirs: [
      {
        id: 1,
        nama: 'Kurir 1',
        alamat: 'Jl. ini itu',
        pin: 1234,
        foto: 'images/user-1.png',
      },
      {
        id: 2,
        nama: 'Kurir 2',
        alamat: 'Jl. ini itu',
        pin: 1234,
        foto: 'images/user-1.png',
      },
      {
        id: 3,
        nama: 'Kurir 3',
        alamat: 'Jl. ini itu',
        pin: 1234,
        foto: 'images/user-1.png',
      },
    ],
  }),

  getters: {
    getCashierLength: (state) => state.list_cashiers.length,
    getCourirLength: (state) => state.list_courirs.length,
    getBalance: (state) => state.balance,
    // getBalance: (state) => state.balance
    getShiftData: ({ list_shifts }) => {
      return function (payload) {
        let temp = null
        list_shifts.forEach(el => {
          if (el.value == payload) {
            return temp = el
          }
        });
        return temp
      }
    },
  },

  actions: {
    setCashier(payload) {
      this.cashier = payload
    },
    setPosition(payload) {
      this.position = payload
    },
    onBalanceSync(payload) {
      this.balance = payload
    },
    onEditCashier(payload, tipe) {
      console.log('onEditCashier', tipe)

      let temp = JSON.parse(JSON.stringify(this.list_cashiers));
      let _temp = JSON.parse(JSON.stringify(payload));

      if (tipe == 'UPDATE') {
        // kalo foreach gak bisa, ini bisa
        for (let i = 0; i < temp.length; i++) {
          if (temp[i].id == _temp.id) {
            temp[i] = _temp;
            console.log("onBubbleEventOK onEditCashier", temp[i], _temp);
          }
        }
      }
      if (tipe == 'CREATE') {
        payload.id = this.getCashierLength + 1

        temp.push(payload)
      }

      this.list_cashiers = temp;

      Swal.fire({
        icon: "success",
        title: `Kasir ${payload?.nama}`,
        text: `Berhasil di sunting`,
        showConfirmButton: false,
        timer: 2500,
      })
    },
    onEditCourir(payload, tipe) {
      console.log('onEditCashier', tipe)

      let temp = JSON.parse(JSON.stringify(this.list_courirs));
      let _temp = JSON.parse(JSON.stringify(payload));

      if (tipe == 'UPDATE') {
        // kalo foreach gak bisa, ini bisa
        for (let i = 0; i < temp.length; i++) {
          if (temp[i].id == _temp.id) {
            temp[i] = _temp;
            console.log("onBubbleEventOK onEditCourir", temp[i], _temp);
          }
        }
      }

      if (tipe == 'CREATE') {
        payload.id = this.getCourirLength + 1
        temp.push(payload)
      }

      this.list_courirs = temp;

      Swal.fire({
        icon: "success",
        title: `Kurir ${payload?.nama}`,
        text: `Berhasil di sunting`,
        showConfirmButton: false,
        timer: 2500,
      })
    },

    async updateLocalStorageCourir() {
      const storage_name = 'PENGATURAN-DAFTAR-KURIR-' + date.formatDate(Date.now(), "YYYY-MM-DD")

      /*
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
      this.list_courirs = notesArr

      return
      */

      let model = []

      if (localStorage.getItem(storage_name)) model = JSON.parse(localStorage.getItem(storage_name));

      let addModel = [
        ...model,
        this.struk,
      ]

      localStorage.setItem(storage_name, JSON.stringify(addModel))

      this.list_courirs = addModel
    },
    async updateLocalStorageCashier() {
      const storage_name = 'PENGATURAN-DAFTAR-KASIR-' + date.formatDate(Date.now(), "YYYY-MM-DD")

      /*
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
      this.list_cashiers = notesArr

      return
      */

      let model = []

      if (localStorage.getItem(storage_name)) model = JSON.parse(localStorage.getItem(storage_name));

      let addModel = [
        ...model,
        this.struk,
      ]

      localStorage.setItem(storage_name, JSON.stringify(addModel))

      this.list_cashiers = addModel
    },


    // onEditShift(payload) {
    //   let temp = JSON.parse(JSON.stringify(this.list_shifts));
    //   let _temp = JSON.parse(JSON.stringify(payload));


    //   // kalo foreach gak bisa, ini bisa
    //   for (let i = 0; i < temp.length; i++) {
    //     if (temp[i].id == _temp.id) {
    //       temp[i] = _temp;
    //       console.log("onBubbleEventOK onEditShift", temp[i], _temp);
    //     }
    //   }

    //   this.list_shifts = temp;

    //   Swal.fire({
    //     icon: "success",
    //     title: `Shift ${payload?.value}`,
    //     text: `Berhasil di sunting`,
    //     showConfirmButton: false,
    //     timer: 2500,
    //   })
    // },

    async initLocalStorage() {

      if (localStorage.getItem('PENGATURAN-CABANG')) {
        this.cabang = JSON.parse(localStorage.getItem('PENGATURAN-CABANG'));
      }
      if (localStorage.getItem('PENGATURAN-BALANCE')) {
        this.balance = JSON.parse(localStorage.getItem('PENGATURAN-BALANCE'));
      }
      if (localStorage.getItem('PENGATURAN-KASIR')) {
        this.cashier = JSON.parse(localStorage.getItem('PENGATURAN-KASIR'));
      }

      /*
      // Konfigurasi database localForage
      const db_kasir = localforage.createInstance({
        name: "FreeztoMartDB",
        storeName: 'PENGATURAN-DAFTAR-KASIR'
      });

      await nextTick();
      let notesArr1 = []
      await db_kasir.iterate((value, key) => {
        const n = { ...value, id: key }
        notesArr1.push(JSON.parse(n?.text))
      })
      this.list_cashiers = notesArr1


      // Konfigurasi database localForage
      const db_kurir = localforage.createInstance({
        name: "FreeztoMartDB",
        storeName: 'PENGATURAN-DAFTAR-KURIR'
      });

      await nextTick();
      let notesArr2 = []
      await db_kurir.iterate((value, key) => {
        const n = { ...value, id: key }
        notesArr2.push(JSON.parse(n?.text))
      })
      this.list_courirs = notesArr2

      return
      */

      if (localStorage.getItem('PENGATURAN-DAFTAR-KASIR')) {
        this.list_cashiers = JSON.parse(localStorage.getItem('PENGATURAN-DAFTAR-KASIR'));
      }
      if (localStorage.getItem('PENGATURAN-DAFTAR-KURIR')) {
        this.list_courirs = JSON.parse(localStorage.getItem('PENGATURAN-DAFTAR-KURIR'));
      }
      // if (localStorage.getItem('PENGATURAN-DAFTAR-SHIFT')) {
      //   this.list_shifts = JSON.parse(localStorage.getItem('PENGATURAN-DAFTAR-SHIFT'));
      // }
    },
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePengaturanStore, import.meta.hot))
}
