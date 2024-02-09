<template>
  <div class="page-container">
    <Register @register="register" class="nav-link"/>
  </div>
</template>

<script>
import Register from "../components/Register.vue";
import {useRegisterStore} from '../stores/authStore.js';
import {saveGameData} from '@/plugins/localStorage.js'


export default {
  components: {
    Register
  },
  methods: {
    async register(name, email) {
      const registerStore = useRegisterStore();
      await registerStore.register(name, email);

      if (registerStore.isRegistered) {
        this.$router.push('/');
        this.$toast.success('Inscription réussie');
        saveGameData()
      } else {
        this.$toast.error('Identifiant invalide');
      }
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