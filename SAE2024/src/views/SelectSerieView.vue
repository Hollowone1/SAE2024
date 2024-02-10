<template>
  <div>
    <h1>Choisissez une série</h1>
    <div v-for="serie in series" :key="serie.id" @click="handleSerieClick(serie.id)">
      <p>{{ serie.title }}</p>
      <p>{{ serie.description }}</p>
    </div>
<!--    <router-link to="/game">Jouer</router-link>-->
<!--    <router-link to="/replay">Rejouer</router-link>-->
  </div>
</template>

<script>
export default {
  name: "SelectSerieView",
  data() {
    return {
      series: this.getSeries()
    }
  },
  methods: {
    async handleSerieClick(serieId) {
      console.log(serieId);
      const party = {
        serie_id: serieId.toString(),
        user_email: localStorage.getItem("email"),
      };
      const response = await fetch("http://localhost:3333/api/party",
          {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(party),
          });
      const data = await response.json();
      localStorage.setItem("party", JSON.stringify(data.item));
      // this.$router.push("/game");
    },
    async getSeries() {
      const response = await fetch('http://localhost:3333/api/series');
      const data = await response.json();
      this.series = data.data.Series;
      console.log(this.series);
    }
  },
}
</script>

<style scoped>

</style>