<template>
  <div class="page-container">
    <Login @login="login" class="nav-link"/>
  </div>
</template>

<script>
import Login from "../components/Login.vue";
import {useAuthStore} from '../stores/authStore.js'
import {saveGameData} from '@/plugins/localStorage.js'

export default {
  components: {
    Login
  },
  methods: {
    async login(email, password) {
      const authStore = useAuthStore();
      await authStore.authenticate(email, password);

      if (authStore.isAuthenticated) {;
        this.$router.push('/');
        this.$toast.success('Connexion réussie');
        saveGameData()
      } else {
        this.$toast.error('Identifiant invalide');
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