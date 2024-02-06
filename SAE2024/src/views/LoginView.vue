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
  methods: {
    async login(email, password) {
      try {
        const response = await axios.post('http://localhost:2082/api/users/signin', {
          email: email,
          password: password
        })
        console.log(response.data)
        useAuthStore().setToken(response.data.token)
        this.$router.push('/accueil')
      } catch (error) {
        console.log(error)
        toast.error('Erreur lors de la connexion');
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap');



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