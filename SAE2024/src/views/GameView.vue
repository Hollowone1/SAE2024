<template>
    <div>
      <h2>Map View</h2>
      <div style="height: 600px; width: 800px">
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
  
  <style></style>
  