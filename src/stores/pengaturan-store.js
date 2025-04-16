import { defineStore, acceptHMRUpdate } from 'pinia'

export const usePengaturanStore = defineStore('PengaturanStore', {
  state: () => ({
    balance: 100000,
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
        description: "Search engine",
        icon: "mail",
        pin: 1234,
      },
      {
        label: "Facebook",
        value: "Facebook",
        description: "Social media",
        icon: "bluetooth",
        pin: 5678
      },
    ],
    list_courirs: [
      {
        label: "Google",
        value: "Google",
        description: "Search engine",
        icon: "mail",
        pin: 1234,
      },
      {
        label: "Facebook",
        value: "Facebook",
        description: "Social media",
        icon: "bluetooth",
        pin: 5678
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
