<template>
  <div class="page-container">
    <h2>Devinez où est située cette image ?</h2>
    <div class="game-container">
      <img src="../assets/a2c7fc86c6b887959f61fd704ff9d8c2bbc1c34f774d3dc41654207db787be9d.webp">
      <div class="mapstyle">
        <l-map ref="map" v-model:zoom="zoom" :center="center" :max-zoom="maxZoom" :min-zoom="minZoom" :zoom-control="false" :useGlobalLeaflet="false" @click="placeMarker">
          <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap"></l-tile-layer>
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
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  data() {
    return {
      zoom: 12,
      center: [48.6921, 6.1844],
      markerLatLng: [48.6921, 6.1844],
      maxZoom: 25,
      minZoom: 1,
      targetLocation: { lat: 48.6921, lon: 6.1844 },
      distanceParameter: 100,
      popupContent: "",
    };
  },
  methods: {
    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // Rayon moyen de la Terre en kilomètres
      const dLat = this.toRad(lat2 - lat1);
      const dLon = this.toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
      return distance;
    },
    toRad(degrees) {
      return degrees * Math.PI / 180;
    },
    checkDistance() {
      const distance = this.calculateDistance(
        this.targetLocation.lat,
        this.targetLocation.lon,
        this.markerLatLng[0], // Latitude du marqueur
        this.markerLatLng[1]  // Longitude du marqueur
      );

      let points = 0;

      if (distance < this.distanceParameter) {
        points = 5;
      } else if (distance < 2 * this.distanceParameter) {
        points = 3;
      } else if (distance < 3 * this.distanceParameter) {
        points = 2;
      } else {
        points = 0;
      }

      this.popupContent = `Vous avez gagné ${points} points !`;
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
