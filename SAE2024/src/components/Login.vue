<template>
  <div class="login-container">
    <h1>Connectez-vous</h1>
    <p>Pour commencer à jouer</p>
    <form @submit.prevent="submitForm">
      <label for="email">Identifiant</label>
      <input v-model="email" type="email" id="email" name="email" placeholder="Identifiant">
      <br>
      <label for="password">Mot de passe</label>
      <input v-model="password" type="password" id="password" name="password" placeholder="Mot de passe">
      <br>
      <router-link type="submit" to="/" class="connexion">Connexion</router-link>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    submitForm() {
      this.$emit('login', this.email, this.password)
    }
  }
}
</script>


<style scoped>
.login-container {
  background-color: #1F1E2E; /* couleur de fond du reste du site */
  color: #ffffff; /* texte en blanc */
  border-radius: 10px; /* bord arrondis */
  padding: 20px;
  width: 300px;
  margin: auto;
}

.nav-link {
  font-family: 'Protest Riot', sans-serif;
  text-decoration: none;
  color: #ffff;
  padding: 10px 20px;
  margin: 1.5em;
  border: 2px solid #717295;
  border-radius: 5px;
  font-size: 20px;
  width: 25%;
  text-align: initial;
}

h1 {
  font-size: 20px;
  margin-bottom: 10px;
  transition: none;
}

a {
  text-decoration: none;
  color: #ffffff;
  font-size: 20px;
  transition: none;
}

.connexion {
  background-color: #42B480;
  color: #ffffff;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  width: 100%;
  text-align: center;
}

</style>