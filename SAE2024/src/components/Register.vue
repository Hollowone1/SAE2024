<template>
  <div class="register-container">
    <h1>Inscrivez-vous</h1>
    <p>Pour commencer à jouer</p>
    <form @submit.prevent="submitForm">
      <label for="name">Nom</label>
      <input v-model="name" type="text" id="name" name="name" placeholder="Nom">
      <br>
      <label for="email">Email</label>
      <input v-model="email" type="email" id="email" name="email" placeholder="Email">
      <br>
      <label for="password">Mot de passe</label>
      <input v-model="password" type="password" id="password" name="password" placeholder="Mot de passe">
      <br>
      <router-link type="submit" to="/"><button class="connexion">Inscription</button></router-link>
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    submitForm() {
      this.$emit('register', this.name, this.email, this.password);
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

.register-container {
  background-color: #28293E; /* couleur de fond du reste du site */
  color: #ffffff; /* texte en blanc */
  border-radius: 10px; /* bord arrondis */
  border: 3px solid;
  padding: 20px;
  border-color: hsl(237, 14%, 51%);
  padding: 5rem 10rem;
  width: 300px;
  text-align: initial;
  margin: auto;
}

@media screen and (max-width: 768px) {
  .register-container {
    padding:0;
    margin-top: 2rem; /* Réduire le padding pour les écrans réduits */
    width: 100%; /* Utiliser la largeur maximale de l'écran */
    border: none;
    background: none;
  }
}
</style>