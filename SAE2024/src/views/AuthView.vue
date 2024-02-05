<script>

</script>

<template>
  <main>
    <h1>Authentification</h1>
    <form @submit.prevent="login">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="user.email" required>
      <label for="password">Mot de passe</label>
      <input type="password" id="password" v-model="user.password" required>
      <button type="submit">Se connecter</button>
    </form>
  </main>
</template>