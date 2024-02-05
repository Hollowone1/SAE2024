<script>
import {useAuthStore} from "@/stores/authStore.js";
import {mapState, mapActions} from "pinia";
import router from "@/router/index.js";
</script>

<template>
  <div class="login">
    <h1>Connexion</h1>
    <form @submit.prevent="login">
      <div class="input-group">
        <label for="email">Adresse email</label>
        <input v-model="email" type="email" id="email" name="email" placeholder="Adresse email">
      </div>
      <div class="input-group">
        <label for="password">Mot de passe</label>
        <input v-model="password" type="password" id="password" name="password" placeholder="Mot de passe">
      </div>
      <div class="input-group">
        <button type="submit">Se connecter</button>
      </div>
    </form>
  </div>
</template>
