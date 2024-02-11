<template>
  <div class="page-container">
    <h2>Devinez où est située cette image ?</h2>
    <div class="game-container">
      <img alt="image de la partie" v-if="extractedData[currentItemIndex]" :src="'http://localhost:8055/assets/' + extractedData[currentItemIndex].image.id">
      <div class="mapstyle">
        <l-map ref="map" v-if="center" v-model:zoom="zoom" :center="center" :max-zoom="maxZoom" :min-zoom="minZoom"
               :zoom-control="false" :useGlobalLeaflet="false" @click="placeMarker">
          <l-tile-layer
              url="https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=b90e089c365242a3a08dbb49a7084a61"
              layer-type="base" name="OpenStreetMap"></l-tile-layer>
          <l-marker :lat-lng="markerLatLng" :draggable="true" @dragend="onMarkerDragEnd" @click="checkDistance">
            <l-popup :content="popupContent"/>
          </l-marker>
        </l-map>
      </div>

    </div>
    <div class="score-container">

      <table class="points-table">
        <thead>
        <tr>
          <th>Essais Restants</th>
          <th>Score</th>
          <th>Meilleure Distance</th>

        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{ this.attemptsPerItem - this.currentAttemptIndex }}</td>
          <td>{{ score }}</td>
          <td>{{ bestDistance }} km</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-if="gameOver">
      <p>Fin de la partie ! Score final : {{ score }}</p>
      <button @click="resetGame" class="rejouer">Recommencer</button>
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {LMap, LTileLayer, LMarker, LPopup} from "@vue-leaflet/vue-leaflet";

export default {
  name: "GameView",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  data() {
    return {
      zoom: 12,
      center: null,
      markerLatLng: null,
      maxZoom: 25,
      minZoom: 1,
      targetLocation: null,
      distanceParameter: 0.1,
      popupContent: "",
      score: this.getScore(),
      bestDistance: 100,
      totalAttempts: 2,
      remainingAttempts: 2,
      gameOver: false,
      partie: null,
      items: null,
      extractedData: [],
      currentItemIndex: 0,
      currentAttemptIndex: 0,
      attemptsPerItem: 3,
    };
  },
  async created() {
    await this.getPartie();
    await this.getItems();
    await this.extractLocationAndImage();
  },
  methods: {
    extractLocationAndImage() {
      if (this.items) {
        const items = this.items;
        this.extractedData = items.map(item => ({
          location: item.coordinates,
          image: item.image
        }));
        this.center = [this.partie.coordinates.coordinates[1], this.partie.coordinates.coordinates[0]];
        this.markerLatLng = this.center;
        this.targetLocation = {
          lat: this.extractedData[0].location.coordinates[1],
          lon: this.extractedData[0].location.coordinates[0]
        };

      } else {
        console.error('Les données nécessaires ne sont pas définies.');
      }
    },
    getPartie() {
      const data = window.localStorage.getItem("party");
      const dataJson = JSON.parse(data);
      console.log(dataJson.partie);
      this.partie = dataJson.partie;
    },
    async getItems() {
      if (!this.partie) {
        console.error('La partie est indéfinie. Impossible de récupérer les items.');
        return;
      }
      this.items = this.partie.items;
      console.log(this.items);
      this.center = [this.items[0].coordinates.coordinates[1], this.items[0].coordinates.coordinates[0]];
    },
    getScore() {
      let data = window.localStorage.getItem("party");
      let dataJson = JSON.parse(data);
      return dataJson.partie.score;
    },
    checkDistance() {
      const markerLatLng = L.latLng(this.markerLatLng[0], this.markerLatLng[1]);
      this.targetLocation = {lat: this.extractedData[this.currentItemIndex].location.coordinates[1], lon: this.extractedData[this.currentItemIndex].location.coordinates[0]};
      const targetLatLng = L.latLng(this.targetLocation.lat, this.targetLocation.lon);
      const distance = markerLatLng.distanceTo(targetLatLng) / 1000;

      let points = 0;
      if (distance < this.distanceParameter) {
        points = 5;
      } else if (distance < 3 * this.distanceParameter) {
        points = 3;
      } else if (distance < 4 * this.distanceParameter) {
        points = 2;
      } else {
        points = 0;
      }

      this.popupContent = `Vous avez gagné ${points} points !`;

      this.score += points;

      if (distance < this.bestDistance) {
        this.bestDistance = distance;
      }
      if (this.currentAttemptIndex < this.attemptsPerItem - 1) {
        this.currentAttemptIndex++;
        this.popupContent += ` Vous avez ${this.attemptsPerItem - this.currentAttemptIndex} tentative(s) restante(s).`;
      } else {
        this.currentAttemptIndex = 0;
        this.currentItemIndex++;
        this.bestDistance = 100;
        this.popupContent = "";
        this.remainingAttempts = this.attemptsPerItem;
        this.gameOver = false;
        console.log(this.currentItemIndex);
        console.log(this.extractedData.length);
        if (this.currentItemIndex < this.extractedData.length) {
          this.extractLocationAndImage();
        } else {
          alert("Vous avez terminé la partie ! Votre score est de " + this.score + " points.");
          this.currentItemIndex = 0;
          this.score = 0;
        }
      }
    },
    placeMarker(event) {
      this.markerLatLng = [event.latlng.lat, event.latlng.lng];
    }
    ,
    onMarkerDragEnd(event) {
      this.markerLatLng = [event.target.getLatLng().lat, event.target.getLatLng().lng];
    }
    ,
    resetGame() {
      this.score = 0;
      this.bestDistance = 100;
      this.remainingAttempts = this.totalAttempts;
      this.gameOver = false;
      this.markerLatLng = [this.center[0], this.center[1]];
    }
  },

};
</script>


<style scoped>
.mapstyle {
  position: relative;
}

map {
  position: absolute;
}

</style>
