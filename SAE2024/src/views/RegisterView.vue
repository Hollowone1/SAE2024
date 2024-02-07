<template>
  <div class="page-container">
    <Register @register="register" class="nav-link"/>
  </div>
</template>

<script>
import Register from "../components/Register.vue";
import {useAuthStore} from '../stores/authStore.js';

export default {
  components: {
    Register
  },
  methods: {
    register(name, email, password) {
      this.$api.post('/register', {
        name: name,
        email: email,
        password: password
      }).then(response => {
        if (response.data.success) {
          useAuthStore().setToken(response.data.token);
          this.$router.push('/');
          this.$toast.success('Inscription réussie');
        } else {
          this.$toast.error('Erreur d\'inscription');
        }
      }).catch(error => {
        this.$toast.error('Une erreur est survenue lors de l\'inscription');
      });
    }
  }
}
</script>

<style>

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