import { defineStore } from 'pinia'
import axios from 'axios'


interface ResponseInterface {
  success: string
}

// Pinia store with login and logout methods
// State as user name is stored in local storage, token is stored by browser
export const useAuthStore = defineStore('AUTH', {
  state: () => ({
    isLogged: localStorage.getItem("IsLogged")?.length ? true : false ?? false,
    userName: localStorage.getItem("IsLogged") ?? ""
  }),
  getters: {

  },
  actions: {
    async actionLogIn(name: string, pass: string) {
      const response = await axios.post(
        `http://${import.meta.env.VITE_HOST_REST_API_ADDR}:${import.meta.env.VITE_HOST_REST_API_PORT}/auth/login`,
        { "login": name, "password": pass }
      );

      const data = await response.data as ResponseInterface;

      if (data.success) {
        this.isLogged = true;
        localStorage.setItem("IsLogged", name);
        this.userName = name;
      }
    },
    async actionLogOut() {
      this.isLogged = false;
      localStorage.removeItem("IsLogged");
      this.userName = "";

      const response = await axios.get(
        `http://${import.meta.env.VITE_HOST_REST_API_ADDR}:${import.meta.env.VITE_HOST_REST_API_PORT}/auth/logout`
      );

      const data = await response.data as ResponseInterface;

      if (data.success) {
        console.log("Correctly logged out.")
      }
    },
  },
})
