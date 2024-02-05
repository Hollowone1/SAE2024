<template>
  <div class="page-container">
    <Login @login="login" class="nav-link"/>
  </div>
</template>

<script>
import Login from "../components/Login.vue";
import {useAuthStore} from '../stores/authStore.js'
import axios from 'axios'

export default {
  components: {
    Login
  },
  setup() {
    const authStore = useAuthStore()

    const login = async (email, password) => {
      try {
        const response = await axios.post('http://localhost:2082/api/users/signin', {
          email,
          password
        })

        const apiKey = response.data.apiKey

        authStore.setApiKey(apiKey)
      } catch (error) {
        console.error('Erreur lors de l\'authentification de l\'utilisateur', error)
      }
    }

    return {
      login
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap');

.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1F1E2E;
}

.nav-link {
  font-family: 'Protest Riot', sans-serif;
  text-decoration: none;
  background-color: #42B480;
  color: #ffff;
  padding: 10px 20px;
  margin: 1.5em;
  border: 2px solid #42B480;
  border-radius: 5px;
  font-size: 24px;
  width: 25%;
  text-align: center;
}
</style>