<template>
    <div class="page-container">
      <h2>Devinez ou est située cette image ? </h2>
      <div class="game-container">
        <img src="../assets/a2c7fc86c6b887959f61fd704ff9d8c2bbc1c34f774d3dc41654207db787be9d.webp">
        <div class="mapstyle">
        <l-map ref="map" v-model:zoom="zoom" :center="center" :max-zoom="maxZoom" :min-zoom="minZoom" :zoom-control="false" :useGlobalLeaflet="false" @click="placeMarker">
          <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap"></l-tile-layer>
          <l-marker :lat-lng="markerLatLng" :draggable="true" @dragend="onMarkerDragEnd" @click="checkDistance"></l-marker>
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
      markerLatLng: [48.6921, 6.1844], // Initialiser avec les coordonnées de départ
      maxZoom: 18,
      minZoom: 1,
      markers: [],
      targetLocation: { lat: 40.7128, lon: -74.0060 }, // Example: New York City coordinates
      userGuess: { lat: 0, lon: 0 },
      distanceParameter: 500, 
      }
    },
    methods: {
        calculateDistance(lat1, lon1, lat2, lon2) {
          const radlat1 = Math.PI * lat1 / 180;
          const radlat2 = Math.PI * lat2 / 180;
          const theta = lon1 - lon2;
          const radtheta = Math.PI * theta / 180;
          let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
          dist = Math.acos(dist);
          dist = dist * 180 / Math.PI;
          dist = dist * 60 * 1.1515; // Distance in miles (you can change this multiplier for kilometers)
          return dist;
        },
        checkDistance() {
          const distance = this.calculateDistance(
            this.targetLocation.lat,
            this.targetLocation.lon,
            this.userGuess.lat,
            this.userGuess.lon
          );

          console.log(distance)
          console.log(this.distanceParameter)

          if (distance < this.distanceParameter) {
            console.log("5 points - Excellent guess!");
          } else if (distance < 2 * this.distanceParameter) {
            console.log("3 points - Good guess!");
          } else if (distance < 3 * this.distanceParameter) {
            console.log("1 point - Close enough!");
          } else {
            console.log("No points - Try again!");
          }
        },
        placeMarker(event) {
      this.markerLatLng = event.latlng;
    },
    onMarkerDragEnd(event) {
      this.markerLatLng = event.target.getLatLng();
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

  