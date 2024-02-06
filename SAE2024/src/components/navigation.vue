<template>
 <nav>
    <routerLink to="/nouvelle-partie">Nouvelle Partie</routerLink>
    <routerLink to="/"><h1>Géo-Quizz</h1></routerLink>
   <routerLink v-if="isLoggedIn" to="../views/Profil.view">Mon profil</routerLink>
   <div v-else>
     <routerLink to="/register">Inscription</routerLink>
     <routerLink to="/login">Connexion</routerLink>
   </div>
 </nav>
</template>

<script>
    export default {
        data() {
        return {
          isLoggedIn: false,
        };
    },
    }
</script>