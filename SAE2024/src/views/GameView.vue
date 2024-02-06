<template>
    <div class="page-container">
      <h2>Devinez ou est située cette image ? </h2>
      <div class="game-container">
        <img src="../assets/a2c7fc86c6b887959f61fd704ff9d8c2bbc1c34f774d3dc41654207db787be9d.webp">
        <div class="mapstyle">
            <l-map ref="map" v-model:zoom="zoom" :center="center" @click="updateMarker">
            <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                layer-type="base"
                name="OpenStreetMap"
            ></l-tile-layer>
            <l-marker v-if="clickedLocation" :lat-lng="clickedLocation" :icon="gameStatus === 'correct' ? 'successIcon' : 'errorIcon'"></l-marker>
            </l-map>
        </div>
        <div v-if="gameStatus === 'correct'">
              <p>Vous avez trouvé</p>
              <button @click="resetGame">Images suivante</button>
        </div>
        <div v-else-if="gameStatus === 'incorrect'">
            <p>Incorrect</p>
        </div>
      </div>
      
    </div>
  </template>
  
  <script>
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
  
  export default {
    components: {
      LMap,
      LTileLayer,
      LMarker,
    },
    data() {
      return {
        zoom: 2,
        center: [47.41322, -1.219482],
        markerLatLng: [0, 0],
        selectedMarker: null,
      };
    },
    methods: {
        onMapClick(e) {
            this.clickedLocation = e.latlng;
            const distance = this.map.distance(this.clickedLocation, this.targetLocation);

            if (distance < this.threshold) {
                this.gameStatus = 'correct';
            } else {
                this.gameStatus = 'incorrect';
            }
        },
        resetGame() {
            this.targetLocation = this.getRandomLocation();
            this.clickedLocation = null;
            this.gameStatus = 'waiting';
        },
        getRandomLocation() {
            const lat = this.getRandomCoordinate(-90, 90);
            const lng = this.getRandomCoordinate(-180, 180);
            return [lat, lng];
        },
        getRandomCoordinate(min, max) {
            return Math.random() * (max - min) + min;
        },
    },
  };
  </script>
  

  