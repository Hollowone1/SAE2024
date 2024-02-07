<template>
  <div class="page-container">
    <Login @login="login" class="nav-link"/>
  </div>
</template>

<script>
import Login from "../components/Login.vue";
import {useAuthStore} from '../stores/authStore.js'

export default {
  components: {
    Login
  },
  methods: {
    login() {
      const authStore = useAuthStore();
      authStore.setToken(this.email, this.password);
      console.log(authStore.token);
      this.$api.get('/profil')
          .then((res) => {
            console.log(res.data);
            this.$router.push('/');
            this.$toast.success('Connexion réussie');
            authStore.isAuthenticated = true;
          })
          .catch((error) => {
            this.$toast.error('Identifiant invalide');
            authStore.setToken(null);
            console.log(error.response.data);
          });
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