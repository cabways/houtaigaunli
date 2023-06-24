import { defineStore } from 'pinia'

export default defineStore('settingStore', {
  state: () => {
    return {
      fold: true,
      refresh: true,
    }
  },
})
