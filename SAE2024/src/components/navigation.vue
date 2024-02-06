<template>
 <nav>
    <routerLink to="/nouvelle-partie">Nouvelle Partie</routerLink>
    <routerLink to="/"><h1>Géo-Quizz</h1></routerLink>
    <router-link v-if="utilisateurConnecte" to="/profil">Mon profil</router-link>
 </nav>
</template>

<script>
    export default {
        data() {
        return {
            utilisateurConnecte: false,
        };
    },
    }
</script>
