import {defineStore} from 'pinia'
import localStorage from "@/plugins/localStorage.js";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
    errorMessage: null,
    token: null,
  }),

  actions: {
    async authenticate(username, password) {
      try {
        const baseUrlSignIn = 'http://localhost:2082/api/users/signin'
        const base64Credentials = btoa(`${username}:${password}`)
        const response = await fetch(baseUrlSignIn, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${base64Credentials}`,
          },
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.message)
        }

        const data = await response.json()

        localStorage.setItem('username', data.user.username);

        this.isAuthenticated = true
        this.user = data.user
        this.token = data.token
        this.errorMessage = null
      } catch (error) {
        console.error('Error during authentication:', error.message)
        this.isAuthenticated = false
        this.user = null
        this.errorMessage = 'An error occurred during authentication'
      }
    },

    logout() {
      this.isAuthenticated = false
      this.user = null
      this.errorMessage = null
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
    async signup() {
      try {
        const baseUrlSignUp = 'http://localhost:2082/api/users/signup'
        const base64Credentials = btoa(`${this.username}:${this.password}`)
        const formData = {
          username: this.username,
          email: this.email,
          password: this.password,
        }

        const response = await fetch(baseUrlSignUp, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${base64Credentials}`,
          },
          body: JSON.stringify(formData),
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.message)
        }

        const data = await response.json()
        console.log(data)
      } catch (error) {
        console.error('Error during signup request:', error.message)
      }
    },
  },
})

// You should not use `fetch` directly here because it is asynchronous
// and won't return the data you need. It's better to create a separate function or move the login logic to the authentication action.
// I've commented it out.

// export function getData() {
//   const baseUrlSignIn = 'http://localhost:2082/api/users/signin'
//   const base64Credentials = btoa(`${username}:${password}`)
//   fetch(baseUrlSignIn, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Basic ${base64Credentials}`,
//     },
//   })
// }