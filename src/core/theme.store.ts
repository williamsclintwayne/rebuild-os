import { defineStore } from "pinia"

export const useThemeStore = defineStore("theme", {
  state: () => ({
    darkMode: true,
  }),

  actions: {
    toggleTheme() {
      this.darkMode = !this.darkMode
      document.documentElement.classList.toggle("dark", this.darkMode)
      localStorage.setItem("theme", this.darkMode ? "dark" : "light")
    },

    initialize() {
      const saved = localStorage.getItem("theme")
      this.darkMode = saved ? saved === "dark" : true
      document.documentElement.classList.toggle("dark", this.darkMode)
    },
  },
})