// Dentro de useAuthStore (o tu store de autenticación)
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: sessionStorage.getItem('authToken') || null,
  }),
  actions: {
    setToken(token) {
      this.token = token;
      sessionStorage.setItem('authToken', token);
    },
    logout() {
      this.token = null;
      sessionStorage.removeItem('authToken');
    }
  }
});
