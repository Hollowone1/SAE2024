<template>
    <div>
      <h2>Map View</h2>
      <div style="height: 600px; width: 800px">
        <l-map ref="map" v-model:zoom="zoom" :center="center" @contextmenu="updateMarker">
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
          ></l-tile-layer>
          <l-geo-json :geojson="geoJson"></l-geo-json>
        </l-map>
      </div>
    </div>
  </template>
  
  <script>
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer, LGeoJson } from "@vue-leaflet/vue-leaflet";
  
  export default {
    components: {
      LMap,
      LTileLayer,
      LGeoJson,
    },
    data() {
      return {
        zoom: 2,
        center: [47.41322, -1.219482],
        geoJson: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [0, 0],
              },
              properties: {
                title: "Marker",
                icon: "circle",
              },
            },
          ],
        },
      };
    },
    methods: {
      updateMarker(event) {
        const latLng = event.latlng;
        this.geoJson.features[0].geometry.coordinates = [latLng.lng, latLng.lat];
      },
    },
  };
  </script>
  
  <style></style>
  