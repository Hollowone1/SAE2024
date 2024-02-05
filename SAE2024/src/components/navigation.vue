<template>
 <nav>
    <routerLink to="../views/NouvellePartie.view">Nouvelle Partie</routerLink>
    <h1>Géo-Quizz</h1>
    <routerLink to="../views/Profil.view">Mon profil</routerLink>
 </nav>
</template>

<script>
    export {

    }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap');


nav {
  background-color: #28293E; 
  padding: 10px; 
  display: flex;
  justify-content: space-between;
  align-items: center;
}

a {
  font-family: 'Protest Riot',sans-serif;
  text-decoration: none; 
  color: #fff; 
  margin: 0 15px; 
  transition: color 0.3s; 
}

a:hover {
  color: #ecf0f1; 
}

h1 {
  font-family: 'Protest Riot',sans-serif;
  color: #fff; 
  margin: 0; 
}


</style>