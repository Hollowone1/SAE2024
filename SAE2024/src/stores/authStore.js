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
          const baseUrlSignIn = 'http://localhost:2082/api/users/signin';
          const response = await fetch(baseUrlSignIn, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
  
          const data = await response.json();
  
          if (data.success) {
            this.isAuthenticated = true;
            this.user = data.user;
            const jwtToken = data.token;
            this.token = jwtToken;
            this.errorMessage = null;
          } else {
            this.isAuthenticated = false;
            this.user = null;
            this.errorMessage = data.message;
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
  })
  

export const useRegisterStore = defineStore('user', {
    state: () => ({
      username: '',
      email: '',
      password: '',
    }),
    actions: {
      signup() {
        const baseUrlSignUp = 'http://localhost:2082/api/users/signup';

        const formData = {
          username: this.username,
          email: this.email,
          password: this.password,
        };

        fetch(baseUrlSignUp, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('Erreur lors de la requête:', error);
        });
      },
    },
  });


