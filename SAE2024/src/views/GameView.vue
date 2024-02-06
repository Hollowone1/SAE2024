<template>
    <div class="page-container">
      <h2>Devinez ou est située cette image ? </h2>
      <div class="game-container">
        <img src="../assets/a2c7fc86c6b887959f61fd704ff9d8c2bbc1c34f774d3dc41654207db787be9d.webp">
        <div class="mapstyle">
            <l-map ref="map" v-model:zoom="zoom" :center="center" :max-zoom="maxZoom" :min-zoom="minZoom" :zoom-control="false" :useGlobalLeaflet="false" @click="updateMarker">
            <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                layer-type="base"
                name="OpenStreetMap"
            ></l-tile-layer>  
            <l-marker v-if="clickedLocation" :lat-lng="clickedLocation" :icon="gameStatus === 'correct' ? 'successIcon' : 'errorIcon'"></l-marker>  
          </l-map>
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
      zoom: 12, // Augmenter le niveau de zoom pour que la ville de Nancy soit visible
      center: [48.6921, 6.1844], // Coordonnées de la ville de Nancy
      clickedLocation: null,
      gameStatus: 'waiting',
      maxZoom: 18,
      minZoom: 1,
      markers: []
      }
    },
    methods: {
        onMapClick(e) {
          this.markerLatLng= e.latLng;
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
        addMarker(latLng) {
      this.markers.push({ latLng });
    },
    // Méthode pour réinitialiser les marqueurs
    resetMarkers() {
      this.markers = [];
    },
    },
  };
  </script>
  
  <style scoped>
  .mapstyle{
    position: relative;
  }
  map{
    position: absolute;
  }
  </style>

  