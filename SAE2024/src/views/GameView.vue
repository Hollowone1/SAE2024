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
            <l-marker :lat-lng="markerLatLng" @click="showMarkerInfo"></l-marker>
            </l-map>
        </div>
        <div>
            <p v-if="selectedMarker">Latitude: {{ selectedMarker[0] }}, Longitude: {{ selectedMarker[1] }}</p>
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
      updateMarker(event) {
        const latLng = event.latlng;
        this.markerLatLng = [latLng.lat, latLng.lng];
      },
      showMarkerInfo() {
        this.selectedMarker = this.markerLatLng;
      },
    },
  };
  </script>
  
  <style>
      @import url('https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap');

    .game-container{
        display: flex;
        justify-content: center;
    }
    img{
        width: 50%;
        height: auto;
    }

    .page-container {
    display: flex;
    flex-direction: column;
    color: #ffffff;
    font-family: 'Protest Riot', sans-serif;
    padding: 20px;
    height: 100vh;
    background-color: #1F1E2E;
  }

    .mapstyle{
      height: auto; 
      width: 50%; 
      border: 2px solid grey;
    }
  </style>
  