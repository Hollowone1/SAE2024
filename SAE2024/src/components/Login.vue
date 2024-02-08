<template>
  <div class="login-container">
    <h1>Connectez-vous</h1>
    <p>Pour commencer à jouer</p>
    <form @submit.prevent="submitForm">
      <label for="username">Identifiant</label>
      <input v-model="username" type="email" id="username" name="username" placeholder="Identifiant">
      <br>
      <label for="password">Mot de passe</label>
      <input v-model="password" type="password" id="password" name="password" placeholder="Mot de passe">
      <br>
      <button class="connexion">Connexion</button>
      <p v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    submitForm() {
      this.$emit('login', this.username, this.password);
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 1.5em;
  margin-bottom: 10px;
  text-align: left;
}

p {
  margin-top: 0;
  text-align: left;
}
.login-container {
  background-color: #28293E; /* couleur de fond du reste du site */
  color: #ffffff; /* texte en blanc */
  border-radius: 10px; /* bord arrondis */
  border: 3px solid hsl(237, 14%, 51%);
  padding: 5rem 10rem;
  width: 300px;
  text-align: initial;
  margin: auto;
}

@media screen and (max-width: 768px) {
  .login-container {
    padding:0;
    margin-top: 2rem; /* Réduire le padding pour les écrans réduits */
    width: 100%; /* Utiliser la largeur maximale de l'écran */
    border: none;
    background: none;
  }
}
</style>