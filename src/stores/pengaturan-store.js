import { defineStore, acceptHMRUpdate } from 'pinia'

export const usePengaturanStore = defineStore('PengaturanStore', {
  state: () => ({
    balance: 100000,
    cabang: {
      id: 1,
      nama: "JAKARTA",
      deskripsi: "nama cabang",
    }, // active cabang
    cashier: {
      id: 1,
      nama: "Admin",
      deskripsi: "nama kasir",
      pin: 1234,
    }, // active cashier
    shift: {
      id: 1,
      nama: 'A',
      jam_mulai: '08:30',
      jam_selesai: '12:30',
      jam_login: '09:00',
      status: 'on time'
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


    pengiriman_cashier: {
      label: "Admin",
      value: "Admin",
      description: "Search engine",
      icon: "mail",
      pin: 1234,
    },
    pengiriman_courir: null,

    mutasi_cashier: {
      label: "Admin",
      value: "Admin",
      description: "Search engine",
      icon: "mail",
      pin: 1234,
    },
    mutasi_courir: null,

    rotasi_cashier_1: {
      label: "Admin",
      value: "Admin",
      description: "Search engine",
      icon: "mail",
      pin: 1234,
    },
    rotasi_cashier_2: {
      label: "Admin",
      value: "Admin",
      description: "Search engine",
      icon: "mail",
      pin: 1234,
    },

    list_cashiers: [
      {
        label: "Google",
        value: "Google",
        description: "password: 1234",
        icon: "mail",
        pin: 1234,
      },
      {
        label: "Facebook",
        value: "Facebook",
        description: "password: 1234",
        icon: "bluetooth",
        pin: 1234
      },
    ],
    list_courirs: [
      {
        label: "Google",
        value: "Google",
        description: "password: 1234",
        icon: "mail",
        pin: 1234,
      },
      {
        label: "Facebook",
        value: "Facebook",
        description: "password: 1234",
        icon: "bluetooth",
        pin: 1234
      },
    ],
  }),

  getters: {
    getBalance: (state) => state.balance,
    getBalance: (state) => state.balance
  },

  actions: {
    // increment() {
    //   this.counter++
    // }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePengaturanStore, import.meta.hot))
}
