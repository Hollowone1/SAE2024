<template>
  <div class="page-container">
    <h2>Devinez où est située cette image ?</h2>
    <div class="game-container">
      <img src="../assets/a2c7fc86c6b887959f61fd704ff9d8c2bbc1c34f774d3dc41654207db787be9d.webp">
      <div class="mapstyle">
        <l-map ref="map" v-model:zoom="zoom" :center="center" :max-zoom="maxZoom" :min-zoom="minZoom" :zoom-control="false" :useGlobalLeaflet="false" @click="placeMarker">
          <l-tile-layer url="https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=b90e089c365242a3a08dbb49a7084a61" layer-type="base" name="OpenStreetMap"></l-tile-layer>
          <l-marker :lat-lng="markerLatLng" :draggable="true" @dragend="onMarkerDragEnd" @click="checkDistance">
            <l-popup :content="popupContent" />
          </l-marker>
        </l-map>
      </div>
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";

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
      imageUrl: "../assets/a2c7fc86c6b887959f61fd704ff9d8c2bbc1c34f774d3dc41654207db787be9d.webp",
      zoom: 12,
      center: [48.6921, 6.1844],
      markerLatLng: [48.6921, 6.1844],
      maxZoom: 25,
      minZoom: 1,
      targetLocation: { lat: 48.6921, lon: 6.1844 },
      distanceParameter: 0.1, // Distance maximale pour 5 points
      popupContent: "",
      score: 0,
      bestDistance: 100,
    };
  },
  methods: {
    checkDistance() {
      const markerLatLng = L.latLng(this.markerLatLng[0], this.markerLatLng[1]);
      const targetLatLng = L.latLng(this.targetLocation.lat, this.targetLocation.lon);
      const distance = markerLatLng.distanceTo(targetLatLng) / 1000; 
      console.log(distance); 

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
    },
    placeMarker(event) {
      this.markerLatLng = [event.latlng.lat, event.latlng.lng];
    },
    onMarkerDragEnd(event) {
      this.markerLatLng = [event.target.getLatLng().lat, event.target.getLatLng().lng];
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
