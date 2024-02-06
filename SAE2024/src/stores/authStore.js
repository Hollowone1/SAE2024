import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
    errorMessage: null,
  }),

  actions: {
    async authenticate({ username, password }) {
      try {
        const response = await fakeApi.authenticate(username, password);

        if (response.success) {
          this.isAuthenticated = true;
          this.user = response.user;
          this.errorMessage = null;
        } else {
          this.isAuthenticated = false;
          this.user = null;
          this.errorMessage = response.message;
        }
      } catch (error) {
        console.error('Erreur lors de l\'authentification', error);
        this.isAuthenticated = false;
        this.user = null;
        this.errorMessage = 'Une erreur s\'est produite lors de l\'authentification';
      }
    },

    logout() {
      this.isAuthenticated = false;
      this.user = null;
      this.errorMessage = null;
    },
  },
});

export const fakeApi = {
  async authenticate(username, password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (username === 'example_user' && password === 'password123') {
          resolve({
            success: true,
            user: { username: 'example_user', role: 'user' },
          });
        } else {
          resolve({
            success: false,
            message: 'Nom d\'utilisateur ou mot de passe incorrect',
          });
        }
      }, 1000);
    });
  },
};
