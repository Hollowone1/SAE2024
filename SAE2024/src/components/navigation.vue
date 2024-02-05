<template>
 <nav>
    <routerLink to="/nouvelle-partie">Nouvelle Partie</routerLink>
    <routerLink to="/"><h1>Géo-Quizz</h1></routerLink>
    <routerLink to="../views/Profil.view">Mon profil</routerLink>
 </nav>
</template>

<script>
    export {

    }
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap");

nav {
  background-color: #28293E;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

a {
  font-family: "Protest Riot", sans-serif;
  text-decoration: none;
  color: #fff;
  margin: 0 15px;
  transition: color 0.3s;
}

a:hover {
  color: #42B480;
}
html {
  margin: 0;
  padding: 0;
}
h1:hover {
  color: #42B480;
}
h1 {
  font-family: "Protest Riot", sans-serif;
  color: #fff;
  margin: 0;
}
</style>