<template>
  <nav>
    <router-link to="/nouvelle-partie">Nouvelle Partie</router-link>
    <router-link to="/"><h1>Géo-Quizz</h1></router-link>
    <div v-if="isLoggedIn">
      <router-link :to="{ name: 'profil' }">Mon profil</router-link>
    </div>
    <div v-else>
      <router-link :to="{ name: 'register' }">Inscription</router-link>
      <router-link :to="{ name: 'login' }">Connexion</router-link>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from "@/stores/authStore.js";

export default {
  computed: {
    isLoggedIn() {
      return useAuthStore().isAuthenticated;
    },
  },
};
</script>
