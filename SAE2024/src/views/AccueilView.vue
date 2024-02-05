<template>
    <div class="page-container">
      <router-link to="./NouvellePartie" class="nav-link">Nouvelle Partie</router-link>
      <router-link to="./Replay" class="nav-link">Rejouer une partie</router-link>
      <router-link to="./Profil" class="nav-link">Mon profil</router-link>
    </div>
  </template>
  
  <style scoped>

    @import url('https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap');

  .page-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #333;
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
    transition: background-color 0.3s, color 0.3s;
    width: 25%;
    text-align: center;
  }
  </style>
  

<script>


</script>