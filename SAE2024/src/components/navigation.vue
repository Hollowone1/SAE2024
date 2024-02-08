<template>
  <nav>
    <routerLink to="/nouvelle-partie">Nouvelle Partie</routerLink>
    <routerLink to="/"><h1>Géo-Quizz</h1></routerLink>
    <div v-if="isLoggedIn">
      <routerLink :to="{ name: 'profil' }">Mon profil</routerLink>
    </div>
    <div v-else>
      <routerLink :to="{ name: 'register' }">Inscription</routerLink>
      <routerLink :to="{ name: 'login' }">Connexion</routerLink>
    </div>
  </nav>
</template>

<script>
import {useAuthStore} from "@/stores/authStore.js";

export default {
  data() {
    return {
      isLoggedIn: false
    }
  },
  mounted() {
    this.isLoggedIn = useAuthStore().isAuthenticated;
  }
}
</script>